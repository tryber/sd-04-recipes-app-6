import React, { useEffect, useState } from 'react';
import getRecipesAPI from '../services/getRecipesApi';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoodIngredients() {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    getRecipesAPI(url).then((data) => setIngredients(data.meals));
  }, []);

  return (
    <div className="food-ingredients" >
      <Header />
      {ingredients.map((el, i) => (
        <div>
          <p data-testid={`${i}-card-name`}>{el.strIngredient}</p>
          <img
            src={`https://www.themealdb.com/images/ingredients/${el.strIngredient}.png`}
            alt="thumbnail"
            data-testid={`${i}-card-img`}
          />
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default ExploreFoodIngredients;
