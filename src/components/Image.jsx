import React from 'react';
import { Link } from 'react-router-dom'

const Image = ({ toProps, test, altProps, srcProps }) => (
  <Link to={toProps} data-testid={test}>
    <img
      style={{ width: '25px', height: '20px' }}
      alt={altProps}
      src={srcProps}
    />
  </Link>
);

export default Image;
