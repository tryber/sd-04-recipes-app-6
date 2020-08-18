import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { setLocalStorage } from '../services/localStorage';

const useLogin = () => {
  const [user, setUser] = useContext(UserContext);
  useEffect(() => {
    if (user.email) {
      setLocalStorage('mealsToken', 1);
      setLocalStorage('cocktailsToken', 1);
      console.log('rodei localstorage');
      console.log(user.email);
    }
  }, [user]);
  const setLogin = (email) => {
    setLocalStorage('user', { email });
    setUser({ email });
  };

  return { user, setUser, setLogin };
};

export default useLogin;
