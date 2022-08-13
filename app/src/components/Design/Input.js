import React from 'react';
import PropTypes from 'prop-types';

const Input = React.forwardRef(
    (
        {
            type = 'text',
            label,
            name,
            onChange,
            value,
            error,
            disabled,
            min = 1,
            max,
            placeholder,
            ...rest
        },
        ref
    ) => {
        return (
            <div className="form-floating mb-3">
                <input
                    id={name}
                    className={`form-control ${error ? 'is-invalid' : ''} form-control`}
                    type={type}
                    name={name}
                    ref={ref}
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    min={min}
                    max={max}
                    placeholder={placeholder}
                    {...rest}
                />
                {label && <label htmlFor={name}>{label}</label>}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        );
    }
);

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.string,
    max: PropTypes.string,
};

export default Input;