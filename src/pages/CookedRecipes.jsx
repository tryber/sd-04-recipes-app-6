import React, { useState } from 'react';
import Button from '../components/Button';
import Image from '../components/Image';
import copyToClipboard from 'clipboard-copy';
import recipesPagination from '../services/recipesPagination';
import { element } from 'prop-types';

const done = [
  {
    id: '52882',
    type: 'comida',
    area: 'area-da-receita-ou-texto-vazio',
    category: 'Seafood',
    alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
    name: 'Three Fish Pie',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: 'uando-a-receita-foi-concluida',
    tags: ['array-de-tags-da-receita-ou-array-vazio'],
  },
  {
    id: '17256',
    type: 'bebida',
    area: 'area-da-receita-ou-texto-vazio',
    category: 'Cocktail',
    alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
    name: 'Martinez 2',
    image:
      'https://www.thecocktaildb.com/images/media/drink/fs6kiq1513708455.jpg',
    doneDate: 'uando-a-receita-foi-concluida',
    tags: [
      'array-de-tags-da-receita-ou-array-vazio',
      'sldfhasd',
      'sakldfjaskd',
    ],
  },
];
const hello = (filter) => {
  if (filter === '') {
    return done;
  }
  if (filter === 'comida') {
    return done.filter((element) => element.type === filter);
  }
  if (filter === 'bebida') {
    return done.filter((element) => element.type === filter);
  }
};

const CookedRecipes = () => {
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
      {hello(filter).map((element, index) => (
        <div>
          <Button
            onClick={() => {
              copyToClipboard(
                `http://localhost:3000/${element.type}s/${element.id}`
              );
              setCopy(!copy);
            }}
          >
            Copy
          </Button>
          <Image
            src={element.image}
            test={`${index}-horizontal-image`}
            width="100px"
          />
          <h4 data-testid={`${index}-horizontal-name`}>{element.name}</h4>
          <div data-testid={`${index}-horizontal-top-text`}>
            <p>{element.category}</p>
            <p>{element.area}</p>
          </div>
          <p data-testid={`${index}-horizontal-done-date`}>
            {' '}
            {element.doneDate}
          </p>
          <p>
            {recipesPagination(element.tags, 0, 2).map((element, index) => {
              return (
                <p data-testid={`${index}-${element}-horizontal-tag`}>
                  {' '}
                  {element}
                </p>
              );
            })}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CookedRecipes;
