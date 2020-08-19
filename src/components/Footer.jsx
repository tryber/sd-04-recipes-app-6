import React from 'react';
import Image from './Image';
import drinkLogo from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

import '../styles/Footer.css';

const Footer = () => (
  <div className="Footer" data-testid="footer">
    <Image to="/bebidas" src={drinkLogo} alt={'bebidas'} test={'drinks-bottom-btn'} />

    <Image
      to="/explorar"
      src={exploreIcon}
      alt={'explore'}
      test={'explore-bottom-btn'}
    />

    <Image to="" src={mealIcon} alt={'Comidas'} test={'food-bottom-btn'} />
  </div>
);
export default Footer;
