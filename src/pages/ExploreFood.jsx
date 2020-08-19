import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import getRecipesAPI from '../services/getRecipesApi';

const ExploreFood = () => {
  const history = useHistory();
  const handleClick = () => {
    getRecipesAPI('https://www.themealdb.com/api/json/v1/1/random.php').then((data) =>
      history.push(`/comidas/${data.meals[0].idMeal}`),
    );
  };

  return (
    <div>
      <Header title="Explorar" />
      <div className="explore">
        <Button
          test="explore-by-ingredient"
          onClick={() => history.push('/explorar/comidas/ingredientes')}
        >
          Por Ingredientes
        </Button>
        <Button test="explore-by-area" onClick={() => history.push('/explorar/comidas/area')}>
          Por Local de Origem
        </Button>
        <Button test="explore-surprise" onClick={handleClick}>
          Me Surpreenda!
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreFood;
