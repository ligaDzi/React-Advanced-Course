import React from 'react'
import Root from './components/Root'
import store from './redux'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import history from './history'
import './config'

function App() {
  return (
    <Provider store = {store}>
      <ConnectedRouter history = {history}>
        <Root />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
