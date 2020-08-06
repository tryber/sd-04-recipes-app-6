import React from 'react';
import Image from './Image';
import drinkLogo from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

import '../App.css';

const Footer = () => (
  <div className="Footer">
    <Image to="" src={drinkLogo} alt={'bebidas'} test={'drinks-bottom-btn'} />

    <Image
      to=""
      src={exploreIcon}
      alt={'explore'}
      test={'explore-bottom-btn'}
    />

    <Image to="" src={mealIcon} alt={'Comidas'} test={'food-bottom-btn'} />
  </div>
);
export default Footer;
