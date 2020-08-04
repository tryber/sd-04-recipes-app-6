import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ placeholder, onChange, test }) => (
  <input onChange={onChange} placeholder={placeholder} data-testid={test} />
);

export default Input;

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  test: PropTypes.string.isRequired,
};
