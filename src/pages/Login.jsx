import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Input from '../components/Input';
import Button from '../components/Button';
import loginValidation from '../services/loginValidation';
import { setLocalStorage } from '../services/localStorage';

const Login = () => {
  const [email, setEmail] = useState(null);

  const [password, setPassword] = useState(null);

  const [isRedirect, setIsRedirect] = useState(false);

  if (isRedirect) return <Redirect to="/bebidas" />;
  return (
    <div>
      <h1>Login</h1>
      <Input
        test="email-input"
        placeholder="Digite seu e-mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        test="password-input"
        placeholder="Digite sua senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        test="login-submit-button"
        disabled={loginValidation(email, password)}
        onClick={() => {
          setLocalStorage('mealsToken', 1);
          setLocalStorage('cocktailsToken', 1);
          setLocalStorage('user', { email });
          setIsRedirect(true);
        }}
      >
        Entrar
      </Button>
    </div>
  );
};

export default Login;
