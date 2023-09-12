import Editor from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import "../scss/OnlineEditorComponent.scss"; // Import the SCSS file

function OnlineEditorComponent() {
  const [code, setCode] = useState("" );
  const [file, setFile] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [output, setOutput] = useState("");

  const options = {

  };

  useEffect(() => {
    localStorage.setItem("editorCode", code);
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const savedCode = localStorage.getItem("editorCode");
    if (savedCode) {
      setCode(savedCode);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSave = () => {
    localStorage.setItem("editorCode", code);
  };

  const handleEditorPaste = (e) => {
    e.preventDefault();
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleRunCode = () => {
    const parser = new DOMParser();
    const out = parser.parseFromString(code, "text/html");
    const div = document.getElementById('outout')
    div.innerHTML = out.documentElement.innerHTML
    
    
  };


  return (
    <div className="online-editor">
      <div className="left">
        {/* Questions or doc */}
        <div className="doc-session">
          {/* Editable HTML document */}
          <h1>Simple HTML Table Task</h1>
          <br />
          <h2>Task Description:</h2>
          <br />
          <p>
            In this task, you will create a basic HTML webpage with a simple
            table. This task is designed for beginners who are just starting to
            learn HTML. Follow the step-by-step instructions below to complete
            the task:
          </p>
          <br />
          {/* ... (Task description continues) ... */}
        </div>
        <div className="output-container">
          <h3>Output:</h3>
          <div id="outout"></div>
        </div>
      </div>

      <div className="right">
        <div className="titlebar">
          <div className="language-input">
            <select value={selectedLanguage} onChange={handleLanguageChange}>
              <option value="javascript" defaultChecked>
                JavaScript
              </option>
              <option value="css">CSS</option>
              <option value="html">HTML</option>
              <option value="python">Python</option>
              <option value="dart">Dart</option>
              <option value="java">Java</option>
              {/* Add more language options as needed */}
            </select>
          </div>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="run-button" onClick={handleRunCode}>
            Run Code
          </button>
          {/* Add other options here */}
        </div>
        <div className="editor-container" onContextMenu={handleContextMenu}>
          <Editor
            id="nopaste"
            onKeyDown={handleEditorPaste}
            height="90vh"
            
            theme="vs-dark"
            defaultLanguage="javascript"
            value={code}
            onChange={(e) => setCode(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default OnlineEditorComponent;
