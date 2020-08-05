const getRecipesAPI = (url) =>
  fetch(url).then((response) =>
    response.json().then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data))),
  );

// const ApiDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
// const getRecipesDrinksAPI = () =>
//   fetch(ApiDrinks).then((response) =>
//     response.json().then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data))),
//   );

//www.thecocktaildb.com/api/json/v1/1/search.php?s=

export default getRecipesAPI;
