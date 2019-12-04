import React from 'react'
import Root from './components/Root'
import store from './redux'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { DndProvider } from 'react-dnd'
import HTML5Backend  from 'react-dnd-html5-backend'
import history from './history'
import './config'

function App() {
  return (
    <Provider store = {store}>
      <DndProvider backend = {HTML5Backend}>
        <ConnectedRouter history = {history}>
          <Root />
        </ConnectedRouter>
      </DndProvider>
    </Provider>
  );
}

export default App;
