import React, { useState, useEffect } from 'react';
import './ChatBubble.css';

const ChatBubble = ({ text, type, marginBottom, onRemove }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(onRemove, 4000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onRemove]);

  return (
    <div
      className={`chat-bubble ${type} ${fading ? 'fade-out' : ''}`}
      style={{ marginBottom: marginBottom }} 
    >
      {text}
    </div>
  );
};

export default ChatBubble;
