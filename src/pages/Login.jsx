import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import loginValidation from '../services/loginValidation';

const Login = () => {
  const [email, setEmail] = useState(null);

  const [password, setPassword] = useState(null);

  return (
    <div>
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
        onClick={() => }
      >
        Entrar
      </Button>
    </div>
  );
};

export default Login;
