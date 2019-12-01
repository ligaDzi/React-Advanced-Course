import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { signOut, moduleName } from '../ducks/auth'

import AdminPage from './routes/AdminPage'
import AuthPage from './routes/AuthPage'
import PeoplePage from './routes/PeoplePage'
import EventsPage from './routes/EventsPage'
import ProtectedRoute from './common/ProtectedRoute'
import CustomDragLayer from './CustomDragLayer'

class Root extends Component {

    render() {
        const { signedIn, signOut } = this.props;
        const btn = signedIn 
            ? <button onClick = {signOut}>Sign out</button>
            : <Link to="/auth/signin">sign in</Link> 

        return (
            <div>
                { btn }
                <CustomDragLayer />
                <Switch>
                    <ProtectedRoute path='/admin' component={AdminPage} />
                    <ProtectedRoute path='/people' component={PeoplePage} />
                    <ProtectedRoute path='/events' component={EventsPage} />
                    <Route path='/auth' component={AuthPage} />
                </Switch>
            </div>
        )
    }
}

export default connect(state => ({
    signedIn: !!state[moduleName].user
}), { signOut })(Root);