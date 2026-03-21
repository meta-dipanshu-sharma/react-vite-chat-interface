import { memo } from "react";
import { formatMessageDate } from "../../utils/date";
import "./MessageBubble.scss";

type Props = {
  message: string;
  author: string;
  isOwn: boolean;
  timestamp: string;
};

const MessageBubble = memo(({ message, author, isOwn, timestamp }: Props) => {
  return (
    <div className={`message ${isOwn ? "message--own" : ""}`}>
      <div className="message__bubble">
        {!isOwn && <div className="message__author">{author}</div>}
        <div className="message__text">{message}</div>
        <div className="message__timestamp">{formatMessageDate(timestamp)}</div>
      </div>
    </div>
  );
});

export default MessageBubble;
