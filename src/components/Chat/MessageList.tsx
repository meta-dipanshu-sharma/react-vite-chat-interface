import "./MessageList.scss";
import MessageBubble from "./MessageBubble";

const mockMessages = [
    { id: 1, message: "Hello!", author: "John", isOwn: false, timestamp: "15 Mar 2025 09:30" },
    { id: 2, message: "Hi there!", author: "You", isOwn: true, timestamp: "15 Mar 2025 09:31" },
    { id: 3, message: "How are you?", author: "John", isOwn: false, timestamp: "15 Mar 2025 09:32" },
];

function MessageList() {
  return (
    <div className="message-list">
      {mockMessages.map((msg) => (
        <MessageBubble key={msg.id} {...msg} />
      ))}
    </div>
  );
}

export default MessageList;
