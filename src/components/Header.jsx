import React, { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Image from './Image';
import '../styles/Header.css';
import SearchBar from './SearchBar';
import Button from './Button';

const Header = () => {
  const [searchBar, setSearchBar] = useState(false);
  return (
    <header>
      <div className="title">
        <Image
          to="/perfil"
          src={profileIcon}
          alt="profile icon"
          test="profile-top-btn"
        />
        <h2 data-testid="page-title">Título da página</h2>
        <Button onClick={() => setSearchBar(!searchBar)}>
          <Image src={searchIcon} alt="search icon" test="search-top-btn" />
        </Button>
      </div>
      {searchBar && <SearchBar />}
    </header>
  );
};

export default Header;
