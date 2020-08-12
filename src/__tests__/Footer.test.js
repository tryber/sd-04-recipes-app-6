import React from 'react';
import cleanup, { fireEvent, waitForDomChange } from '@testing-library/react';
import renderWithRouter from '../Helper/renderWithRouter';
import renderWithRedux from '../Helper/renderWithRedux';
import Footer from '../components/Footer';
import App from '../App';
import getRecipesApi from '../services/getRecipesApi';
import foodRecipesMock from '../__mocks__/foodRecipesMock';
import foodCategoriesMock from '../__mocks__/foodCategories.Mock';
import drinkRecipesMock from '../__mocks__/drinkRecipesMock';
import drinkCategoriesMock from '../__mocks__/drinkCategoriesMock';

afterEach(() => {
  cleanup;
});
jest.mock('../services/getRecipesApi');

getRecipesApi.mockImplementationOnce(() => Promise.resolve(foodRecipesMock));
getRecipesApi.mockImplementationOnce(() => Promise.resolve(foodCategoriesMock));
getRecipesApi.mockImplementationOnce(() => Promise.resolve(drinkRecipesMock));
getRecipesApi.mockImplementationOnce(() => Promise.resolve(drinkCategoriesMock));
getRecipesApi.mockImplementationOnce(() => Promise.resolve(foodRecipesMock));
getRecipesApi.mockImplementationOnce(() => Promise.resolve(foodCategoriesMock));


describe('Testes component Footer', () => {
  test('testando Botoes', () => {
    const { getByTestId } = renderWithRedux(renderWithRouter(<Footer />));
    const bebidas = getByTestId('drinks-bottom-btn');
    const comidas = getByTestId('food-bottom-btn');
    const explorar = getByTestId('explore-bottom-btn');
    expect(bebidas).toBeInTheDocument();
    expect(comidas).toBeInTheDocument();
    expect(explorar).toBeInTheDocument();
  })
  test('Click dos botoes', async () => {
    const { getByText, getByTestId } = renderWithRedux(renderWithRouter(<App />, ['/comidas']));
    await waitForDomChange();
    expect(getByText('Comidas')).toBeInTheDocument();
    const bebidas = getByTestId('drinks-bottom-btn');
    fireEvent.click(bebidas);
    await waitForDomChange(() => expect(getByText('Bebidas')).toBeInTheDocument());
    expect(getByTestId('0-recipe-card')).toBeInTheDocument();
    const comidas = getByTestId('food-bottom-btn');
    fireEvent.click(comidas);
    await waitForDomChange(() => expect(getByText('Comidas')).toBeInTheDocument());
   })
})