import { useState } from "react";
import "./ChatInput.scss";

function ChatInput() {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    setText("");
  };

  return (
    <div className="chat-input">
      <div className="chat-input__inner">
        <input
          type="text"
          placeholder="Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          autoFocus
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatInput;
