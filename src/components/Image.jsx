import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Image = ({ to, src, alt, width, test }) => (
  <Link to={to}>
    <img src={src} alt={alt} width={width} data-testid={test} />
  </Link>
);

export default Image;

Image.defaultProps = {
  width: `${100}%`,
};

Image.propTypes = {
  width: PropTypes.string,
  to: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  test: PropTypes.string.isRequired,
};
