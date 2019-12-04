import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'

import { deleteEvent, stateSelector } from '../../ducks/events'

import Loader from '../common/Loader'


export class Trash extends Component {
    static propTypes = {
    }

    render() {
        const { connectDropTarget, isOver, loading } = this.props

        const style = {
            border: `1px solid ${isOver ? 'green' : 'black'}`,
            width: 100, height: 100,
            position: 'fixed',
            top: 0, right: 0
        }

        return connectDropTarget(
            <div style = {{ ...style }}>
                Delete
                { loading && <Loader /> }
            </div>
        )
    }
}
/**
 * dropDecor
 */
const types = 'event'

const spec = {
    drop(props, monitor) {
        const eventUid = monitor.getItem().uid

        props.deleteEvent(eventUid)
    }
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
})

const dropDecor = DropTarget(types, spec, collect)

/**
 * reduxDecor
 */
const mapStateToProps = (state) => ({
    loading: stateSelector(state).loading
})

const mapDispatchToProps = {  
    deleteEvent
}

const reduxDecor =  connect(mapStateToProps, mapDispatchToProps)

export default reduxDecor( dropDecor(Trash) )
