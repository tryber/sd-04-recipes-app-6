import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import FavoriteButton from '../../images/whiteHeartIcon.svg';
import ShareButton from '../../images/shareIcon.svg';

const TitleAndButtons = ({ title, category }) => (
  <div className="nav-title-buttons">
    <div>
      <h3 data-testid="recipe-title" className="details-name">
        {title}
      </h3>
      <h4 data-testid="recipe-category">{category}</h4>
    </div>
    <div>
      <Image
        width={`${35}%`}
        test="share-btn"
        src={ShareButton}
        alt="share-icon-button"
      />
      <Image
        width={`${35}%`}
        test="favorite-btn"
        src={FavoriteButton}
        alt="favorite-icon-button"
      />
    </div>
  </div>
);

export default TitleAndButtons;

TitleAndButtons.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
