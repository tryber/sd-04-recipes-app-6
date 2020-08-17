import React from 'react';
import PropTypes from 'prop-types';
import '../styles/TelaPrincipal.css';

const Button = ({ children, disabled, onClick, test, className , src}) => (
  <button
    className={className}
    type="button"
    onClick={onClick}
    disabled={disabled}
    data-testid={test}
    src={src}
  >
    {children}
  </button>
);
export default Button;

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  test: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
