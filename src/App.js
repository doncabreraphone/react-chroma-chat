import React, { useRef, useState, useEffect } from 'react';
import ChatInput from './ChatInput';
import ChatBubble from './ChatBubble';
import './App.css';

const ChatApp = () => {
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const handleSend = (message, messageClass) => {
    const marginBottom = '4.5em';

    setMessages(prevMessages =>
      prevMessages.map(msg => ({
        ...msg,
        marginBottom: (parseFloat(msg.marginBottom) + parseFloat(marginBottom)) + 'em'
      }))
    );

    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: message, type: messageClass, marginBottom, delay: messages.length > 0 ? messages.length * 2300 : 1700 }
      ]);
    }, 0);
  };

  const handleRemove = (index) => {
    setMessages(prevMessages => prevMessages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.ctrlKey && e.key === '`') {
        inputRef.current && inputRef.current.focus();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <div className="chat-container">
      {messages.map((msg, index) => (
        <ChatBubble
          key={index}
          text={msg.text}
          type={msg.type}
          marginBottom={msg.marginBottom}
          delay={msg.delay}
          onRemove={() => handleRemove(index)}
        />
      ))}
      <div id="textareaCSS">
        <ChatInput onSend={handleSend} inputRef={inputRef} />
      </div>
    </div>
  );
};

export default ChatApp;
