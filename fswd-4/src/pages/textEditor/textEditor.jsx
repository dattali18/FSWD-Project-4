import "./textEditor.css";

import { useState } from "react";

import PropTypes from "prop-types";

import TextCell from "../../components/textCell/textCell.jsx";

// const exampleTextCells = [
//   { text: "Hello", styles: ["font-header-1", "text-indigo"] },
//   { text: "World", styles: ["font-header-2", "text-red"] },
// ];

const TextEditor = () => {
  // const [textCells, setTextCells] = useState(exampleTextCells);
  const [textCells, setTextCells] = useState([]);

  return (
    <div className="main">
      <h1>Welcome To Text Editor</h1>
      <div className="display">
        <Editor setTextCells={setTextCells} />
        <div className="display-text">
          {textCells.map((cell, index) => {
            return (
              <TextCell
                key={index}
                text={cell.text}
                styles={cell.styles}
                size={cell.size}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TextEditor;

const Editor = ({ setTextCells }) => {
  const [fontStyle, setFontStyle] = useState("font-normal");
  const [textStyle, setTextStyle] = useState([]);
  const [textColor, setTextColor] = useState("text-black");

  const fontStyleOptions = ["italic", "underline", "strike", "bold"];

  const fontColorOptions = [
    "black",
    "blue",
    "green",
    "indigo",
    "yellow",
    "red",
    "purple",
    "pink",
    "gray",
    "orange",
    "cyan",
  ];

  const [fontSize, setFontSize] = useState(16);

  return (
    <div className="editor">
      <textarea
        className="text-area"
        placeholder="Start typing here..."
      ></textarea>
      <div className="editor-style">
        <div className="text-size">
          <h2>Text Size</h2>
          <div className="input-group">
            <input
              type="range"
              id="text-size"
              name="text-size"
              value={fontSize}
              min="10"
              max="50"
              onChange={(e) => {
                e.target.value && setFontSize(e.target.value);
              }}
            />
            <label htmlFor="text-size">{fontSize}</label>
          </div>
        </div>
        <FontSelection setFontStyle={setFontStyle} />
        <div className="text-style">
          <h2>Text Style</h2>
          <div className="checkboxes-group">
            {fontStyleOptions.map((type, index) => {
              return (
                <TextStyle
                  key={index}
                  setTextStyle={setTextStyle}
                  textStyle={textStyle}
                  type={type}
                />
              );
            })}
          </div>
        </div>
        <div className="text-color">
          <h2>Text Color</h2>
          <div className="checkboxes-group">
            {fontColorOptions.map((color, index) => {
              return (
                <ColorStyle
                  key={index}
                  setTextColor={setTextColor}
                  color={color}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="editor-buttons">
        <button
          className="save-button"
          onClick={() => {
            const text = document.querySelector(".text-area").value;
            setTextCells((prevTextCells) => [
              ...prevTextCells,
              {
                text: text,
                styles: [...textStyle, fontStyle, textColor],
                size: fontSize,
              },
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

const FontSelection = ({ setFontStyle }) => {
  return (
    <div className="font-style">
      <h2>Font Style</h2>
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
  );
};

FontSelection.propTypes = {
  setFontStyle: PropTypes.func.isRequired,
};

const TextStyle = ({ setTextStyle, textStyle, type }) => {
  return (
    <div className="input-group">
      <input
        className={"checkbox-style checkbox-" + type}
        type="checkbox"
        id={type}
        name={type}
        value={"font-" + type}
        onChange={(e) => {
          if (e.target.checked) {
            setTextStyle([...textStyle, e.target.value]);
          } else {
            setTextStyle(textStyle.filter((style) => style !== e.target.value));
          }
        }}
      />
      <label className={"checkbox-" + type} htmlFor={type}>
        {type}
      </label>
    </div>
  );
};

TextStyle.propTypes = {
  setTextStyle: PropTypes.func.isRequired,
  textStyle: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

const ColorStyle = ({ setTextColor, color }) => {
  return (
    <div className="input-group">
      <input
        type="radio"
        id={"text-" + color}
        name="text-color"
        value={"text-" + color}
        onChange={(e) => {
          setTextColor(e.target.value);
        }}
      />
      <label className={"text-" + color} htmlFor={"text" + color}>
        {color}
      </label>
    </div>
  );
};

ColorStyle.propTypes = {
  setTextColor: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};
