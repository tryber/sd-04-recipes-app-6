import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

const Explore = () => {
  const history = useHistory();
  return (
    <div>
      <Header title="Explorar" />
      <div className="explore">
        <Button data-testid="explore-food" onClick={() => history.push('/explorar/comidas')}>
          Explorar Comidas
        </Button>
        <Button
          data-testid="explore-drinks"
          onClick={() => {
            history.push('/explorar/bebidas');
          }}
        >
          Explorar Bebidas
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default Explore;
