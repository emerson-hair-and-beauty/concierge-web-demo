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
  const bufferRef = useRef('');

  useEffect(() => {
    setSessionId(generateUUID());
  }, []);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || !sessionId) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setPendingClarification(null);
    setIsLoading(true);

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

          if (event.type === 'clarification') {
            setPendingClarification(event.content);
          } else if (event.type === 'products') {
            turnProducts = event.content || [];
          } else if (event.type === 'error') {
            setMessages((prev) => [...prev, { role: 'assistant', content: event.content }]);
          } else if (event.type === 'content' && event.content) {
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
          // `status` / `strategy` / `delivery_plan` events are diagnostic only
          // for now — nothing in the UI reads them yet.
        }
      }

      // Products arrive before the reply text, so attach them once it exists.
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
  }, []);

  return {
    messages,
    isLoading,
    pendingClarification,
    sendMessage,
    answerClarification,
    resetChat,
  };
};
