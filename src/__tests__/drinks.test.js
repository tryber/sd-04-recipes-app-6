import React from 'react';
import cleanup, { fireEvent, waitFor } from '@testing-library/react';
import renderWithRouter from '../Helper/renderWithRouter';
import renderWithRedux from '../Helper/renderWithRedux';
import App from '../App';
import getRecipesApi from '../services/getRecipesApi';
import drinkRecipesMock from '../__mocks__/drinkRecipesMock';
import drinkCategoriesMock from '../__mocks__/drinkCategories.Mock';
import categoryOrdinaryDrinksMock from '../__mocks__/categoryOrdinaryDrinksMock';
import drinkDetailsMock from '../__mocks__/drinkDetailsMock';
import foodRecommendationsMock from '../__mocks__/foodRecommendationsMock';

jest.mock('../services/getRecipesApi');

afterEach(() => {
  cleanup;
  getRecipesApi.mockClear();
});

const apiMockDrinksAndCategories = () => {
  getRecipesApi.mockImplementationOnce(() => Promise.resolve(drinkRecipesMock));
  getRecipesApi.mockImplementationOnce(() =>
    Promise.resolve(drinkCategoriesMock)
  );
};

// Test 1
apiMockDrinksAndCategories();
// Test 2
apiMockDrinksAndCategories();
// Test 3
apiMockDrinksAndCategories();
// Test 4
apiMockDrinksAndCategories();
getRecipesApi.mockImplementationOnce(() => Promise.resolve(categoryBeefMock));
// Test 5
apiMockDrinksAndCategories();
getRecipesApi.mockImplementationOnce(() => Promise.resolve(drinkDetailsMock));
getRecipesApi.mockImplementationOnce(() =>
  Promise.resolve(foodRecommendationsMock)
);
// Test 6
apiMockDrinksAndCategories();
// Test 7
apiMockDrinksAndCategories();
getRecipesApi.mockImplementationOnce(() => Promise.resolve(categoryOrdinaryDrinksMock));
getRecipesApi.mockImplementationOnce(() => Promise.resolve(drinkRecipesMock));
// Test 8
apiMockDrinksAndCategories();
getRecipesApi.mockImplementationOnce(() => Promise.resolve(categoryOrdinaryDrinksMock));
getRecipesApi.mockImplementationOnce(() => Promise.resolve(drinkRecipesMock));

describe('Testes na tela de Bebidas', () => {
  it('Verificando se tem os 12 cards na tela de bebidas', async () => {
    const { getByTestId } = renderWithRedux(renderWithRouter(<App />,['/bebidas']));
    await waitFor(() =>
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

  it('Verificando se tem botão próximo, e se esta exibindo os 12 próximos cards', async () => {
    const { getByTestId, getByText, queryAllByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/bebidas'])
    );
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(2));
    const buttonProximo = getByText('Proximo');
    fireEvent.click(buttonProximo);
    expect(getByTestId('5-card-name')).toHaveTextContent('Karsk');
    expect(queryAllByTestId(/-card-name$/)).toHaveLength(12);
  });

  it('Verificando se tem 5 primeiras categorias', async () => {
    const { getByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/bebidas'])
    );
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(2));
    ['Ordinary Drink', 'Cocktail', 'Milk / Float / Shake', 'Other/Unknown', 'Cocoa'].forEach((text) =>
      expect(getByTestId(`${text}-category-filter`)).toHaveTextContent(text)
    );
  });

  it('Verificando se ao clicar na categoria Ordinary Drink, traz as receitas relacionadas', async () => {
    const { getByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/bebidas'])
    );
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(2));
    const category = getByTestId('Ordinary Drink-category-filter');
    expect(category).toHaveTextContent('Ordinary Drink');
    fireEvent.click(category);
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(3));
    expect(getByTestId('0-card-name')).toHaveTextContent('3-Mile Long Island Iced Tea'
    );
  });

  it('Verificando se ao clicar no card esta indo para a página de detalhe', async () => {
    const { getByTestId, getByText } = renderWithRedux(
      renderWithRouter(<App />, ['/bebidas'])
    );
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(2));
    const card = getByTestId('0-recipe-card');
    fireEvent.click(card);
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(4));
    expect(getByText('3-Mile Long Island Iced Tea')).toBeInTheDocument();
  });

  it('Vericando se ao entrar na tela de Bebidas, aparece o header "Bebidas" ', async () => {
    const { getByText } = renderWithRedux(
      renderWithRouter(<App />, ['/bebidas'])
    );
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(2));
    const headerTitle = getByText('Bebidas');
    expect(headerTitle).toBeInTheDocument();
  });

  it('Verificando se ao clicar no botão Ordinary Drink, traz as receitas relacionadas'+
  'e ao clicar novamente traz as receitas da API sem filtros', async () => {
    const { getByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/bebidas'])
    );
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(2));
    const category = getByTestId('Ordinary Drink-category-filter');
    expect(category).toHaveTextContent('Ordinary Drink');
    fireEvent.click(category);
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(3));
    expect(getByTestId('1-card-name')).toHaveTextContent(
      '410 Gone'
    );
    expect(category).toHaveTextContent('Ordinary Drink');
    fireEvent.click(category);
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(4));
    expect(getByTestId('4-card-name')).toHaveTextContent('747');
  });

  it('Verificando se ao clicar na categoria Ordinary Drink, traz as receitas relacionadas'+
  'e ao clicar no botão All remove o filtro de Ordinary Drink e traz receitas da Api sem filtros', async () => {
    const { getByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/bebidas'])
    );
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(2));
    const category = getByTestId('Ordinary Drink-category-filter');
    expect(category).toHaveTextContent('Ordinary Drink');
    fireEvent.click(category);
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(3));
    expect(getByTestId('5-card-name')).toHaveTextContent(
      'A Day at the Beach');
    expect(getByTestId('All-category-filter')).toHaveTextContent('All');
    fireEvent.click(category);
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(4));
    expect(getByTestId('11-card-name')).toHaveTextContent('B-52');
  });

});
