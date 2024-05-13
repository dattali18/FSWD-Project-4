
import PropTypes from 'prop-types';

const TextCell = ({ text, styles }) => {
    const className = styles.join(' ');
    return <>
        <div className={"text-cell " + className}>{text}</div>
    </>
}

TextCell.propTypes = {
    text: PropTypes.string.isRequired,
    styles: PropTypes.array.isRequired
};

export default TextCell;