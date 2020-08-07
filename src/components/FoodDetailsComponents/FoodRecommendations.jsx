import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRecommendations } from '../../redux/actions/recommendations';
import Image from '../Image';

const FoodRecommendations = ({
  getRecommendationsProps,
  foodsRecommendations,
}) => {
  useEffect(() => {
    getRecommendationsProps(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );
  }, []);
  return (
    <div className="container">
      <h4>Recomendações</h4>
      <div className="recommendations-container">
        {foodsRecommendations &&
          foodsRecommendations.meals.slice(0, 6).map((foodInfo, index) => (
            <div
              className="recommendations-card"
              data-testid={`${index}-recomendation-card`}
            >
              <Image src={foodInfo.strMealThumb} alt={foodInfo.strMeal} />
              <h4 data-testid={`${index}-recomendation-title`}>
                {foodInfo.strMeal}
              </h4>
            </div>
          ))}
      </div>
    </div>
  );
};

const mapState = (state) => ({
  foodsRecommendations: state.recommendations.recommendationsList,
});

const mapDispatch = {
  getRecommendationsProps: getRecommendations,
};

export default connect(mapState, mapDispatch)(FoodRecommendations);

FoodRecommendations.propTypes = {
  getRecommendationsProps: PropTypes.func.isRequired,
  foodsRecommendations: PropTypes.objectOf(PropTypes.string).isRequired,
};
