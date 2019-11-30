import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'react-virtualized'

import { moduleName, fetchAllPeople, peopleListSelector } from '../../ducks/people'

import Loader from '../common/Loader'
import PersonCard from './PersoCard'

export class PeopleList extends Component {
    static propTypes = {
    }

    componentDidMount() {
        this.props.fetchAllPeople();
    }

    render() {
        const { people, loading } = this.props

        if(loading) return <Loader />

        return (
            <List
                width={300}
                height={300}
                rowCount={people.length}
                rowHeight={100}
                rowRenderer={this.rowRenderer} 
            />
        )
    }

    rowRenderer = ({ style, key, index }) => {
        const { people } = this.props
        const person = people[index]

        return <PersonCard person = {person} style = {style} key = {key} />
    }
}

function mapStateToProps(state) {
    return {
        people: peopleListSelector(state),
        loading: state[moduleName].loading
    }
}

const mapDispatchToProps = {
    fetchAllPeople
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList)
