import React from 'react';
import cleanup, { wait, waitForDomChange, getByText } from '@testing-library/react';
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
  it('Verificando se tem os 12 cards na tela de comidas', async () => {
    const { getByTestId } = renderWithRedux(renderWithRouter(<Foods />));
    await waitForDomChange(() => expect(getRecipesApi).toHaveBeenCalledTimes(2));
    [
      'Corba',
      'Kumpir',
      'Dal fry',
      'Poutine',
      'Lasagne',
      'Timbits',
      'Wontons',
      'Kafteji',
      'Big Mac',
      'Kapsalon',
      'Fish pie',
      'Pancakes',
    ].forEach((title, index) => expect(getByTestId(`${index}-card-name`)).toHaveTextContent(title));
  });
});

// só para saber se não vai dar erro de novooooo, não aguento mais isso