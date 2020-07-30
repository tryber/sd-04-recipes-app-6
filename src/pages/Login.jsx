import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState(null);

  const [password, setPassword] = useState(null);

  return (
    <div>
      <Input placeholder='Digite seu e-mail' onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder='Digite sua senha' onChange={(e) => setPassword(e.target.value)}/>
      <Button>Entrar</Button>
    </div>
  )
}

export default Login;
