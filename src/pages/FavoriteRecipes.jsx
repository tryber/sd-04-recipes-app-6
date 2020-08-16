import React, { Component, useEffect } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Image from '../components/Image';
import { getLocalStorage } from '../services/localStorage';
import TitleAndButtons from '../components/FoodOrDrinkDetailsComponents/TitleAndButtons';

const getDescriptionFavorite = (favorite) => (
  favorite.type === 'comida' ? `${favorite.category} - ${favorite.area}` : favorite.alcoholicOrNot
)
function FavoriteRecipes () {
  const dataFavorites  = getLocalStorage('favoriteRecipes')

  console.log(dataFavorites);
    return (
      <div>
        <Header title={"Receitas Favoritas"}/>
        <div>
          <Button>All</Button>
          <Button>Food</Button>
          <Button>Drinks</Button>
        </div>
        {dataFavorites.map((favorite, index) =>(
          <div key={favorite.name}>
            <Image to={''} src={favorite.image} alt={favorite.name} />
            <div>
        <span>{getDescriptionFavorite(favorite)}</span>
        <h1>{favorite.name}</h1>
        <TitleAndButtons />
            </div>
          </div>
        ))}
      </div>
    );
  }

export default FavoriteRecipes;
