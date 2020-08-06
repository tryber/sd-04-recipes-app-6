import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Image = ({ to, src, alt, test }) => (
  <Link to={to}>
    <img src={src} alt={alt} data-testid={test} />
  </Link>
);

export default Image;

Image.propTypes = {
  to: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  test: PropTypes.string.isRequired,
};
