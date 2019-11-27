import React, { Component } from 'react'
import { connect } from 'react-redux'

import { moduleName, fetchAll, eventListSelector } from '../../ducks/events'

import Loader from '../common/Loader'

export class EventList extends Component {
    static propTypes = {

    }

    componentDidMount() {
        this.props.fetchAll()
    }

    render() {
        const { events, loading, loader } = this.props

        if(loading) return <Loader />
        
        return (
            <div>
                <table>
                    <tbody>
                        {this.getRows()}
                    </tbody>
                </table>
            </div>
        )
    }

    getRows() {
        return this.props.events.map(this.getRow)
    }

    getRow(event) {
        return (
            <tr key={ event.uid }>
                <td>{ event.title }</td>
                <td>{ event.where }</td>
                <td>{ event.month }</td>
            </tr>
        )
    }
}

export default connect(state => ({
    events: eventListSelector(state),
    loading: state[moduleName].loading,
    loader: state[moduleName].loader
}), { 
    fetchAll 
})(EventList)
