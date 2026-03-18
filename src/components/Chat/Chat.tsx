import "./Chat.scss";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

function Chat() {
  return (
    <div className="chat">
      <div className="chat__container">
        <MessageList />
        <ChatInput />
      </div>
    </div>
  );
}

export default Chat;
