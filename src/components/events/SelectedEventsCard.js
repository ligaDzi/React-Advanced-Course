import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'

export class SelectedEventsCard extends Component {
    static propTypes = {

    }

    render() {
        const { connectDropTarget, canDrop, hovered } = this.props
        const { title, when, where } = this.props.event

        const dropStyle = {
            border: `3px solid ${canDrop ? 'red' : 'black'}`,
            backgroundColor: hovered ? 'green' : 'white'
        }

        return connectDropTarget(
            <div style = {dropStyle}>
                <h3> {title} </h3>
                <p> {where}, {when} </p>
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

        console.log('------personUid = ', personUid)
        console.log('------eventUid = ', eventUid)
    }
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    hovered: monitor.isOver()
})

const dropDecorator = DropTarget(types, spec, collect)

export default dropDecorator(SelectedEventsCard)
