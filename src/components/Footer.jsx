import React from 'react';
import { useHistory } from 'react-router-dom';
import Image from './Image';
import drinkLogo from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import searchIcon from '../images/searchIcon.svg';

import '../App.css';

const Footer = () => {
  const history = useHistory();
  return (
    <div className="Footer">
      <Image
        onClick={() => history.push('/bebidas')}
        src={drinkLogo}
        alt="bebidas"
        test={'drinks-bottom-btn'}
      />
      <Image
        onClick={() => history.push('/explorar')}
        src={searchIcon}
        alt="explorar"
        test={'explore-bottom-btn'}
      />
      <Image
        onClick={() => history.push('/comida')}
        src={mealIcon}
        alt="comida"
        test={'food-bottom-btn'}
      />
    </div>
  );
};
export default Footer;
