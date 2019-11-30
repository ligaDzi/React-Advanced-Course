import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column } from 'react-virtualized'

import { fetchAllPeople, peopleListSelector } from '../../ducks/people'

export class PeopleTable extends Component {
    static propTypes = {
    }

    componentDidMount() {
        const { fetchAllPeople } = this.props

        fetchAllPeople && fetchAllPeople()
    }

    render() {
        const { people } = this.props

        if(!people.length ) return null

        return (
            <Table
                width={600}
                height={300}
                rowHeight={40}
                headerHeight={50}
                rowGetter={this.rowGetter}
                rowCount={people.length}
                rowClassName='test--people-list__row'
                overscanRowCount={2}            
            >
                <Column
                    label="First Name"
                    dataKey="firstName"
                    width={200}
                />
                <Column
                    label="Last Name"
                    dataKey="lastName"
                    width={200}
                />
                <Column
                    label="Email"
                    dataKey="email"
                    width={200}
                />
            </Table>
        )
    }

    rowGetter = ({ index }) => {
        return this.props.people[index]
    }
}

const mapStateToProps = (state) => ({
    people: peopleListSelector(state)
})

const mapDispatchToProps = {
    fetchAllPeople
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleTable)
