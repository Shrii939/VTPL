// in MessageParser.jsx

import React from 'react';


const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('hello') || message.includes('hi')) {
      actions.handleHello();
    }else if(message.includes('bye')) {
      actions.handleBye();
    }else if(message.includes('help')) {
      actions.handleHelp();
    } else if(message.includes('exit')){
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