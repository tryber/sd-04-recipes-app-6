import React from 'react';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import rootReducers from '../redux/reducers';

const renderWithRedux = (
  component,
  { store = createStore(rootReducers, applyMiddleware(thunk)) } = {},
) => ({
  ...render(<Provider store={store}>{component}</Provider>),
  store,
});

export default renderWithRedux;
