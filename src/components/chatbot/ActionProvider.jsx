// in ActionProvider.jsx
import React from 'react';

import { createChatBotMessage } from 'react-chatbot-kit';



const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');
    addMessage(botMessage);
  
  };

  const handleHelp = () => {
    const botMessage = createChatBotMessage("We will connect you with our customer support team. What is your issue?");
    addMessage(botMessage);
  }
  

  const handleBye = () => {
    const botMessage = createChatBotMessage('Byee! Have a nice day.');
    addMessage(botMessage);
  
  };

  const addMessage = (botMessage) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  const handleExit = () => {
    const botMessage = createChatBotMessage("Exiting, Thank you! ");
    addMessage(botMessage);
  }
  
  const handleGeneral = () => {
    const botMessage = createChatBotMessage("Not been trained to handle this, sorry, Try help ");
    addMessage(botMessage);
  }

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,  
            handleBye,
            handleHelp,
            handleExit,
            handleGeneral,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;