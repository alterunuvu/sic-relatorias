import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import persistState from 'redux-localstorage';

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk), persistState()));  