import Chatbot from "react-chatbot-kit";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import "./chatbot.css";
import React, { useState } from "react";

import { IconContext } from "react-icons";
import { FaRobot } from "react-icons/fa6";


const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chatbot-widget ${isOpen ? "open" : ""}`}>
      <button className="chatbot-button" onClick={toggleChatbot}>
        <IconContext.Provider
          value={{
            className: "global-class-name",
            size: "1.5rem",

            style: { cursor: "pointer" },
          }}
        >
          <FaRobot />
        </IconContext.Provider>
      </button>
      {isOpen && (
        <div className="chatbot-interface">
          <Chatbot
            config={config}
            messageParser={MessageParser} 
            actionProvider={ActionProvider }
          />
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
