import React, { useEffect, useState } from 'react';
import getRecipesAPI from '../services/getRecipesApi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import recipesPagination from '../services/recipesPagination';

function ExploreDrinkIngredients() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getRecipesAPI(url).then((data) => setIngredients(data.drinks));
  }, []);

  return (
    <div>
      <Header />
      {recipesPagination(ingredients, 0, 12).map((el, i) => (
        <div data-testid={`${i}-ingredient-card`}>
          <p data-testid={`${i}-card-name`}>{el.strIngredient1}</p>
          <img
            src={`https://www.thecocktaildb.com/images/ingredients/${el.strIngredient1}-Small.png`}
            alt="thumbnail"
            data-testid={`${i}-card-img`}
          />
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredients;
