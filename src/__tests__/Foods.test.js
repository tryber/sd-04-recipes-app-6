import React from 'react';
import cleanup, { fireEvent } from '@testing-library/react';
import renderWithRouter from '../Helper/renderWithRouter';
import renderWithRedux from '../Helper/renderWithRedux';
import Foods from '../pages/Foods';
import getRecipesApi from '../services/getRecipesApi';
import foodRecipesMock from '../__mocks__/foodRecipesMock';
import foodCategoriesMock from '../__mocks__/foodCategories.Mock';

afterEach(() => {
  cleanup;
});

jest.mock('../services/getRecipesApi');
getRecipesApi.mockImplementationOnce(() => Promise.resolve(foodRecipesMock));
getRecipesApi.mockImplementationOnce(() => Promise.resolve(foodCategoriesMock));

describe('Testes na tela principal', () => {
  it('Verificando se tem os 12 cards na tela de comidas', () => {
    const { getByTestId, getAllByTestId } = renderWithRedux(renderWithRouter(<Foods />));
    const dataMeals = getAllByTestId('');
    expect;
  });
});
