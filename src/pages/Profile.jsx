import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import useLogin from '../hooks/useLogin';
import Button from '../components/Button';
import Footer from '../components/Footer';
import '../styles/Profile.css';
import { clearLocalStorage } from '../services/localStorage';

const Profile = () => {
  const history = useHistory();
  const { user, setLogin } = useLogin();
  return (
    <div>
      <Header title="Perfil" />
      <div className="profile-buttons">
        <h3 data-testid="profile-email">{user.email}</h3>
        <Button
          test="profile-done-btn"
          onClick={() => history.push('/receitas-feitas')}
        >
          Receitas Feitas
        </Button>
        <Button
          test="profile-favorite-btn"
          onClick={() => history.push('/receitas-favoritas')}
        >
          Receitas Favoritas
        </Button>
        <Button
          test="profile-logout-btn"
          onClick={() => {
            setLogin('');
            clearLocalStorage();
            history.push('/');
          }}
        >
          Sair
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
