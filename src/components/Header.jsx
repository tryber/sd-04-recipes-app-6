import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Image from './Image';
import '../styles/Header.css';
import Input from './Input';
import Button from './Button';

const Header = () => {
  const history = useHistory();
  return (
    <header>
      <div className="title">
        <Image
          onClick={() => history.push('/perfil')}
          src={profileIcon}
          alt="profile icon"
          test="profile-top-btn"
        />
        <h2 data-testid="page-title">Título da página</h2>
        <Image src={searchIcon} alt="search icon" test="search-top-btn" />
      </div>
      <nav>
        <Input test="search-input" />
        <div>
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
        <Button test="exec-search-btn" />
      </nav>
    </header>
  );
};

export default Header;
