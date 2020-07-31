import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootCombiner from '../reducers';

const store = createStore(rootCombiner, composeWithDevTools(applyMiddleware(thunk)));

export default store;
