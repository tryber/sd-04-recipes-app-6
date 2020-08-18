import React, { useEffect, useState } from 'react';
import getRecipesAPI from '../services/getRecipesApi';

function ExploreFoodIngredients() {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    getRecipesAPI(url).then((data) => setIngredients(data.meals));
  }, []);
  console.log(ingredients);

  return (
    <div>
      {ingredients.map((el) => (
        <div>
          <p>{el.strIngredient}</p>
          <img
            src={`https://www.themealdb.com/images/ingredients/${el.strIngredient}.png`}
            alt="thumbnail"
          />
        </div>
      ))}
    </div>
  );
}

export default ExploreFoodIngredients;
