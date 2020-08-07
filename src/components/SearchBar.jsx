import React from 'react';
import '../styles/Header.css';
import Input from './Input';
import Button from './Button';

const SearchBar = () => (
  <nav>
    <div className="input-and-radio">
      <Input test="search-input" />
      <div className="input-radio-container">
        <Input
          test="ingredient-search-radio"
          id="ingrediente"
          type="radio"
          name="tipo-de-busca"
        />
        <label htmlFor="ingrediente">Ingrediente</label>
        <Input
          test="name-search-radio"
          id="nome"
          type="radio"
          name="tipo-de-busca"
        />
        <label htmlFor="nome">Nome</label>
        <Input
          id="primeira-letra"
          test="first-letter-search-radio"
          type="radio"
          name="tipo-de-busca"
        />
        <label htmlFor="primeira-letra">Primeira letra</label>
      </div>
    </div>
    <Button test="exec-search-btn">Buscar</Button>
  </nav>
);

export default SearchBar;
