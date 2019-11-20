import React from 'react'
import Root from './components/Root'
import store from './redux'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import history from './history'

function App() {
  return (
    <Provider store = {store}>
      <ConnectedRouter store = {store} history = {history}>
        <Root />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
