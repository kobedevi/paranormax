import PropTypes from 'prop-types';

const Spinner = ({ color = 'primary' }) => {
    return (
        <div className={`spinner-border text-${color}`} role="status">
            <span className="sr-only"></span>
        </div>
    );
};

Spinner.propTypes = {
    color: PropTypes.oneOf(['primary', 'secondary', 'danger']),
};

export default Spinner;
