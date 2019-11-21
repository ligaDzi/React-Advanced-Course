import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { moduleName } from '../../ducks/auth'

import UnAuthorized from './UnAuthorized'

export class ProtectedRoute extends Component {
    static propTypes = {

    }

    render() {
        const { component, ...rest } = this.props;
        return <Route {...rest} render={this.renderProtected} />
    }

    renderProtected = (routeProps) => {
        const { component: ProtectedComponent, authorized } = this.props;
        return authorized ? <ProtectedComponent {...routeProps} /> : <UnAuthorized />
    }
}

function mapStateToProps(state) {
    return {
        authorized: !!state[moduleName].user
    }
}

const mapToDispatch = {}
const decorator = connect(mapStateToProps, mapToDispatch, null, {pure: false})

export default decorator(ProtectedRoute)
