import { useState } from "react";
import "./ChatInput.scss";

type Props = {
  send: (text: string) => void;
};

function ChatInput({ send }: Props) {
  const [text, setText] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    send(text);
    setText("");
  };

  return (
    <section className="chat-input" aria-label="Message composition">
      <form className="chat-input__inner" onSubmit={handleSend}>
        {/* Visually hidden label for Screen Readers */}
        <label htmlFor="message-input" className="sr-only">
          Write a message
        </label>
        
        <input
          id="message-input"
          type="text"
          placeholder="Message"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          aria-required="true"
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
    </section>
  );
}

export default ChatInput;
