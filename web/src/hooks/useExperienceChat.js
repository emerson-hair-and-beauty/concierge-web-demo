import { useState, useCallback, useEffect } from 'react';

// Simple UUID generator for session_id
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const useExperienceChat = (userId) => {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isHandoff, setIsHandoff] = useState(false);
  const [targetVital, setTargetVital] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWarming, setIsWarming] = useState(true);

  useEffect(() => {
    setSessionId(generateUUID());
  }, []);

  // Warm-up: fires once the session is ready. Captures the backend's
  // personalised greeting (drafted from the user's last session summary)
  // and sets it as the first message in the conversation.
  useEffect(() => {
    if (!sessionId) return;

    let cancelled = false;
    setIsWarming(true);

    fetch('/api/diagnostic/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId || 'anonymous',
        message: '',
        session_id: sessionId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const greeting = data?.message || "Hi! How's your hair feeling today?";
        setMessages([{ role: 'assistant', content: greeting }]);
      })
      .catch(() => {
        if (cancelled) return;
        // Fallback to a default greeting if warm-up fails
        setMessages([{ role: 'assistant', content: "Hi! How's your hair feeling today?" }]);
      })
      .finally(() => {
        if (!cancelled) setIsWarming(false);
      });

    return () => { cancelled = true; };
  }, [sessionId, userId]);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isHandoff) return;

    const newMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/diagnostic/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId || 'anonymous',
          message: text,
          session_id: sessionId
        }),
      });

      const data = await response.json();

      if (data.message) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
      }

      if (data.handoff) {
        setIsHandoff(true);
        setTargetVital(data.target_vital);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, isHandoff, userId]);

  const saveEvent = useCallback(async (vitalValue) => {
    try {
      const conversationSummary = messages
        .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
        .join('\n');

      const response = await fetch('/api/diagnostic/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId || 'anonymous',
          session_id: sessionId,
          target_vital: targetVital,
          vital_value: vitalValue,
          conversation_summary: conversationSummary,
          keywords: []
        }),
      });

      return await response.ok;
    } catch (error) {
      console.error('Failed to save event:', error);
      return false;
    }
  }, [messages, sessionId, targetVital, userId]);

  const resetChat = useCallback(async () => {
    if (sessionId) {
      try {
        await fetch(`/api/diagnostic/session/${sessionId}`, { method: 'DELETE' });
      } catch (error) {
        console.error('Failed to reset session on backend:', error);
      }
    }
    const newSessionId = generateUUID();
    setSessionId(newSessionId);
    setMessages([]);
    setIsHandoff(false);
    setTargetVital(null);
    setIsWarming(true);
  }, [sessionId]);

  return {
    messages,
    isLoading,
    isWarming,
    isHandoff,
    targetVital,
    sendMessage,
    saveEvent,
    resetChat
  };
};
