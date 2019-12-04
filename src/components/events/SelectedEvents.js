import React, { Component } from 'react'
import { connect } from 'react-redux'
import {TransitionMotion, spring} from 'react-motion'

import { selectedEventsSelector } from '../../ducks/events'

import SelectedEventsCard from './SelectedEventsCard'

export class SelectedEvents extends Component {
    static propTypes = {
    }

    render() {
        return <TransitionMotion
            styles={this.getStyles()}
            willLeave={this.willLeave}
            willEnter={this.willEnter}
        >
            {(interpolated) => <div>
                {
                    interpolated.map(config => <div style = {config.style} key = {config.key}>
                        <SelectedEventsCard event = {config.data}/>
                    </div>)
                }
                </div>
            }
        </TransitionMotion>
    }

    willLeave = () => ({
        opacity: spring(0, {stiffness: 100})
    })

    willEnter = () => ({
        opacity: 0
    })

    getStyles() {
        return this.props.events.map(event => ({
            style: {
                opacity: spring(1, {stiffness: 50})
            },
            key: event.uid,
            data: event
        }))
    }
}

const mapStateToProps = (state) => ({
    events: selectedEventsSelector(state)
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedEvents)

