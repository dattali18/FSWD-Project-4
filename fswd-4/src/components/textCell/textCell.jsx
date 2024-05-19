import PropTypes from "prop-types";

const TextCell = ({ text, styles, size }) => {
  const className = styles.join(" ");
  return (
    <>
      {size == 16 ? (
        <div className={"text-cell " + className}>{text}</div>
      ) : (
        <div
          style={{
            fontSize: size + "px",
          }}
          className={"text-cell " + className}
        >
          {text}
        </div>
      )}
    </>
  );
};

TextCell.propTypes = {
  text: PropTypes.string.isRequired,
  styles: PropTypes.array.isRequired,
  size: PropTypes.string.isRequired,
};

export default TextCell;
