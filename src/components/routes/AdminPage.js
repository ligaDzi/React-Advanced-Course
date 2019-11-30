import React, { Component } from 'react'

import PeopleList from '../people/PeopleList'
import EventList from '../events/VirtualizedEventList'
import SelectedEvents from '../events/SelectedEvents'

class AdminPage extends Component {

    render() {
        return (
            <div>
                <h1>AdminPage</h1>
                <h2>People</h2>
                <PeopleList />
                <h2>Selected Events</h2>
                <SelectedEvents />
                <h2>Events</h2>
                <EventList />
            </div>
        )
    }
}

export default AdminPage;