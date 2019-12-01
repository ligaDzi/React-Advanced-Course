import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventSelector } from '../../ducks/events'

export class EventCardDragPreview extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h2>{this.props.event.title}</h2>                
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    event: eventSelector(state, props)
})

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps)(EventCardDragPreview)
