import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getRecipesAPI from '../services/getRecipesApi';

function ExploreDrinkIngredients() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getRecipesAPI(url)
      .then(data => setIngredients(data.drinks))
    }, []);

    return ( 
      <div> {ingredients.map((el) => (<div>
        <p>{el.strIngredient1}</p>
        <img src={`https://www.thecocktaildb.com/images/ingredients/${el.strIngredient1}-Small.png`} alt="thumbnail"/>
      </div>) )}
     
    </div>
  );
}

export default ExploreDrinkIngredients;
