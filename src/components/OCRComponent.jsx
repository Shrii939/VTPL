import { data } from "autoprefixer";
import React, { useState } from "react";
import Tesseract from "tesseract.js";

function OCRComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [progress, setprogress] = useState(0);

  const handleClick = async () => {
    setIsLoading(true);
    Tesseract.recognize(image, "eng", {
        logger: (m) => {
                if(m.status === "recognizing text") {
                    setprogress(parseInt(m.progress*100));
                }
        },
    }).then(({data: { text }}) => {
        setText(text);
        setIsLoading(false);
    })
  };

  return (
    <div>
      <h1>Image to Text</h1>

      {!isLoading && !text && (
        <>
          <input
            type="file"
            className="form-control"
            onChange={(e) => {
              setImage(URL.createObjectURL(e.target.files[0]));
            }}
            placeholder="Upload the file"
          />

          <input
            type="button"
            className="form-control"
            value="Convert"
            onClick={handleClick}
          />
        </>
      )}

      {isLoading && (
        <>
          <p className="text-center">converting...{progress}%</p>
        </>
      )}

      {!isLoading && text && (
        <>
          <textarea
            name="form-control"
            id="form"
            cols="30"
            value={text}
            rows="15"
            onChange={() => {
              setText(e.target.value);
            }}
          ></textarea>
        </>
      )}
    </div>
  );
}

export default OCRComponent;
