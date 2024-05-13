import "./textEditor.css";

import { useState } from "react";

import PropTypes from "prop-types";

import TextCell from "../../components/textCell/textCell";

const exampleTextCells = [
  { text: "Hello", styles: ["font-header-1", "text-indigo"] },
  { text: "World", styles: ["font-header-2", "text-red"] },
];

const TextEditor = () => {
  const [textCells, setTextCells] = useState(exampleTextCells);
  // const [textCells, setTextCells] = useState([]);

  return (
    <>
      <h1>Welcome To Text Editor</h1>
      <div className="display">
        <h2>Output</h2>
        <div className="display-text">
          {textCells.map((cell, index) => {
            return (
              <TextCell key={index} text={cell.text} styles={cell.styles} />
            );
          })}
        </div>
      </div>
      <Editor setTextCells={setTextCells} />
    </>
  );
};

export default TextEditor;

const Editor = ({setTextCells}) => {
  const [fontStyle, setFontStyle] = useState("font-normal");
  const [textStyle, setTextStyle] = useState([]);
  const [textColor, setTextColor] = useState("text-black");

  return (
    <div className="editor">
      <textarea
        className="text-area"
        placeholder="Start typing here..."
      ></textarea>
      <div className="editor-style">
        <div className="font-style">
          <h2>font style</h2>
          <select
            name="font-selector"
            id="font-selector"
            onChange={(e) => {
              setFontStyle(e.target.value);
            }}
          >
            <option value="font-normal">Normal</option>
            <option value="font-header-3">Header 3</option>
            <option value="font-header-2">Header 2</option>
            <option value="font-header-1">Header 1</option>
          </select>
        </div>
        <div className="text-style">
          <h2>text style</h2>
          <div className="checkboxes-group">
            <div className="input-group">
              <input
                type="checkbox"
                id="bold"
                name="bold"
                value="font-bold"
                onChange={(e) => {
                  if (e.target.checked) {
                    setTextStyle([...textStyle, e.target.value]);
                  } else {
                    setTextStyle(
                      textStyle.filter((style) => style !== e.target.value)
                    );
                  }
                }}
              />
              <label htmlFor="bold">Bold</label>
            </div>
            <div className="input-group">
              <input
                type="checkbox"
                id="italic"
                name="italic"
                value="font-italic"
                onChange={(e) => {
                  if (e.target.checked) {
                    setTextStyle([...textStyle, e.target.value]);
                  } else {
                    setTextStyle(
                      textStyle.filter((style) => style !== e.target.value)
                    );
                  }
                }}
              />
              <label htmlFor="italic">Italic</label>
            </div>
            <div className="input-group">
              <input
                type="checkbox"
                id="underline"
                name="underline"
                value="font-underline"
                onChange={(e) => {
                  if (e.target.checked) {
                    setTextStyle([...textStyle, e.target.value]);
                  } else {
                    setTextStyle(
                      textStyle.filter((style) => style !== e.target.value)
                    );
                  }
                }}
              />
              <label htmlFor="underline">Underline</label>
            </div>
            <div className="input-group">
              <input
                type="checkbox"
                id="underline"
                name="underline"
                value="font-strike"
                onChange={(e) => {
                  if (e.target.checked) {
                    setTextStyle([...textStyle, e.target.value]);
                  } else {
                    setTextStyle(
                      textStyle.filter((style) => style !== e.target.value)
                    );
                  }
                }}
              />
              <label htmlFor="underline">Strike Through</label>
            </div>
          </div>
        </div>
        <div className="text-color">
          <h2>text color</h2>
          <div className="checkboxes-group">
            <div className="input-group">
              <input
                type="radio"
                id="text-red"
                name="text-color"
                value="text-red"
                onChange={(e) => {
                  setTextColor(e.target.value);
                }}
              />
              <label htmlFor="text-red">Red</label>
            </div>
            <div className="input-group">
              <input
                type="radio"
                id="text-blue"
                name="text-color"
                value="text-blue"
                onChange={(e) => {
                  setTextColor(e.target.value);
                }}
              />
              <label htmlFor="text-blue">Blue</label>
            </div>
            <div className="input-group">
              <input
                type="radio"
                id="text-green"
                name="text-color"
                value="text-green"
                onChange={(e) => {
                  setTextColor(e.target.value);
                }}
              />
              <label htmlFor="text-green">Green</label>
            </div>
            <div className="input-group">
              <input
                type="radio"
                id="text-indigo"
                name="text-color"
                value="text-indigo"
                onChange={(e) => {
                  setTextColor(e.target.value);
                }}
              />
              <label htmlFor="text-indigo">Indigo</label>
            </div>
            <div className="input-group">
              <input
                type="radio"
                id="text-yellow"
                name="text-color"
                value="text-yellow"
                onChange={(e) => {
                  setTextColor(e.target.value);
                }}
              />
              <label htmlFor="text-yellow">Yellow</label>
            </div>
          </div>
        </div>
      </div>
      <div className="editor-buttons">
        <button
          onClick={() => {
            const text = document.querySelector(".text-area").value;
            // setTextCells([
            //   ...textCells,
            //   { text: text, styles: [...textStyle, fontStyle, textColor] },
            // ]);
            setTextCells((prevTextCells) => [
              ...prevTextCells,
              { text: text, styles: [...textStyle, fontStyle, textColor] },
            ]);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

Editor.propTypes = {
  setTextCells: PropTypes.func.isRequired,
};