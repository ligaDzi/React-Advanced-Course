import React, { Component } from 'react'

import VirtualizedEventList from '../events/VirtualizedEventList'

export class EventsPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h2> Events page </h2>
                <VirtualizedEventList />
            </div>
        )
    }
}

export default EventsPage
