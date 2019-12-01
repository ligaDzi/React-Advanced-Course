import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addEventToPerson, peopleListSelector } from '../../ducks/people'


export class SelectedEventsCard extends Component {
    static propTypes = {

    }

    render() {
        const { connectDropTarget, canDrop, hovered, people } = this.props
        const { title, when, where } = this.props.event

        const dropStyle = {
            border: `3px solid ${canDrop ? 'red' : 'black'}`,
            backgroundColor: hovered ? 'green' : 'white'
        }

        const peopleElement = people && (
            <p>
                {people.map(person => person.email).join(', ')}
            </p>
        )
        
        return connectDropTarget(
            <div style = {dropStyle}>
                <h3> {title} </h3>
                <p> {where}, {when} </p>
                {peopleElement}
            </div>
        )
    }
}

const types = [
    'person'
]

const spec = {
    drop(props, monitor) {
        const personUid = monitor.getItem().uid
        const eventUid = props.event.uid

        props.addEventToPerson(eventUid, personUid)

        return { eventUid }
    }
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    hovered: monitor.isOver()
})

const dropDecorator = DropTarget(types, spec, collect)


const mapStateToProps = (state, props) => ({
    // Вернуть только тех пользователей которые подписанны к данной конференции
    people: peopleListSelector(state).filter(person => person.events.includes(props.event.uid))
})

const mapDispatchToProps = {
    addEventToPerson
}

const reduxDecor = connect(mapStateToProps, mapDispatchToProps)


export default reduxDecor( dropDecorator(SelectedEventsCard) )
