import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Input from '../components/Input';
import Button from '../components/Button';
import loginValidation from '../services/loginValidation';
import '../App.css';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const { user, setLogin } = useLogin();
  const [password, setPassword] = useState('');
  const [isRedirect, setIsRedirect] = useState(false);

  if (isRedirect) return <Redirect to="/comidas" />;
  return (
    <div className="Login">
      <h1>Login</h1>
      <Input
        test="email-input"
        placeholder="Digite seu e-mail"
        onChange={(e) => setLogin(e.target.value)}
      />
      <Input
        type="password"
        test="password-input"
        placeholder="Digite sua senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        test="login-submit-btn"
        disabled={loginValidation(user.email, password)}
        onClick={() => {
          setLogin(user.email);
          setIsRedirect(true);
        }}
      >
        Entrar
      </Button>
    </div>
  );
};

export default Login;
