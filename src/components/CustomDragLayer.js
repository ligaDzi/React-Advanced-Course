import React, { Component } from 'react'
import { DragLayer } from 'react-dnd'

import PersonPreview from './people/PersonCardDragPreview'
import EventPreview from './events/EventCardDragPreview'

const layerStyle = {
    position: 'fixed',
    pointerEvents: 'none',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 10000
}

const previewMap = {
    person: PersonPreview,
    event: EventPreview
}


export class CustomDragLayer extends Component {
    static propTypes = {
    }

    getItem() {
        const { offset, item, itemType } = this.props


        const PreviewComponent = previewMap[itemType]
        if (!offset || !PreviewComponent) return null

        const {x, y} = offset
        const style = {
            transform: `translate(${x}px, ${y}px)`
        }

        return (
            <div style = {style}> <PreviewComponent {...item} /> </div>
        )
    }

    render() {
        const { isDragging } = this.props

        if(!isDragging) return null

        const item = this.getItem()
        if(!item) return null

        return (
            <div style={layerStyle}>
                {item}
            </div>
        )
    }
}

const collect = (monitor) => ({
    isDragging: monitor.isDragging(),
    offset: monitor.getSourceClientOffset(),

    //Здесь у нас будет uid перетаскиваемого компонента, он нужен для personSelector() в <PersonCardDragPreview>
    item: monitor.getItem(),    

    itemType: monitor.getItemType()
})

const dragDecor = DragLayer(collect)

export default dragDecor(CustomDragLayer)
