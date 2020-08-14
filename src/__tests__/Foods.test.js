import React from 'react';
import cleanup, { fireEvent, waitFor } from '@testing-library/react';
import renderWithRouter from '../Helper/renderWithRouter';
import renderWithRedux from '../Helper/renderWithRedux';
import App from '../App';
import getRecipesApi from '../services/getRecipesApi';
import foodRecipesMock from '../__mocks__/foodRecipesMock';
import foodCategoriesMock from '../__mocks__/foodCategories.Mock';
import foodDetails52977 from '../__mocks__/foodDetails52977';
import drinkRecommendationsMock from '../__mocks__/drinkRecommendationsMock';
import categoryBeefMock from '../__mocks__/categoryBeefMock';

jest.mock('../services/getRecipesApi');

afterEach(() => {
  cleanup;
  getRecipesApi.mockClear();
});

const apiMockFoodsAndCategories = () => {
  getRecipesApi.mockImplementationOnce(() => Promise.resolve(foodRecipesMock));
  getRecipesApi.mockImplementationOnce(() =>
    Promise.resolve(foodCategoriesMock)
  );
};

// Test 1
apiMockFoodsAndCategories();
// Test 2
apiMockFoodsAndCategories();
// Test 3
apiMockFoodsAndCategories();
// Test 4
apiMockFoodsAndCategories();
getRecipesApi.mockImplementationOnce(() => Promise.resolve(categoryBeefMock));
// Test 5
apiMockFoodsAndCategories();
getRecipesApi.mockImplementationOnce(() => Promise.resolve(foodDetails52977));
getRecipesApi.mockImplementationOnce(() =>
  Promise.resolve(drinkRecommendationsMock)
);
// Test 6
apiMockFoodsAndCategories();
// Test 7
apiMockFoodsAndCategories();
getRecipesApi.mockImplementationOnce(() => Promise.resolve(categoryBeefMock));
getRecipesApi.mockImplementationOnce(() => Promise.resolve(foodRecipesMock));
// Test 8
apiMockFoodsAndCategories();
getRecipesApi.mockImplementationOnce(() => Promise.resolve(categoryBeefMock));
getRecipesApi.mockImplementationOnce(() => Promise.resolve(foodRecipesMock));

describe('Testes na tela de comida', () => {
  it('Verificando se tem os 12 cards na tela de comidas', async () => {
    const { getByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/comidas'])
    ); // pega 2 params
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(2)); // qtd chamada
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
    ].forEach((title, index) =>
      expect(getByTestId(`${index}-card-name`)).toHaveTextContent(title)
    );
  });

  it('Verificando se tem botão próximo, e se esta exibindo os 12 próximos cards', async () => {
    const { getByTestId, getByText, queryAllByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/comidas'])
    );
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(2));
    const buttonProximo = getByText('Proximo');
    fireEvent.click(buttonProximo); // clicando no botão Próximo
    expect(getByTestId('0-card-name')).toHaveTextContent('Kedgeree');
    expect(queryAllByTestId(/-card-name$/)).toHaveLength(12); // usando Regex, pegando o que
    // finaliza com este
  });

  it('Verificando se tem 5 primeiras categorias', async () => {
    const { getByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/comidas'])
    );
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(2));
    ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'].forEach((text) =>
      expect(getByTestId(`${text}-category-filter`)).toHaveTextContent(text)
    );
  });

  it('Verificando se ao clicar no botão Beef, traz as receitas relacionadas', async () => {
    const { getByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/comidas'])
    );
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(2));
    const category = getByTestId('Beef-category-filter');
    expect(category).toHaveTextContent('Beef');
    fireEvent.click(category);
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(3));
    expect(getByTestId('0-card-name')).toHaveTextContent(
      'Beef and Mustard Pie'
    );
  });

  it('Verificando se ao clicar no card esta indo para a página de detalhe', async () => {
    const { getByTestId, getByText } = renderWithRedux(
      renderWithRouter(<App />, ['/comidas'])
    );
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(2));
    const card = getByTestId('0-recipe-card');
    fireEvent.click(card);
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(4));
    expect(getByText('Side')).toBeInTheDocument();
  });

  it('Vericando se ao entrar na tela de Comidas, aparece o header "Comidas" ', async () => {
    const { getByText } = renderWithRedux(
      renderWithRouter(<App />, ['/comidas'])
    );
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(2));
    const headerTitle = getByText('Comidas');
    expect(headerTitle).toBeInTheDocument();
  });

  it('Verificando se ao clicar no botão Beef, traz as receitas relacionadas'+
  'e ao clicar novamente traz as receitas da API sem filtros', async () => {
    const { getByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/comidas'])
    );
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(2));
    const category = getByTestId('Beef-category-filter');
    expect(category).toHaveTextContent('Beef');
    fireEvent.click(category);
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(3));
    expect(getByTestId('0-card-name')).toHaveTextContent(
      'Beef and Mustard Pie'
    );
    expect(category).toHaveTextContent('Beef');
    fireEvent.click(category);
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(4));
    expect(getByTestId('2-card-name')).toHaveTextContent('Dal fry');
  });

  it('Verificando se ao clicar no botão Beef, traz as receitas relacionadas'+
  'e ao clicar no botão All remove o filtro de Beef e traz receitas da Api sem filtros', async () => {
    const { getByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/comidas'])
    );
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(2));
    const category = getByTestId('Beef-category-filter');
    expect(category).toHaveTextContent('Beef');
    fireEvent.click(category);
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(3));
    expect(getByTestId('5-card-name')).toHaveTextContent(
      'Beef Dumpling Stew'
    );
    expect(getByTestId('All-category-filter')).toHaveTextContent('All');
    fireEvent.click(category);
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(4));
    expect(getByTestId('11-card-name')).toHaveTextContent('Pancakes');
  });

});
