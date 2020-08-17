import React from 'react';
import { useHistory } from 'react-router-dom'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

const ExploreFood = () => {
  const history = useHistory();
  return (
  <div>
    <Header title="Explorar" />
    <div className="explore">
      <Button
        data-testid="explore-by-ingredient"
        onClick={() => history.push('/explorar/comidas/ingredientes')}
      >
        Por Ingredientes
      </Button>
      <Button
        data-testid="explore-by-area"
        onClick={() => history.push('/explorar/comidas/area')}
      >
        Por Local de Origem
      </Button>
      <Button
        data-testid="explore-surprise"
        onClick={() => history.push('/comidas/:id')}
      >
        Me Surpreenda!
      </Button>
    </div>
    <Footer />
  </div>
  )
};

export default ExploreFood;
