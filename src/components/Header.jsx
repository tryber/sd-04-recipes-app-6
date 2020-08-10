import React, { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Image from './Image';
import '../styles/Header.css';
import SearchBar from './SearchBar';
import Button from './Button';

const Header = ({ isSearchActive, title }) => {
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
        <h2 data-testid="page-title">{title}</h2>
        {isSearchActive && (
          <Button onClick={() => setSearchBar(!searchBar)}>
            <Image src={searchIcon} alt="search icon" test="search-top-btn" />
          </Button>
        )}
      </div>
      {searchBar && <SearchBar />}
    </header>
  );
};

export default Header;

Header.defaultProps = {
  isSearchActive: false,
};

Header.propTypes = {
  isSearchActive: PropTypes.bool,
  title: PropTypes.string.isRequired,
};
