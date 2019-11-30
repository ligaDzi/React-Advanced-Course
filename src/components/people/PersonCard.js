import React, { Component } from 'react'
import { DragSource } from 'react-dnd'

export class PersonCard extends Component {
    static propTypes = {

    }

    render() {
        const { person, style, connectDragSource, isDragging } = this.props

        const dragStyle = {
            backgroundColor: isDragging ? 'grey' : 'white'
        }
        return connectDragSource(
            <div style = {{ width: 200, height: 100, ...dragStyle, ...style }}>
                <h3>{person.firstName}&nbsp;{person.lastName}</h3>
                <p>{person.email}</p>
            </div>
        )
    }
}

const type = 'person'
const spec = {
    beginDrag(props) {
        return {
            uid: props.person.uid
        }
    }
}
const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
})

const dragDecorator = DragSource(type, spec, collect)

export default dragDecorator(PersonCard)
