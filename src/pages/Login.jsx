import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import loginValidation from '../services/loginValidation';
import { setLocalStorage } from '../services/localStorage';
import '../App.css';
import Footer from '../components/Footer';


const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <div id="Login">
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
        }}
      >
        Entrar
      </Button>
      <Footer/>

    </div>
  );
};

export default Login;
