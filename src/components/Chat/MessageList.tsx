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
    <div className="message-list">
      <div className="message-list__inner">
        {messages.map((msg) => (
          <MessageBubble 
            key={msg._id} 
            message={msg.message} 
            author={msg.author} 
            isOwn={msg.author === DEFAULT_AUTHOR}
            timestamp={msg.createdAt} 
          />
        ))}
        <div ref={scrollRef} />
      </div>
    </div>
  );
}

export default MessageList;
