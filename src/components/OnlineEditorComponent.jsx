import Editor from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import "../scss/OnlineEditorComponent.scss"; // Import the SCSS file
import { toast } from "react-toastify";
import axios from "axios";
import Home from "../pages/Home";
import TopBar from "./common/TopBar/Topbar";

const GitHub = () => axios.create({
  baseURL: 'https://api.github.com/Shrii939',
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
});

function OnlineEditorComponent() {
  const [code, setCode] = useState("");
  const [count, setcount] = useState("0");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [output, setOutput] = useState("");

  const options = {
    acceptSuggestionOnCommitCharacter: true,
    acceptSuggestionOnEnter: "on",
    accessibilitySupport: "auto",
    autoIndent: false,
    automaticLayout: true,
    codeLens: true,
    colorDecorators: true,
    contextmenu: true,
    cursorBlinking: "blink",
    cursorSmoothCaretAnimation: false,
    cursorStyle: "line",
    disableLayerHinting: false,
    disableMonospaceOptimizations: false,
    dragAndDrop: false,
    fixedOverflowWidgets: false,
    folding: true,
    foldingStrategy: "auto",
    fontLigatures: false,
    formatOnPaste: false,
    formatOnType: false,
    hideCursorInOverviewRuler: false,
    highlightActiveIndentGuide: true,
    links: true,
    mouseWheelZoom: false,
    multiCursorMergeOverlapping: true,
    multiCursorModifier: "alt",
    overviewRulerBorder: true,
    overviewRulerLanes: 2,
    quickSuggestions: true,
    quickSuggestionsDelay: 100,
    readOnly: false,
    renderControlCharacters: false,
    renderFinalNewline: true,
    renderIndentGuides: true,
    renderLineHighlight: "all",
    renderWhitespace: "none",
    revealHorizontalRightPadding: 30,
    roundedSelection: true,
    rulers: [],
    scrollBeyondLastColumn: 5,
    scrollBeyondLastLine: true,
    selectOnLineNumbers: true,
    selectionClipboard: true,
    selectionHighlight: true,
    showFoldingControls: "mouseover",
    smoothScrolling: false,
    suggestOnTriggerCharacters: true,
    wordBasedSuggestions: true,
    wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
    wordWrap: "off",
    wordWrapBreakAfterCharacters: "\t})]?|&,;",
    wordWrapBreakBeforeCharacters: "{([+",
    wordWrapBreakObtrusiveCharacters: ".",
    wordWrapColumn: 80,
    wordWrapMinified: true,
    wrappingIndent: "none",
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

  const handlePushCode = async () => {
    try {
      let filename = count;
      setcount(count + 1);
      const response = await axios.put(
        `test_repo/blob/main/newFile1`,
        {
          message: "New upload from website",
          content: btoa(code),
        }
      );
      toast.success("Code Pushed Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error Pushing Code");
    }
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
    const div = document.getElementById("outout");
    div.innerHTML = out.documentElement.innerHTML;
  };

  return (
    <>
    <TopBar/>
    <div className="online-editor">
      <div className="left-side">
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
              <option value="javascript">JavaScript</option>
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
          <button className="run-button" onClick={handlePushCode}>
            Push Code
          </button>
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
            language={selectedLanguage}
            value={code}
            onChange={(e) => setCode(e)}
            />
        </div>
      </div>
    </div>
            </>
  );
}

export default OnlineEditorComponent;
