import React from 'react';

import IconeLink from './Image';
import drinkLogo from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

import '../App.css';

const Footer = () => {
  return (
  <div className="Footer">
    <IconeLink
      toProps=""
      srcProps={drinkLogo}
      altProps={'bebidas'}
      testProps={'drinks-bottom-btn'}
    />

    <IconeLink
      toProps=""
      srcProps={exploreIcon}
      altProps={'explore'}
      testProps={'explore-bottom-btn'}
    />

    <IconeLink
      toProps=""
      srcProps={mealIcon}
      altProps={'Comidas'}
      testProps={'food-bottom-btn'}
    />
  </div>
);
  }
export default Footer;
