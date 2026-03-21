import { useEffect, useRef } from "react";
import "./MessageList.scss";
import MessageBubble from "./MessageBubble";
import { DEFAULT_AUTHOR } from "../../utils/constants";
import type { Message } from "../../types/message";

type Props = {
  messages: Message[];
  loading: boolean;
};

function MessageList({ messages, loading }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading && messages.length === 0) return <div className="loader">Loading chat...</div>;

  return (
    <main 
      className="message-list" 
      aria-label="Chat conversation history"
      role="main"
    >
      <div className="message-list__inner">
        <ul 
          className="message-list__content" 
          aria-live="polite" 
          aria-relevant="additions"
        >
          {messages.map((msg) => (
            <li key={msg._id} className="message-list__item">
              <MessageBubble 
                message={msg.message} 
                author={msg.author} 
                isOwn={msg.author === DEFAULT_AUTHOR}
                timestamp={msg.createdAt} 
              />
            </li>
          ))}
        </ul>
        <div ref={scrollRef} aria-hidden="true" />
      </div>
    </main>
  );
}

export default MessageList;
