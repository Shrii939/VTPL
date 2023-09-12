import Editor from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import "../scss/OnlineEditorComponent.scss"; // Import the SCSS file


function OnlineEditorComponent() {
  const [code, setCode] = useState("");
  const [file, setFile] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [output, setOutput] = useState("");

  const options = {
    autoIndent: "full",
    contextmenu: true,
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: "always",
    minimap: {
      enabled: true,
    },
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
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

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

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
    try {
      // Use eval to execute JavaScript code (be cautious with this approach)
      let result = eval(code);
  
      if (typeof result !== 'undefined') {
        // Set the output to the result (you can format this as needed)
        setOutput(result.toString());
      } else {
        // Handle the case where the result is undefined
        setOutput("Result is undefined.");
      }
    } catch (error) {
      // Handle and display any errors
      setOutput(`Error: ${error.message}`);
    }
  };
  

  console.log(code)
  console.log(selectedLanguage)
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
          <pre>{output}</pre>
        </div>
      </div>

      <div className="right">
        <div className="titlebar">
          <div className="language-input">
            <select value={selectedLanguage} onChange={handleLanguageChange}>
              <option value="javascript" defaultChecked>JavaScript</option>
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
          <button className="run-button" onClick={handleRunCode}>Run Code</button>
          {/* Add other options here */}
        </div>
        <div className="editor-container" onContextMenu={handleContextMenu}>
          <Editor
            id="nopaste"
            onKeyDown={handleEditorPaste}
            height="90vh"
            options={options}
            theme="vs-dark"
            defaultLanguage="javascript"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default OnlineEditorComponent;
