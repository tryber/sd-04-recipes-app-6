const FoodIngredients = ({ ingredients }) => {
  if (ingredients) {
    return (
      <div>
        <h3>Ingredients</h3>
        <ul>
          {ingredients.map((ingredient, i) => (
            <li
              data-testid={`${i}-ingredient-name-and-measure`}
              key={ingredient}
            >
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return <div />;
};

export default FoodIngredients;
