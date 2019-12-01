import React, { Component } from 'react'
import { connect } from 'react-redux'
import { personSelector } from '../../ducks/people'

export class PersonCardDragPreview extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h2>{this.props.person.firstName}</h2>                
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    person: personSelector(state, props)
})

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps)(PersonCardDragPreview)
