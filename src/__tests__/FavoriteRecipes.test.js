import React from 'react';
import cleanup, { waitFor, fireEvent } from '@testing-library/react';
import renderWithRouter from '../Helper/renderWithRouter';
import renderWithRedux from '../Helper/renderWithRedux';
import App from '../App';
import { setLocalStorage } from '../services/localStorage';
import favoriteRecipes from '../__mocks__/favoriteRecipesMock';
import detailsFoodFavorite52785Mock from '../__mocks__/detailsFoodFavorite52785Mock';
import getRecipesApi from '../services/getRecipesApi';
import drinkRecommendationsMock from '../__mocks__/drinkRecommendationsMock';

jest.mock('../services/getRecipesApi');

afterEach(() => {
  cleanup;
  getRecipesApi.mockClear();
});

getRecipesApi.mockImplementationOnce(() =>
  Promise.resolve(detailsFoodFavorite52785Mock)
);

getRecipesApi.mockImplementationOnce(() =>
  Promise.resolve(drinkRecommendationsMock)
);

setLocalStorage('favoriteRecipes', favoriteRecipes);
// pega dados do mock, e seta no local Storage

describe('Testes na tela de Receitas Favoritas', () => {
  it('Verificando se esta na tela Receitas Favoritas', async () => {
    const { getByText } = renderWithRedux(
      renderWithRouter(<App />, ['/receitas-favoritas'])
    );

    expect(getByText('Receitas Favoritas')).toBeInTheDocument();
  });

  it('Verificando se montou o card corretamente: Imagem, categoria/area, Título, btnShare e btnFavorite', async () => {
    const { getByTestId, queryAllByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/receitas-favoritas'])
    );

    expect(getByTestId('2-horizontal-name')).toHaveTextContent('B-52');
    expect(getByTestId('2-horizontal-share-btn')).toBeInTheDocument();
    expect(getByTestId('2-horizontal-favorite-btn')).toBeInTheDocument();
    expect(getByTestId('2-horizontal-image')).toBeInTheDocument();
    expect(getByTestId('2-horizontal-top-text')).toHaveTextContent('Alcoholic');
    expect(queryAllByTestId(/-horizontal-top-text$/)).toHaveLength(4);
  });

  it('Verificando se possue os botões de filtragem Comida, Bebida e All', async () => {
    const { getByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/receitas-favoritas'])
    );

    expect(getByTestId('filter-by-all-btn')).toHaveTextContent('All');
    expect(getByTestId('filter-by-food-btn')).toHaveTextContent('Food');
    expect(getByTestId('filter-by-drink-btn')).toHaveTextContent('Drinks');
  });

  it('Verificando se ao clicar no botão de filtragem Comida, traz somente comidas', async () => {
    const { getByTestId, queryAllByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/receitas-favoritas'])
    );

    expect(getByTestId('filter-by-food-btn')).toHaveTextContent('Food');
    fireEvent.click(getByTestId('filter-by-food-btn'));
    expect(getByTestId('1-horizontal-name')).toHaveTextContent('Pad See Ew');
    expect(getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-favorite-btn')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-top-text')).toHaveTextContent(
      'Thai - Chicken'
    );
    expect(queryAllByTestId(/-horizontal-top-text$/)).toHaveLength(2);
  });

  it(
    'Verificando se ao clicar no botão de filtragem bebida traz somente bebidas' +
      'e após clicar no botão de filtragem All, traz comidas e bebidas',
    async () => {
      const { getByTestId, queryAllByTestId } = renderWithRedux(
        renderWithRouter(<App />, ['/receitas-favoritas'])
      );

      expect(getByTestId('filter-by-drink-btn')).toHaveTextContent('Drinks');
      fireEvent.click(getByTestId('filter-by-drink-btn'));
      expect(getByTestId('0-horizontal-name')).toHaveTextContent('747');
      expect(getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
      expect(getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
      expect(getByTestId('0-horizontal-image')).toBeInTheDocument();
      expect(getByTestId('0-horizontal-top-text')).toHaveTextContent(
        'Alcoholic'
      );
      expect(queryAllByTestId(/-horizontal-top-text$/)).toHaveLength(2);

      expect(getByTestId('filter-by-all-btn')).toHaveTextContent('All');
      fireEvent.click(getByTestId('filter-by-all-btn'));
      expect(getByTestId('0-horizontal-name')).toHaveTextContent('Dal fry');
      expect(getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
      expect(getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
      expect(getByTestId('0-horizontal-image')).toBeInTheDocument();
      expect(getByTestId('0-horizontal-top-text')).toHaveTextContent(
        'Indian - Vegetarian'
      );
      expect(queryAllByTestId(/-horizontal-top-text$/)).toHaveLength(4);
    }
  );

  it('Verificando se ao clicar no botão de favoritar, remove o item', async () => {
    const { getByTestId, queryAllByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/receitas-favoritas'])
    );

    expect(getByTestId('1-horizontal-favorite-btn')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-name')).toHaveTextContent('747');
    fireEvent.click(getByTestId('1-horizontal-favorite-btn'));
    expect(getByTestId('1-horizontal-name')).toHaveTextContent('B-52');
    expect(queryAllByTestId(/-horizontal-name$/)).toHaveLength(3);
  });

  // it('Verificando se ao clicar no botão de compartilhar, ele copia para o clipBoard', async () => {
  //   const { getByTestId, getByText } = renderWithRedux(
  //     renderWithRouter(<App />, ['/receitas-favoritas'])
  //   );

  //   expect(getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
  //   fireEvent.click(getByTestId('0-horizontal-share-btn'));
  //   expect(getByText('Link copiado!')).toBeInTheDocument();
  // });

  it('Verificando se clicar no card, redireciona para a tela de Detalhes ', async () => {
    const { getByTestId, getByText } = renderWithRedux(
      renderWithRouter(<App />, ['/receitas-favoritas'])
    );

    expect(getByTestId('0-horizontal-name')).toHaveTextContent('Dal fry');
    fireEvent.click(getByTestId('0-horizontal-name'));
    await waitFor(() => expect(getRecipesApi).toHaveBeenCalledTimes(2));
    expect(getByText('Ingredientes:')).toBeInTheDocument();
  });
});
