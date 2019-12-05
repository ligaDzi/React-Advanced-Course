import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column } from 'react-virtualized'
import { TransitionMotion, spring } from 'react-motion'

import { fetchAllPeople, peopleListSelector } from '../../ducks/people'

export class PeopleTable extends Component {
    static propTypes = {
    }

    componentDidMount() {
        const { fetchAllPeople } = this.props

        fetchAllPeople && fetchAllPeople()
    }
    
    componentDidUpdate({ people }) {
        // Нашей таблице мы задоем ref и сохроняем его в this.table
        // Здесь же мы прокручиваем вниз таблицу после добавления нового пользователя, чтобы показать анимацию
        // Завернуто в setTimeout() потому что наша таблица рендерится не сразу
        if (people.length && this.props.people.length > people.length) {
            setTimeout(() => {
                this.table.scrollToRow(this.props.people.length)
            }, 0)
        }
    }

    render() {
        const { people } = this.props

        if(!people.length ) return null

        return (
            <TransitionMotion
                willEnter={this.willEnter}
                styles={this.getStyles}
            >
                {interpolatedStyles => (
                    <Table
                        width={600}
                        height={300}
                        rowHeight={40}
                        headerHeight={50}
                        rowGetter={this.rowGetter}
                        rowCount={interpolatedStyles.length}
                        rowClassName='test--people-list__row'
                        overscanRowCount={2}       
                        rowStyle={({ index }) => index < 0 ? {} : interpolatedStyles[index].style}
                        ref={this.setListRef}     
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
                )}
            </TransitionMotion>
        )
    }

    willEnter = () => ({
        opacity: 0
    })

    getStyles = () => this.props.people.map(person => ({
        key: person.uid,
        style: {
            opacity: spring(1, {stiffness: 50})
        },
        data: person
    }))

    setListRef = ref => this.table = ref

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
