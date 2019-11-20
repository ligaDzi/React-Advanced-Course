import { createStore, applyMiddleware } from 'redux'
import createRouterReducer from './reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import history from '../history'

const enhancer = applyMiddleware(routerMiddleware(history), thunk, logger);

const store = createStore(createRouterReducer(history), enhancer);
window.store = store;

export default store;