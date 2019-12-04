import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { defaultTableRowRenderer } from 'react-virtualized'

export class TableRow extends Component {
    static propTypes = {

    }

    componentDidMount() {
        this.props.connectPreview(getEmptyImage())
    }

    render() {
        const { connectDragSource, ...rest } = this.props

        return connectDragSource( defaultTableRowRenderer(rest) )
    }
}

const type = 'event'

const spec = {
    beginDrag(props) {
        return { uid: props.rowData.uid }
    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectPreview: connect.dragPreview()
})

const dragDecor = DragSource(type, spec, collect)

export default dragDecor(TableRow)
