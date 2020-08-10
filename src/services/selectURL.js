export const foodURL = (searchInput, selectedRadio) => {
  switch (selectedRadio) {
    case 'ingrediente':
      return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
    case 'nome':
      return `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    case 'primeira-letra':
      return `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
    default:
      return 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  }
};

export const drinkURL = (searchInput, selectedRadio) => {
  switch (selectedRadio) {
    case 'ingrediente':
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
    case 'nome':
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
    case 'primeira-letra':
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;
    default:
      return 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  }
};
