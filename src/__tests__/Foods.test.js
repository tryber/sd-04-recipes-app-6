import React from 'react';
import cleanup, { waitForDomChange, fireEvent, queryAllByTestId} from '@testing-library/react';
import renderWithRouter from '../Helper/renderWithRouter';
import renderWithRedux from '../Helper/renderWithRedux';
import App from '../App';
import getRecipesApi from '../services/getRecipesApi';
import foodRecipesMock from '../__mocks__/foodRecipesMock';
import foodCategoriesMock from '../__mocks__/foodCategories.Mock';
import foodDetails52977 from '../__mocks__/foodDetails52977';

jest.mock('../services/getRecipesApi');

afterEach(() => {
  cleanup;
});

const mockFoods = () => {
  getRecipesApi.mockImplementationOnce(() => Promise.resolve(foodRecipesMock));
  getRecipesApi.mockImplementationOnce(() => Promise.resolve(foodCategoriesMock));
}

describe('Testes na tela de comida', () => {
  it('Verificando se tem os 12 cards na tela de comidas', async () => {
    mockFoods();
    const { getByTestId } = renderWithRedux(renderWithRouter(<App />, ['/comidas'])); // pega 2 params
    await waitForDomChange(() => expect(getRecipesApi).toHaveBeenCalledTimes(2)); // qtd chamada
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

  it('Verificando se tem botão próximo, e se esta exibindo os 12 próximos cards', async () => {
    mockFoods();
    const { getByTestId, getByText, queryAllByTestId } = renderWithRedux(renderWithRouter(<App />, ['/comidas']));
    await waitForDomChange(() =>
      expect(getRecipesApi).toHaveBeenCalledTimes(2));
      const buttonProximo = getByText('Proximo');
      fireEvent.click(buttonProximo); // clicando no botão Próximo
      expect(getByTestId('0-card-name')).toHaveTextContent('Kedgeree');
      expect(queryAllByTestId(/-card-name$/)).toHaveLength(12);
  });

  it('Verificando se tem 5 primeiras categorias', async () => {
    mockFoods();
    const { getByTestId } = renderWithRedux(renderWithRouter(<App />, ['/comidas']));
    await waitForDomChange(() =>
      expect(getRecipesApi).toHaveBeenCalledTimes(2));
      [
        'Beef',
        'Breakfast',
        'Chicken',
        'Dessert',
        'Goat',
      ].forEach((text) => expect(getByTestId(`${text}-category-filter`)).toHaveTextContent(text));
    });

    it('Verificando se tem 5 primeiras categorias ddd', async () => {
      mockFoods();
      const { getByTestId, container } = renderWithRedux(renderWithRouter(<App />, ['/comidas']));
      await waitForDomChange(() =>
      expect(getRecipesApi).toHaveBeenCalledTimes(2));
      const card = getByTestId('0-recipe-card');
      console.log('Ola mundãooooo!!');
      getRecipesApi.mockImplementationOnce(() => Promise.resolve(foodDetails52977));

      fireEvent.click(card);
      await waitForDomChange(() =>
      expect(getRecipesApi).toHaveBeenCalledTimes(2));
            
      console.log('Ola vidãooo!')
      console.log(container);

      });
  });
