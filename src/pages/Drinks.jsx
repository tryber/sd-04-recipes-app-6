import React from 'react';
import { connect } from 'react-redux';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';

function Drinks(props) {
  return (
    <div>
      <h1>Tela Principal Bebidas</h1>
    </div>
  );
}

const mapDispatchToProps = {
  recipesDrinks: getFoodsAndDrinks,
};
export default connect(null, mapDispatchToProps)(Drinks);
