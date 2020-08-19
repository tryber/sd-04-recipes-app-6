import React, { useState } from 'react';
import copyToClipboard from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Image from '../components/Image';
import recipesPagination from '../services/recipesPagination';
import { getLocalStorage } from '../services/localStorage';
import Header from '../components/Header';
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
      <Header title={'Receitas-Feitas'} />
      <Button onClick={() => setFilter('')} test="filter-by-all-btn">
        ALL
      </Button>
      <Button onClick={() => setFilter('comida')} test="filter-by-food-btn">
        FOODS
      </Button>
      <Button onClick={() => setFilter('bebida')} test="filter-by-drink-btn">
        DRINKS
      </Button>
      {theFilter(filter, done).map((recipe, index) => (
        <div>
          <Button
            test={`${index}-horizontal-share-btn`}
            onClick={() => {
              copyToClipboard(
                `http://localhost:3000/${recipe.type}s/${recipe.id}`,
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
            to={`/${recipe.type}s/${recipe.id}`}
            src={recipe.image}
            test={`${index}-horizontal-image`}
            width="100px"
          />
          <Link to={`/${recipe.type}s/${recipe.id}`}>
            <h4 data-testid={`${index}-horizontal-name`}>{recipe.name}</h4>
          </Link>
          <div data-testid={`${index}-horizontal-top-text`}>
            {recipe.area} - {recipe.category} - {recipe.alcoholicOrNot}
          </div>
          <p data-testid={`${index}-horizontal-done-date`}>
            {' '}
            {recipe.doneDate}
          </p>
          <div>
            {recipe.tags && recipesPagination(recipe.tags, 0, 2).map((tag) => (
              <p data-testid={`${index}-${tag}-horizontal-tag`}> {tag}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CookedRecipes;
