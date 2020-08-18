import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getLocalStorage } from '../services/localStorage';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const getLocalUser = getLocalStorage('user');
    if (getLocalUser) return getLocalUser;
    return { email: '' };
  });
  const context = [user, setUser];
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserProvider;

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
