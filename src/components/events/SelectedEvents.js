import React, { Component } from 'react'
import { connect } from 'react-redux'

import { selectedEventsSelector } from '../../ducks/events'

import SelectedEventsCard from './SelectedEventsCard'

export class SelectedEvents extends Component {
    static propTypes = {
    }

    render() {
        const { events } = this.props
        return (
            <div>
                {events.map(event => (
                    <SelectedEventsCard event = {event} key = {event.uid} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    events: selectedEventsSelector(state)
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedEvents)

