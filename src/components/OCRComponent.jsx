import React, { useState } from "react";
import Tesseract from "tesseract.js";
import "../scss/OCRComponent.scss"; // Import the SCSS stylesheet
import TopBar from "./common/TopBar/Topbar";

function OCRComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [isRequiredError, setIsRequiredError] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const result = await Tesseract.recognize(image, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(parseInt(m.progress * 100));
          }
        },
      });
      setText(result.data.text);
    } catch (error) {
      console.error("Error while recognizing text:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (image === "") {
      setIsRequiredError(true);
    } else {
      setIsRequiredError(false);
      handleClick();
    }
  };

  return (
    <>
    <TopBar />
    <div className="center-container">
      <div className={`ocr-card ${isLoading ? "loading" : ""}`}>
        <h1 className="ocr-heading">Image to Text</h1>
        <div className="ocr-content">
          <form className="ocr-input-section" onSubmit={handleFormSubmit}>
            <input
              type="file"
              className="ocr-file-input"
              onChange={handleImageUpload}
              required
              />
            {isRequiredError && (
              <p className="ocr-required-error">Please select an image.</p>
              )}
            <button className="ocr-convert-button" type="submit">
              Convert
            </button>
          </form>

          {isLoading && (
              <div className="ocr-loading">
              <p className="ocr-progress-text">Converting... {progress}%</p>
              <div className="loader"></div>
            </div>
          )}

          <textarea
            className="ocr-text-output"
            value={text}
            onChange={(e) => {
                setText(e.target.value);
            }}
            ></textarea>
        </div>
        <a href="/" className="ocr-back-link">
          Back
        </a>
      </div>
    </div>
            </>
  );
}

export default OCRComponent;
