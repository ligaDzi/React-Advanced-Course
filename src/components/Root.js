import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AdminPage from './routes/AdminPage'
import AuthPage from './routes/AuthPage'
import ProtectedRoute from './common/ProtectedRoute'

class Root extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <ProtectedRoute path='/admin' component={AdminPage} />
                    <Route path='/auth' component={AuthPage} />
                </Switch>
            </div>
        )
    }
}

export default Root;