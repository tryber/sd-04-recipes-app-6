import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type = 'text',
  placeholder,
  onChange,
  test,
  id,
  name,
  defaultChecked,
}) => (
  <input
    data-testid={test}
    id={id}
    name={name}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    defaultChecked={defaultChecked}
  />
);

export default Input;

Input.propTypes = {
  defaultChecked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  test: PropTypes.string.isRequired,
};
