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
    <article className={`message ${isOwn ? "message--own" : ""}`}>
      <div className="message__bubble">
        {!isOwn && (
          <span className="message__author" aria-hidden="true">
            {author}
          </span>
        )}
        <div className="message__text">{message}</div>
        <time
          className="message__timestamp"
          dateTime={timestamp}
          title={new Date(timestamp).toLocaleString()}
        >
          {formatMessageDate(timestamp)}
        </time>
      </div>
    </article>
  );
});

export default MessageBubble;
