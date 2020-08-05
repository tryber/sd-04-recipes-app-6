import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ onClick, src, alt, test }) => (
  <img onClick={onClick} src={src} alt={alt} data-testid={test} />
);

export default Image;

Image.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  test: PropTypes.string.isRequired,
};
