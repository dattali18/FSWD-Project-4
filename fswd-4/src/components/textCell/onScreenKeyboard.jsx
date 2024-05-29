import React, { useState } from "react";


const englishKeys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'],
    ['UPPERCASE', 'LANGUAGE', 'SPACE', 'BACKSPACE', 'CLEAR']
  ];
  
  
  const hebrewKeys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'],
    ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'],
    ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ'],
    ['LANGUAGE', 'SPACE', 'BACKSPACE', 'CLEAR']
  ];


  const OnScreenKeyboard = ({ onKeyPress }) => {
    const [pressedKey, setPressedKey] = useState(null);
    const [currentLanguage, setCurrentLanguage] = useState('english');
    const [isUppercase, setIsUppercase] = useState(false);
  
    const handleKeyPress = (key) => {
      if (key === 'LANGUAGE') {
        setCurrentLanguage((prevLanguage) => (prevLanguage === 'english' ? 'hebrew' : 'english'));
        return;
      }
      if (key === 'UPPERCASE') {
        setIsUppercase((prevUppercase) => !prevUppercase);
        return;
      }
      if (key === 'SPACE') {
        key = ' ';
      }
      onKeyPress(key);
      setPressedKey(key);
      setTimeout(() => setPressedKey(null), 200); // Remove pressed effect after 200ms
    };
  
    let keys = currentLanguage === 'english' ? englishKeys : hebrewKeys;

  if (isUppercase && currentLanguage === 'english') {
    keys = keys.map((row) => row.map((key) => {
      if (key.match(/[a-z]/)) {
        return key.toUpperCase();
      }
      return key;
    }));
  }
  
    return (
      <div className="keyboard">
        {keys.map((row, index) => (
          <div key={index} className="keyboard-row">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={`keyboard-key ${pressedKey === key ? 'pressed' : ''}`}
              >
                {key === 'SPACE' ? '␣' : key === 'BACKSPACE' ? '⌫' : key === 'CLEAR' ? 'Clear All' : key === 'LANGUAGE' ? '🌐' 
                :key==='UPPERCASE' ? '⇧': key}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  export default OnScreenKeyboard;