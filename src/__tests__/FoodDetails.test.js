import React from 'react';
import { waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../Helper/renderWithRouter';
import renderWithRedux from '../Helper/renderWithRedux';
import getRecipesApi from '../services/getRecipesApi';
import foodDetailsMock from '../__mocks__/foodDetailsMock';
import drinkRecommendationsMock from '../__mocks__/drinkRecommendationsMock';
import FoodDetails from '../pages/FoodDetails';
import replaceStringsYouTube from '../services/replaceStringsYouTube';

afterEach(() => getRecipesApi.mockClear());

jest.mock('../services/getRecipesApi');
getRecipesApi
  .mockImplementationOnce(() => Promise.resolve(foodDetailsMock))
  .mockImplementationOnce(() => Promise.resolve(drinkRecommendationsMock));
// deixando aqui um exemplo de como mockar hook do tipo useParams ou useLocation,
// mas no caso eu acho que a gente não precisa fazer o mock deles aqui!!!
// mockando o hook useParams() (que fornece o id gravado no match.params)
// e o hook useLocation() (que fornece o href gravado no location.pathname):
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'), // retornando todo que ele retornaria normalmente
//   useParams: jest.fn().mockReturnValue({ id: 52978 }), // e alterando apenas os hooks
//   useLocation: jest.fn().mockReturnValue({ pathname: '/comidas/52978' }),
// }));

describe('testes na página FoodDetails', () => {
  it('se as informações detalhadas aparecem corretamente', async () => {
    const { getByText, getByTestId } = renderWithRedux(
      renderWithRouter(<FoodDetails />)
    );
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(1));
    expect(getByText('Kumpir')).toBeInTheDocument();
    expect(getByText('Side')).toBeInTheDocument();
    [
      'Potatoes - 2 large',
      'Butter - 2 tbs',
      'Cheese - 150g',
      'Onion - 1 large',
      'Red Pepper - 1 large',
      'Red Chile Flakes - Pinch',
    ].forEach((ingredientAndMesure, index) =>
      expect(
        getByTestId(`${index}-ingredient-name-and-measure`)
      ).toHaveTextContent(ingredientAndMesure)
    );
    expect(getByTestId('instructions')).toHaveTextContent(
      foodDetailsMock.meals[0].strInstructions
    );
    expect(getByTestId('video')).toHaveAttribute(
      'src',
      replaceStringsYouTube(foodDetailsMock.meals[0].strYoutube)
    );
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(2));
    ['GG', 'A1', 'ABC', 'Kir', '747', '252'].forEach((drinkName, index) =>
      expect(getByTestId(`${index}-recomendation-title`)).toHaveTextContent(
        drinkName
      )
    );
    expect(getByTestId('start-recipe-btn')).toHaveTextContent('Iniciar Receita');
  });
});
