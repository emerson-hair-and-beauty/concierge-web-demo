import { useState, useCallback, useEffect, useRef } from 'react';

// Simple UUID generator for session_id — same approach as useExperienceChat.js
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Chat against the decision-state pipeline (signal detection -> intent ->
 * decision engine -> JTE -> response composer). Unlike useExperienceChat.js,
 * the backend streams newline-delimited JSON events instead of returning one
 * JSON object, so this hook reads the response body as a stream — the same
 * reader.read()/TextDecoder loop useOnboardingStore.js's generateRoutine()
 * already uses, not a new parser.
 */
export const useAdvisorChat = (userId) => {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingClarification, setPendingClarification] = useState(null);
  // The last `status` text. It shows until the first reply text arrives.
  const [statusText, setStatusText] = useState('');
  // True from the send until the first reply text, question, or error arrives.
  const [awaitingReply, setAwaitingReply] = useState(false);
  const bufferRef = useRef('');

  useEffect(() => {
    setSessionId(generateUUID());
  }, []);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || !sessionId) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setPendingClarification(null);
    setIsLoading(true);
    setStatusText('');
    setAwaitingReply(true);

    // Content chunks append to one reply, found by id. The updater must stay
    // pure: React Strict Mode runs it twice.
    const replyId = generateUUID();
    let turnProducts = [];

    try {
      const response = await fetch('/api/advisor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId || 'anonymous',
          message: text,
          session_id: sessionId,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Advisor chat request failed: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      bufferRef.current = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        bufferRef.current += decoder.decode(value, { stream: true });
        const lines = bufferRef.current.split('\n');
        bufferRef.current = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;

          let event;
          try {
            event = JSON.parse(trimmed);
          } catch {
            continue; // a partial/malformed line; skip rather than crash the chat
          }

          if (event.type === 'status') {
            if (typeof event.content === 'string') setStatusText(event.content);
          } else if (event.type === 'clarification') {
            setAwaitingReply(false);
            // The question also goes into the history, so it stays visible
            // after the user answers it.
            const question = event.content?.question;
            if (question) {
              setMessages((prev) => [...prev, { role: 'assistant', content: question }]);
            }
            setPendingClarification(event.content);
          } else if (event.type === 'products') {
            turnProducts = event.content || [];
          } else if (event.type === 'error') {
            setAwaitingReply(false);
            setMessages((prev) => [...prev, { role: 'assistant', content: event.content }]);
          } else if (event.type === 'content' && event.content) {
            setAwaitingReply(false);
            setMessages((prev) => {
              const i = prev.findIndex((m) => m.id === replyId);
              if (i === -1) {
                return [...prev, { id: replyId, role: 'assistant', content: event.content }];
              }
              const next = [...prev];
              next[i] = { ...next[i], content: next[i].content + event.content };
              return next;
            });
          }
          // The UI ignores the other types (`thesis`, `strategy`,
          // `delivery_plan`, `token_usage`, `tone`). They are for internal tests.
        }
      }

      // The products event comes after the reply text. Attach the cards to the reply.
      if (turnProducts.length) {
        setMessages((prev) =>
          prev.map((m) => (m.id === replyId ? { ...m, products: turnProducts } : m))
        );
      }
    } catch (error) {
      console.error('Advisor chat failed:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
      setAwaitingReply(false);
      setStatusText('');
    }
  }, [sessionId, userId]);

  // Answering a clarification question is just the next chat turn — the
  // chosen option's label becomes the user's message, the same trick
  // dashboard.py uses, so no separate endpoint or special-cased request shape.
  const answerClarification = useCallback((optionLabel) => {
    sendMessage(optionLabel);
  }, [sendMessage]);

  const resetChat = useCallback(() => {
    setSessionId(generateUUID());
    setMessages([]);
    setPendingClarification(null);
    setStatusText('');
    setAwaitingReply(false);
  }, []);

  return {
    messages,
    isLoading,
    pendingClarification,
    statusText,
    awaitingReply,
    sendMessage,
    answerClarification,
    resetChat,
  };
};
