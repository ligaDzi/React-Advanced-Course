import React, { Component } from 'react'
import { connect } from 'react-redux'

import { moduleName, addPerson } from '../../ducks/people'

import Loader from '../common/Loader'
import NewPersonForm from '../people/NewPersonForm'

class PeoplePage extends Component {
    static propTypes = {

    }

    render() {
        const { addPerson } = this.props;
        return (
            <div>
                <h2>Add person</h2>
                <NewPersonForm onSubmit={addPerson}/>              
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

const mapToDispatch = { addPerson }
const decorator = connect(mapStateToProps, mapToDispatch)

export default decorator(PeoplePage)
