import PropTypes from 'prop-types';

const Spinner = ({ color = 'primary' }) => {
    return (
        <section className="py-5">
            <div className="container px-5 my-5">
                <div className={`spinner-border text-${color}`} role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        </section>
    );
};

Spinner.propTypes = {
    color: PropTypes.oneOf(['primary', 'secondary', 'danger']),
};

export default Spinner;
