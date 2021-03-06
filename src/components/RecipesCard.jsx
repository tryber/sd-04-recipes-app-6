import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from './Image';

const RecipesCard = ({
  to,
  title,
  srcImagem,
  testImage,
  testCard,
  testName,
}) => (
  <Link to={to}>
    <div data-testid={testCard}>
      <Image to={to} src={srcImagem} alt={title} test={testImage} />
      <h1 data-testid={testName}>{title}</h1>
    </div>
  </Link>
);

export default RecipesCard;

RecipesCard.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  srcImagem: PropTypes.string.isRequired,
  testImage: PropTypes.string.isRequired,
  testCard: PropTypes.string.isRequired,
  testName: PropTypes.string.isRequired,
};
