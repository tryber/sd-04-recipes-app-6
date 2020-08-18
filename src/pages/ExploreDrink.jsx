import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import getRecipesAPI from '../services/getRecipesApi';

const ExploreDrinks = () => {
  const history = useHistory();

  const handleClick = () => {
    getRecipesAPI('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((data) => history.push(`/bebidas/${data.drinks[0].idDrink}`));
  };

  return (
    <div>
      <Header title="Explorar" />
      <div className="explore">
        <Button
          data-testid="explore-by-ingredient"
          onClick={() => history.push('/explorar/bebidas/ingredientes')}
        >
          Por Ingredientes
        </Button>
        <Button
          data-testid="explore-surprise"
          onClick={handleClick}
        >
          Me Surpreenda!
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreDrinks;
