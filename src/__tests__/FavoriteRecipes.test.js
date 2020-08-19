import React from 'react';
import cleanup, { waitFor, fireEvent } from '@testing-library/react';
import renderWithRouter from '../Helper/renderWithRouter';
import renderWithRedux from '../Helper/renderWithRedux';
import App from '..App';
// import getRecipesApi from '../services/getRecipesApi';

// jest.mock('../services/getRecipesApi');

afterEach(() => {
  cleanup;
  // getRecipesApi.mockClear();
});

// getRecipesApi.mockImplementationOnce(() =>
//  Promise.resolve(localStorageFavoritesMock));

describe('Testes na tela de Receitas Favoritas', () => {
  it('Verificando se esta na tela Receitas Favoritas', async () => {
    const { getByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/receitas-favoritas'])
    );
  });

  it('Verificando se montou o card corretamente: Imagem, categoria/area, Título, btnShare e btnFavorite', async () => {
    const { getByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/receitas-favoritas'])
    );
  });

  it('Verificando possue os botões de filtragem Comida, Bebida e All', async () => {
    const { getByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/receitas-favoritas'])
    );
  });

  it('Verificando se ao clicar np botão de filtragem Comida traz somente comidas', async () => {
    const { getByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/receitas-favoritas'])
    );
  });

  it(
    'Verificando se ao clicar no botão de filtragem bebida traz somente bebidas' +
      'e após clicar no botão de filtragem All, traz comidas e bebidas',
    async () => {
      const { getByTestId } = renderWithRedux(
        renderWithRouter(<App />, ['/receitas-favoritas'])
      );
    }
  );

  it('Verificando se ao clicar no botão de favoritar, remove o item', async () => {
    const { getByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/receitas-favoritas'])
    );
  });

  it('Verificando se ao clicar no botão de compartilhar, ele copia para o clipBoard', async () => {
    const { getByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/receitas-favoritas'])
    );
  });

  it('Verificando se clicar no card, redireciona para a tela de Detalhes ', async () => {
    const { getByTestId } = renderWithRedux(
      renderWithRouter(<App />, ['/receitas-favoritas'])
    );
  });

});
