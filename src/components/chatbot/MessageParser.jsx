// in MessageParser.jsx

import React from 'react';


const MessageParser = ({ children, actions }) => {
  const parse = (message) => {

    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      actions.handleHello();
    }else if(lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('goodbye')|| lowerCaseMessage.includes('tata')) {
      actions.handleBye();
    }else if(lowerCaseMessage.includes('help')) {
      actions.handleHelp();
    } else if(lowerCaseMessage.includes('exit')){
      actions.handleExit();
    } else{
      actions.handleGeneral();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;