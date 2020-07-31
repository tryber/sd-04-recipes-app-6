import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, disabled, onClick }) => (
    <button onClick={onClick} disabled={disabled}>
        {children}
    </button>
);
export default Button;

Button.propTypes = {
    children: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
}

