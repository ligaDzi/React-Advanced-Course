import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AdminPage from './routes/AdminPage'
import AuthPage from './routes/AuthPage'

class Root extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route path='/admin' component={AdminPage} />
                    <Route path='/auth' component={AuthPage} />
                </Switch>
            </div>
        )
    }
}

export default Root;