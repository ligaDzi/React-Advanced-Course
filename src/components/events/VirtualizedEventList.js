import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import 'react-virtualized/styles.css'

import { moduleName, fetchLazy, selectEvent, eventListSelector } from '../../ducks/events'

import Loader from '../common/Loader'
import Trash from './Trash'
import TableRow from './TableRow'

export class EventList extends Component {
    static propTypes = {

    }

    componentDidMount() {
        this.props.fetchLazy()
    }

    render() {
        const { events, loading, loaded } = this.props

        // if(loading) return <Loader />
        
        return (
            <div>
                <Trash />
                <InfiniteLoader
                    isRowLoaded = {this.isRowLoaded}
                    rowCount = {loaded ? events.length : events.length + 1} //Так сделанно из за firebase (у него нет length)
                    loadMoreRows = {this.loadMoreRows}
                >
                    { ({ onRowsRendered, registerChild }) => 
                        <Table
                            ref = {registerChild}
                            onRowsRendered = {onRowsRendered}
                            rowCount = {events.length}
                            rowGetter = {this.rowGetter}
                            rowHeight = {40}
                            headerHeight = {50}
                            overscanRowCount = {5}
                            width = {700}
                            height = {300}
                            onRowClick = {this.handleRowClick}
                            rowRenderer = {this.getRowRenderer}
                        >
                            <Column 
                                label = 'title'
                                dataKey = 'title'
                                width = {300}
                            />
                            <Column 
                                label = 'where'
                                dataKey = 'where'
                                width = {250}
                            />
                            <Column 
                                label = 'when'
                                dataKey = 'month'
                                width = {150}
                            />
                        </Table>
                    }   
                </InfiniteLoader>
            </div>
        )
    }

    getRowRenderer = (rowCtx) => <TableRow {...rowCtx} />

    isRowLoaded = ({ index }) => index < this.props.events.length

    loadMoreRows = () => {
        console.log('---------load more')
        this.props.fetchLazy()
    }

    rowGetter = ({ index }) => {
        return this.props.events[index]
    }

    handleRowClick = ({ rowData }) => {
        const { selectEvent } = this.props
        selectEvent && selectEvent(rowData.uid)
    }
}

export default connect(state => ({
    events: eventListSelector(state),
    loading: state[moduleName].loading,
    loader: state[moduleName].loader
}), { 
    fetchLazy,
    selectEvent
})(EventList)
