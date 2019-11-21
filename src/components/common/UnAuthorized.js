import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class UnAuthorized extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h2>Unauthorized please <Link to='/auth/signin'>Sign in</Link> </h2>
            </div>
        )
    }
}

export default UnAuthorized
