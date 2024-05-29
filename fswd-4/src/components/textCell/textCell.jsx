import PropTypes from "prop-types";

const TextCell = ({ textSegments }) => {
  return (
    <div className="text-cell">
      {textSegments.map((segment, index) => {
        const fontFamily = segment.styles.find(style => style.startsWith('fontFamily-'))?.split('-')[1] || 'inherit';
        return (
          <span
            key={index}
            style={{
              fontSize: `${segment.size}px`,
              fontFamily: fontFamily
            }}
            className={segment.styles.filter(style => !style.startsWith('fontFamily-')).join(' ')}
          >
            {segment.text}
          </span>
        );
      })}
    </div>
  );
};

TextCell.propTypes = {
  textSegments: PropTypes.array.isRequired,
};

export default TextCell;
