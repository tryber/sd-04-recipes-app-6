import React from 'react';
import { connect } from 'react-redux';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';

function Drinks(props) {
  return <div></div>;
}

const mapDispatchToProps = {
  recipesDrinks: getFoodsAndDrinks,
};
export default connect(null, mapDispatchToProps)(Drinks);
