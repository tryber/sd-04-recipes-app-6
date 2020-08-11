import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';
import Input from './Input';
import Button from './Button';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';
import { foodURL, drinkURL } from '../services/selectURL';

const SearchBar = ({ getFoodRecipes }) => {
  const [searchInput, setSearchInput] = useState('');
  const [radioInput, setRadioInput] = useState(null);
  const { pathname } = useLocation();
  return (
    <nav>
      <div className="input-and-radio">
        <Input
          onChange={(e) => setSearchInput(e.target.value)}
          test="search-input"
        />
        <div className="input-radio-container">
          <Input
            onChange={(e) => setRadioInput(e.target.id)}
            test="ingredient-search-radio"
            id="ingrediente"
            type="radio"
            name="tipo-de-busca"
          />
          <label htmlFor="ingrediente">Ingrediente</label>
          <Input
            onChange={(e) => setRadioInput(e.target.id)}
            test="name-search-radio"
            id="nome"
            type="radio"
            name="tipo-de-busca"
          />
          <label htmlFor="nome">Nome</label>
          <Input
            onChange={(e) => setRadioInput(e.target.id)}
            id="primeira-letra"
            test="first-letter-search-radio"
            type="radio"
            name="tipo-de-busca"
          />
          <label htmlFor="primeira-letra">Primeira letra</label>
        </div>
      </div>
      <Button
        onClick={() => {
          if (radioInput === 'primeira-letra' && searchInput.length > 1) {
            return alert('Sua busca deve conter somente 1 (um) caracter');
          }
          if (pathname === '/comidas') {
            return getFoodRecipes(foodURL(searchInput, radioInput));
          }
          if (pathname === '/bebidas') {
            return getFoodRecipes(drinkURL(searchInput, radioInput));
          }
          return null;
        }}
        disabled={!searchInput || !radioInput}
        test="exec-search-btn"
      >
        Buscar
      </Button>
    </nav>
  );
};

const mapDispatch = {
  getFoodRecipes: getFoodsAndDrinks,
};

export default connect(null, mapDispatch)(SearchBar);

SearchBar.propTypes = {
  getFoodRecipes: PropTypes.func.isRequired,
};
