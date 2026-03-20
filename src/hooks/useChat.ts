import { useState, useEffect, useCallback } from "react";
import { fetchMessages, postMessage } from "../api/messages";
import type { Message } from "../types/message";
import { DEFAULT_AUTHOR } from "../utils/constants";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUpdates = useCallback(async () => {
    try {
      const lastMsg = messages[messages.length - 1];
      const after = lastMsg ? lastMsg.createdAt : undefined;

      const newMessages = await fetchMessages(after);

      if (newMessages && newMessages.length > 0) {
        setMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m._id));

          // Only add messages the server sent that aren't already in our state
          const uniqueNew = newMessages.filter((m) => !existingIds.has(m._id));
          return [...prev, ...uniqueNew];
        });
      }
    } catch (error) {
      console.error("Fetching messages failed:", error);
    } finally {
      setLoading(false);
    }
  }, [messages]);

  const send = async (text: string) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticMsg: Message = {
      _id: tempId, // Temporary ID for React keys
      message: text,
      author: DEFAULT_AUTHOR,
      createdAt: new Date().toISOString(),
    };

    // Show it in the UI immediately
    setMessages((prev) => [...prev, optimisticMsg]);

    try {
      const savedMessage = await postMessage({
        message: text,
        author: DEFAULT_AUTHOR,
      });

      // Replace the optimistic message with the one returned from the server (which has the real ID)
      setMessages((prev) =>
        prev.map((m) => (m._id === tempId ? savedMessage : m)),
      );
    } catch (err) {
      // Removes the message so the user knows it didn't go through
      setMessages((prev) => prev.filter((m) => m._id !== tempId));
      alert("Failed to send message.");
      console.error("Sending message failed:", err);
    }
  };

  useEffect(() => {
    fetchUpdates();

    const interval = setInterval(fetchUpdates, 3000);

    return () => clearInterval(interval);
  }, [fetchUpdates]);

  return { messages, loading, send };
};
