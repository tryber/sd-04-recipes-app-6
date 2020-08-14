const getIngredients = (drinkOrFoodDetails) => {
  const ingredientsNumber = Object.keys(drinkOrFoodDetails).filter((key) =>
    key.includes('strIngredient')
  );
  const ingredientsKeys = ingredientsNumber
    .filter((ingKey) => drinkOrFoodDetails[ingKey] !== null)
    .filter((ingredientKey) => drinkOrFoodDetails[ingredientKey] !== '');
  // tive que filtrar duas vezes pq essa API é ruim demais!!! Uma hora tem "" outra hora tem null
  return ingredientsKeys;
};

export default getIngredients;
