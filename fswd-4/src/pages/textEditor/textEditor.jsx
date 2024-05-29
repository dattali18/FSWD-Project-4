import "./textEditor.css";

import { useState } from "react";

import PropTypes from "prop-types";

import TextCell from "../../components/textCell/textCell.jsx";
import OnScreenKeyboard from "../../components/textCell/onScreenKeyboard.jsx";

// const exampleTextCells = [
//   { text: "Hello", styles: ["font-header-1", "text-indigo"] },
//   { text: "World", styles: ["font-header-2", "text-red"] },
// ];

const TextEditor = () => {
  const [textSegments, setTextSegments] = useState([]);
  const [currentStyles, setCurrentStyles] = useState([]);
  const [fontSize, setFontSize] = useState(16);

  const handleKeyboardInput = (key) => {
    if (key === "BACKSPACE") {
      setTextSegments((prevTextSegments) => {
        if (prevTextSegments.length === 0) return prevTextSegments;
        const lastSegment = prevTextSegments[prevTextSegments.length - 1];
        if (lastSegment.text.length > 1) {
          return [
            ...prevTextSegments.slice(0, -1),
            { ...lastSegment, text: lastSegment.text.slice(0, -1) },
          ];
        } else {
          return prevTextSegments.slice(0, -1);
        }
      });
    } else if (key === "CLEAR") {
      setTextSegments([]);
    } else {
      setTextSegments([
        ...textSegments,
        { text: key, styles: currentStyles, size: fontSize },
      ]);
    }
  };

  return (
    <div className="main">
      <h1>Welcome To Text Editor</h1>
      <div className="display">
        <div className="display-text">
          <TextCell textSegments={textSegments} />
        </div>
        <div className="editor-container">
          <OnScreenKeyboard onKeyPress={handleKeyboardInput} />
          <Editor
            currentStyles={currentStyles}
            setCurrentStyles={setCurrentStyles}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        </div>
      </div>
    </div>
  );
};

const Editor = ({ currentStyles, setCurrentStyles, fontSize, setFontSize }) => {
  const handleStyleChange = (newStyle) => {
    setCurrentStyles(newStyle);
  };

  const handleSizeChange = (newSize) => {
    setFontSize(newSize);
  };

  return (
    <div className="editor">
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
              onChange={(e) => handleSizeChange(e.target.value)}
            />
            <label htmlFor="text-size">{fontSize}</label>
          </div>
        </div>
        <FontSelection setFontStyle={handleStyleChange} currentStyles={currentStyles} />
        <TextStyle setTextStyle={handleStyleChange} textStyle={currentStyles} />
        <ColorStyle setTextColor={handleStyleChange} currentColor={currentStyles} />
      </div>
    </div>
  );
};

Editor.propTypes = {
  currentStyles: PropTypes.array.isRequired,
  setCurrentStyles: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  setFontSize: PropTypes.func.isRequired,
};

const FontSelection = ({ setFontStyle, currentStyles }) => {
  const handleChange = (style) => {
    setFontStyle([...currentStyles.filter(s => !s.startsWith("font-")), style]);
  };

  return (
    <div className="font-style">
      <h2>Font Style</h2>
      <select
        name="font-selector"
        id="font-selector"
        onChange={(e) => handleChange(e.target.value)}
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
  currentStyles: PropTypes.array.isRequired,
};

const TextStyle = ({ setTextStyle, textStyle }) => {
  const fontStyleOptions = ["italic", "underline", "strike", "bold"];

  const handleCheckboxChange = (type, isChecked) => {
    if (isChecked) {
      setTextStyle([...textStyle, `font-${type}`]);
    } else {
      setTextStyle(textStyle.filter((style) => style !== `font-${type}`));
    }
  };

  return (
    <div className="text-style">
      <h2>Text Style</h2>
      <div className="checkboxes-group">
        {fontStyleOptions.map((type, index) => (
          <div className="input-group" key={index}>
            <input
              className={"checkbox-style checkbox-" + type}
              type="checkbox"
              id={type}
              name={type}
              value={"font-" + type}
              checked={textStyle.includes(`font-${type}`)}
              onChange={(e) => handleCheckboxChange(type, e.target.checked)}
            />
            <label className={"checkbox-" + type} htmlFor={type}>
              {type}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

TextStyle.propTypes = {
  setTextStyle: PropTypes.func.isRequired,
  textStyle: PropTypes.array.isRequired,
};

const ColorStyle = ({ setTextColor, currentColor }) => {
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

  const handleColorChange = (color) => {
    setTextColor([...currentColor.filter(style => !style.startsWith("text-")), `text-${color}`]);
  };

  return (
    <div className="text-color">
      <h2>Text Color</h2>
      <div className="checkboxes-group">
        {fontColorOptions.map((color, index) => (
          <div className="input-group" key={index}>
            <input
              type="radio"
              id={"text-" + color}
              name="text-color"
              value={"text-" + color}
              checked={currentColor.includes(`text-${color}`)}
              onChange={(e) => handleColorChange(color)}
            />
            <label className={"text-" + color} htmlFor={"text" + color}>
              {color}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

ColorStyle.propTypes = {
  setTextColor: PropTypes.func.isRequired,
  currentColor: PropTypes.array.isRequired,
};

export default TextEditor;