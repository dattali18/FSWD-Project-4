import PropTypes from "prop-types";

const TextCell = ({ textSegments }) => {
  return (
    <div className="text-cell">
      {textSegments.map((segment, index) => (
        <span
          key={index}
          className={segment.styles.join(" ")}
          style={{ fontSize: `${segment.size}px` }}
        >
          {segment.text}
        </span>
      ))}
    </div>
  );
};

TextCell.propTypes = {
  textSegments: PropTypes.array.isRequired,
};

export default TextCell;
