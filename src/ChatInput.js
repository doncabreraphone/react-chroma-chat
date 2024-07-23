import React, { useState, useEffect, useRef } from 'react';

const ChatInput = ({ onSend, inputRef }) => {
  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [inputClass, setInputClass] = useState('');
  const textAreaRef = useRef(null); // Nueva referencia para el textarea

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.ctrlKey && e.key === '`') {
        setInputClass('');
        textAreaRef.current.focus();
      } else if (e.ctrlKey && e.key === '1') {
        setInputClass('warning');
        textAreaRef.current.focus();
      } else if (e.ctrlKey && e.key === '2') {
        setInputClass('info');
        textAreaRef.current.focus();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (!isVisible) {
      setIsVisible(true);
    }

    if (e.key === 'Enter' && input.trim()) {
      onSend(input.trim(), inputClass);
      setIsVisible(false);

      if (inputRef.current) {
        inputRef.current.blur();
      }

      setInputClass(''); // Resetear la clase después de enviar el mensaje
      setTimeout(() => {
        setInput('');
      }, 0);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (!isVisible) {
      setIsVisible(true);
    }
  };

  return (
    <textarea
      value={input}
      ref={textAreaRef} // Usar textAreaRef aquí
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      className={`chat-input ${isVisible ? 'visible' : ''} ${inputClass}`}
    />
  );
};

export default ChatInput;
