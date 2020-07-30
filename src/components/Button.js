import React from 'react';

const Button = ({ children, disabled, onClick }) => <button onClick={onClick} disabled={disabled}>{children}</button>;
export default Button;
