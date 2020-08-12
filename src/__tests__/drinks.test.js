import React from 'react';
import cleanup, { waitForDomChange } from '@testing-library/react';
import renderWithRouter from '../Helper/renderWithRouter';
import renderWithRedux from '../Helper/renderWithRedux';
import Drinks from '../pages/Drinks';
import getRecipesApi from '../services/getRecipesApi';
import drinkRecipesMock from '../__mocks__/drinkRecipesMock';
import drinkCategoriesMock from '../__mocks__/drinkCategories.Mock';

afterEach(() => {
  cleanup;
});

jest.mock('../services/getRecipesApi');
getRecipesApi.mockImplementationOnce(() => Promise.resolve(drinkRecipesMock));
getRecipesApi.mockImplementationOnce(() =>
  Promise.resolve(drinkCategoriesMock)
);

describe('Testes na tela de Bebidas', () => {
  it('Verificando se tem os 12 cards na tela de bebidas', async () => {
    const { getByTestId } = renderWithRedux(renderWithRouter(<Drinks />));
    await waitForDomChange(() =>
      expect(getRecipesApi).toHaveBeenCalledTimes(2)
    );
    [
      'GG',
      'A1',
      'ABC',
      'Kir',
      '747',
      '252',
      'Ace',
      'Adam',
      'B-53',
      'AT&T',
      'ACID',
      'B-52',
    ].forEach((title, index) =>
      expect(getByTestId(`${index}-card-name`)).toHaveTextContent(title)
    );
  });
});
