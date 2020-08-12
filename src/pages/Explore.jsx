import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';

function Explore() {
  return (
    <div className="explore-container">
      <Header />
      <section className="explore-links-container">
        <Button test="explore-food" >
          Explorar Comidas
        </Button>
        <Button test="explore-drinks" >
          Explorar Bebidas
        </Button>
      </section>
      <Footer />
    </div>
  );
}

export default Explore;
