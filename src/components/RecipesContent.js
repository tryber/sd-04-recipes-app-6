const renderDetails = (data) => (
  <div>
    <img
      data-testid="recipe-photo"
      className="details-img"
      alt={data.name}
      src={data.image}
    />
    <div id="title-wrapper">
      <p data-testid="recipe-title" className="details-name">
        {data.name}
      </p>
    </div>
    <div>
      <h4 data-testid="recipe-category">{data.category}</h4>
    </div>
  </div>
);


const renderIngredients = (ingredients) => {
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
