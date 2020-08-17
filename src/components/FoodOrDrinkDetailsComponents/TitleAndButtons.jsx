import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import copyToClipboard from 'clipboard-copy';
import Image from '../Image';
import FavoriteWhite from '../../images/whiteHeartIcon.svg';
import FavoriteBlack from '../../images/blackHeartIcon.svg';
import ShareButton from '../../images/shareIcon.svg';
import Button from '../Button';
import { updateFavorite, checkFavorite } from '../../services/localStorage';

const TitleAndButtons = ({
  alcoholicOrNot = '',
  area = '',
  category,
  id,
  image,
  title,
  type,
}) => {
  const { pathname } = useLocation();
  const [copy, setCopy] = useState(false);

  return (
    <div>
      <div className="nav-title-buttons">
        <div>
          <h3 data-testid="recipe-title" className="details-name">
            {title}
          </h3>
          <h4 data-testid="recipe-category">
            {pathname.includes('bebidas') ? alcoholicOrNot : category}
          </h4>
        </div>
        <div className="share-like-buttons-container">
          <Button
            onClick={() => {
              copyToClipboard(`http://localhost:3000/${type}s/${id}`);
              setCopy(!copy);
            }}
          >
            <Image
              width={`${35}%`}
              test="share-btn"
              src={ShareButton}
              alt="share-icon-button"
            />
          </Button>
          <Button
            onClick={() =>
              updateFavorite(
                id,
                type,
                area,
                category,
                alcoholicOrNot,
                title,
                image,
              )
            }
          >
            <Image
              width={`${35}%`}
              test="favorite-btn"
              src={checkFavorite(id) ? FavoriteBlack : FavoriteWhite}
              alt="favorite-icon-button"
            />
          </Button>
        </div>
      </div>
      {copy && <p>Link copiado!</p>}
    </div>
  );
};

export default TitleAndButtons;

TitleAndButtons.propTypes = {
  alcoholicOrNot: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
