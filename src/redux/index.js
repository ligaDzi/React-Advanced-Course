import { createStore, applyMiddleware } from 'redux'
import createRouterReducer from './reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import history from '../history'


const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history), thunk, logger);

const store = createStore(createRouterReducer(history), enhancer);
window.store = store;

sagaMiddleware.run(rootSaga);

export default store;