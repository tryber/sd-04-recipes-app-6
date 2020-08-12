import React from 'react';
<<<<<<< HEAD
=======

>>>>>>> master
import Image from './Image';
import drinkLogo from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

import '../App.css';

const Footer = () => (
  <div className="Footer">
<<<<<<< HEAD
    <Image to="" src={drinkLogo} alt={'bebidas'} test={'drinks-bottom-btn'} />
=======
    <Image to="/bebidas" src={drinkLogo} alt={'bebidas'} test={'drinks-bottom-btn'} />
>>>>>>> master

    <Image
      to=""
      src={exploreIcon}
      alt={'explore'}
      test={'explore-bottom-btn'}
    />

<<<<<<< HEAD
    <Image to="" src={mealIcon} alt={'Comidas'} test={'food-bottom-btn'} />
=======
    <Image to="/comidas" src={mealIcon} alt={'Comidas'} test={'food-bottom-btn'} />
>>>>>>> master
  </div>
);
export default Footer;
