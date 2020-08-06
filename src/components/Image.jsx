import React from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom'

const Image = ({ toProps, test, altProps, srcProps }) => (
  <Link to={toProps} data-testid={test}>
    <img
      style={{ width: '25px', height: '20px' }}
      alt={altProps}
      src={srcProps}
    />
=======
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Image = ({ to, src, alt, test }) => (
  <Link to={to}>
    <img src={src} alt={alt} data-testid={test} />
>>>>>>> 4ad4d45065ac260435f5ee90d64b217a380ca1d8
  </Link>
);

export default Image;
<<<<<<< HEAD
=======

Image.propTypes = {
  to: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  test: PropTypes.string.isRequired,
};
>>>>>>> 4ad4d45065ac260435f5ee90d64b217a380ca1d8
