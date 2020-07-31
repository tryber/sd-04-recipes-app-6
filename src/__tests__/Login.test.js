import React from 'react';
import cleanup, { fireEvent } from '@testing-library/react';
import renderWithRouter from '../Helper/renderWithRouter';
import renderWithRedux from '../Helper/renderWithRedux';
import Login from '../pages/Login';

afterEach(() => {
  cleanup;
});

describe('Testes no login', () => {
  it('Escrevendo email e senha', () => {
    const { getByTestId } = renderWithRedux(renderWithRouter(<Login />));
    const inputEmail = getByTestId('email-input');
    const inputSenha = getByTestId('password-input');
    const btnLogin = getByTestId('login-submit-button');
    expect(btnLogin).toBeDisabled();
    fireEvent.change(inputEmail, { target: { value: 'julianafatsil@gmail.com' } });
    expect(btnLogin).toBeDisabled();
    fireEvent.change(inputEmail, { target: { value: '' } });
    fireEvent.change(inputSenha, { target: { value: '1234567' } });
    expect(btnLogin).toBeDisabled();
    fireEvent.change(inputEmail, { target: { value: 'julianafatsil@gmail.com' } });
    // expect(btnLogin.getAttribute('disabled')).toBe('');
    expect(btnLogin.disabled).not.toBe(true);
    fireEvent.click(btnLogin);
  });
});
