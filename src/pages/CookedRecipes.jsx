import React, { useState } from 'react';
import copyToClipboard from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Image from '../components/Image';
import recipesPagination from '../services/recipesPagination';
import { getLocalStorage } from '../services/localStorage';
import ShareButton from '../images/shareIcon.svg';

const theFilter = (filter, done) => {
  if (filter === '') {
    return done;
  }
  if (filter === 'comida') {
    return done.filter((element) => element.type === filter);
  }
  if (filter === 'bebida') {
    return done.filter((element) => element.type === filter);
  }
  return true;
};

const CookedRecipes = () => {
  const done = getLocalStorage('doneRecipes');
  const [filter, setFilter] = useState('');
  const [copy, setCopy] = useState(false);

  return (
    <div>
      <Button onClick={() => setFilter('')} test="filter-by-all-btn">
        ALL
      </Button>
      <Button onClick={() => setFilter('comida')} test="filter-by-food-btn">
        FOODS
      </Button>
      <Button onClick={() => setFilter('bebida')} test="filter-by-drink-btn">
        DRINKS
      </Button>
      {theFilter(filter, done).map((element, index) => (
        <div>
          <Button
            test={`${index}-horizontal-share-btn`}
            onClick={() => {
              copyToClipboard(
                `http://localhost:3000/${element.type}s/${element.id}`,
              );
              setCopy(!copy);
            }}
            src={ShareButton}
          >
            <Image
              src={ShareButton}
              width={`${35}%`}
              test="share-btn"
              alt="share-icon-button"
            />
          </Button>
          {copy && <span>Link copiado!</span>}
          <Image
            to={`/${element.type}s/${element.id}`}
            src={element.image}
            test={`${index}-horizontal-image`}
            width="100px"
          />
          <Link to={`/${element.type}s/${element.id}`}>
            <h4 data-testid={`${index}-horizontal-name`}>{element.name}</h4>
          </Link>
          <div data-testid={`${index}-horizontal-top-text`}>
            {element.area} - {element.category} - {element.alcoholicOrNot}
          </div>
          <p data-testid={`${index}-horizontal-done-date`}>
            {' '}
            {element.doneDate}
          </p>
          <p>
            {recipesPagination(element.tags, 0, 2).map((e) => (
              <p data-testid={`${index}-${e}-horizontal-tag`}> {element}</p>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CookedRecipes;
