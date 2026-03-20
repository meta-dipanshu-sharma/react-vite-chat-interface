import "./Chat.scss";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useChat } from "../../hooks/useChat";

function Chat() {
  const { messages, loading, send } = useChat();

  return (
    <div className="chat">
      <div className="chat__container">
        <MessageList messages={messages} loading={loading} />
        <ChatInput send={send} />
      </div>
    </div>
  );
}

export default Chat;
