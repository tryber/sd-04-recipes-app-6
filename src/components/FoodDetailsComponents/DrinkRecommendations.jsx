import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRecommendations } from '../../redux/actions/recommendations';
import Image from '../Image';
import '../../styles/FoodDetails.css';

const DrinkRecommendations = ({
  getRecommendationsProps,
  drinksRecommendations,
}) => {
  useEffect(() => {
    getRecommendationsProps(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    );
  }, []);
  return (
    <div className="container">
      <h4>Recomendadas</h4>
      <div className="recommendations-container">
        {drinksRecommendations &&
          drinksRecommendations.drinks.slice(0, 6).map((drinkInfo, index) => (
            <div
              className="recommendations-card"
              data-testid={`${index}-recomendation-card`}
            >
              {console.log(drinkInfo)}
              <Image src={drinkInfo.strDrinkThumb} alt={drinkInfo.strDrink} />
              <h4 data-testid={`${index}-recomendation-title`}>
                {drinkInfo.strDrink}
              </h4>
            </div>
          ))}
      </div>
    </div>
  );
};

const mapState = (state) => ({
  drinksRecommendations: state.recommendations.recommendationsList,
});

const mapDispatch = {
  getRecommendationsProps: getRecommendations,
};

export default connect(mapState, mapDispatch)(DrinkRecommendations);

DrinkRecommendations.propTypes = {
  getRecommendationsProps: PropTypes.func.isRequired,
  drinksRecommendations: PropTypes.objectOf(PropTypes.string).isRequired,
};
