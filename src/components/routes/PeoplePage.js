import React, { Component } from 'react'
import { connect } from 'react-redux'

import { moduleName, addPerson } from '../../ducks/people'

import Loader from '../common/Loader'
import NewPersonForm from '../people/NewPersonForm'
import PeopleList from '../people/PeopleList'
import PeopleTable from '../people/PeopleTable'

class PeoplePage extends Component {
    static propTypes = {

    }

    render() {
        const { addPerson, loading } = this.props;
        return (
            <div>
                <h2>Add person</h2>
                <PeopleList />
                { loading
                    ? <Loader />
                    : <NewPersonForm onSubmit={addPerson}/>   
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state[moduleName].loading
    }
}

const mapToDispatch = { addPerson }
const decorator = connect(mapStateToProps, mapToDispatch)

export default decorator(PeoplePage)
