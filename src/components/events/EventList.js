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

    getRow = (event) => {
        return (
            //Этот класс нужен для тестов, мы понем находим все строки таблицы и проверяем сколько их отрендерилось
            //Так же и handleRowClick() нужен для тестов
            <tr key={ event.uid } className='test--event-list__row' onClick={this.handleRowClick(event.uid)}>
                <td>{ event.title }</td>
                <td>{ event.where }</td>
                <td>{ event.month }</td>
            </tr>
        )
    }
    handleRowClick = (uid) => () => {
        const { selectEvent } = this.props
        selectEvent && selectEvent(uid)
    }
}

export default connect(state => ({
    events: eventListSelector(state),
    loading: state[moduleName].loading,
    loader: state[moduleName].loader
}), { 
    fetchAll 
})(EventList)
