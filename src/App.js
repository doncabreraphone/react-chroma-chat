import React, { useRef, useState } from 'react';
import ChatInput from './ChatInput';
import ChatBubble from './ChatBubble';
import './App.css';

const ChatApp = () => {
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [textAreaHeight, setTextAreaHeight] = useState(0);

  const handleSend = (message, messageClass) => {
    // Calcular el marginBottom basado en la altura del textarea
    const marginBottom = textAreaHeight > 50 ? '5.5em' : '4em';

    // Incrementar el marginBottom de todos los mensajes existentes
    setMessages(prevMessages =>
      prevMessages.map(msg => ({
        ...msg,
        marginBottom: (parseFloat(msg.marginBottom) + parseFloat(marginBottom)) + 'em'
      }))
    );

    // Agregar el nuevo mensaje después de 500ms
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: message, type: messageClass, marginBottom: '0em' }
      ]);
    }, 0);
  };

  const handleHeightChange = (height) => {
    setTextAreaHeight(height);
  };

  const handleRemove = (index) => {
    setMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
  };

  return (
    <div className="chat-container">
      {messages.map((msg, index) => (
        <ChatBubble
          key={index}
          text={msg.text}
          type={msg.type}
          marginBottom={msg.marginBottom}
          onRemove={() => handleRemove(index)}
        />
      ))}
      <div id="textareaCSS">
        <ChatInput onSend={handleSend} inputRef={inputRef} onHeightChange={handleHeightChange} />
      </div>
    </div>
  );
};

export default ChatApp;
