import React from 'react';
import cleanup, { fireEvent, waitForDomChange } from '@testing-library/react';
import renderWithRouter from '../Helper/renderWithRouter';
import renderWithRedux from '../Helper/renderWithRedux';
import Footer from '../components/Footer';
import App from '../App';

afterEach(() => {
  cleanup;
});

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
    expect(getByText('Comidas')).toBeInTheDocument();
    const bebidas = getByTestId('drinks-bottom-btn');
    fireEvent.click(bebidas);
    await waitForDomChange(() => expect(getByText('Bebidas')).toBeInTheDocument());
    expect(getByText('Bebidas')).toBeInTheDocument();
    const comidas = getByTestId('food-bottom-btn');
    fireEvent.click(comidas);
    await waitForDomChange(() => expect(getByText('Comidas')).toBeInTheDocument());
  })
})