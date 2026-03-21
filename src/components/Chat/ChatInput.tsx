import { useState } from "react";
import "./ChatInput.scss";

type Props = {
  send: (text: string) => void;
};

function ChatInput({ send }: Props) {
  const [text, setText] = useState("");

  const handleSend = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    send(text);
    setText("");
  };

  return (
    <div className="chat-input">
      <form className="chat-input__inner" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Message"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          autoFocus
          autoComplete="off"
        />
        <button 
          type="submit" 
          disabled={!text.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
