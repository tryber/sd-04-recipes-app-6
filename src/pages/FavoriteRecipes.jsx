import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Image from '../components/Image';
import { getLocalStorage } from '../services/localStorage';
import TitleAndButtons from '../components/FoodOrDrinkDetailsComponents/TitleAndButtons';
import '../styles/Favorite.css';

const getDescriptionFavorite = (favorite) =>
  favorite.type === 'comida'
    ? `${favorite.category} - ${favorite.area}`
    : favorite.alcoholicOrNot;

const filterFavorites = (type, dataFavorites) =>
  type === 'All'
    ? dataFavorites
    : dataFavorites.filter((favorite) => favorite.type === type);

function FavoriteRecipes() {
  const dataFavorites = getLocalStorage('favoriteRecipes');

  const [typeFilter, setTypeFilter] = useState('All');
  const favoritesAll = filterFavorites(typeFilter, dataFavorites);

  return (
    <div>
      <Header title={'Receitas Favoritas'} />
      <div className="favorite">
        <div className="favorite-category">
          <Button
            onClick={() => {
              setTypeFilter('All');
            }}
          >
            All
          </Button>
          <Button
            onClick={() => {
              setTypeFilter('comida');
            }}
          >
            Food
          </Button>
          <Button
            onClick={() => {
              setTypeFilter('bebida');
            }}
          >
            Drinks
          </Button>
        </div>
        {favoritesAll.map((favorite, index) => (
            <Link to={`/${favorite.type}s/${favorite.id}`}>
          <div className="favorite-card" key={favorite.name}>
            <div className="favorite-card-details">
              <Image to={`/${favorite.type}s/${favorite.id}`} src={favorite.image} alt={favorite.name} />
            </div>
            <div className="favorite-card-details">
              <span>{getDescriptionFavorite(favorite)}</span>
              <h1 className="favorite-card-details-title">{favorite.name}</h1>
              <TitleAndButtons
                alcoholicOrNot={favorite.alcoholicOrNot}
                title={favorite.name}
                area={favorite.area}
                image={favorite.image}
                type={favorite.type}
                id={favorite.id}
                category={favorite.category}
                testid={`${index}-horizontal-favorite-btn`}
              />
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
