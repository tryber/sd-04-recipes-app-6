import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ placeholder, onChange }) => (
  <input onChange={onChange} placeholder={placeholder} />
);

export default Input;

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
