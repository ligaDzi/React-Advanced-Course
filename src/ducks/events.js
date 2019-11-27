import { all, take, call, put } from 'redux-saga/effects'
import { Record, OrderedMap } from 'immutable'
import { appName } from '../config'
import firebase from 'firebase'
import { createSelector } from 'reselect'
import { fbDatatoEntities } from './utils'



/**
 * Constants
 */
export const moduleName = 'events';
const prefix = `${appName}/${moduleName}`
export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`


export const ReducerRecord = Record({
    entities: new OrderedMap({}),
    loading: false,
    loaded: false
})

export const EventRecord = Record({
    uid: null,
    title: null,
    url: null,
    where: null,
    when: null,
    month: null,
    submissionDeadline: null
})

/**
 * Reducer
 */

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action;

    switch(type) {

        case FETCH_ALL_REQUEST:
            return state.set('loading', true)

        case FETCH_ALL_SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('entities', fbDatatoEntities(payload, EventRecord))

        default: return state;
    }
}

/**
 * Selectors
 */
export const stateSelector = state => state[moduleName]
export const entitiesSelector = createSelector(stateSelector, state => state.entities)

// Т.к. в entities у нас спциальный Map объект ( [id1: {value}, id2: {value}, id2: {value}] )
// созданный с помощью нашей ф-ции fbDatatoEntities()
// То преобразование в массив такого объекта вфглядит так: entities.valueSeq().toArray()
export const eventListSelector = createSelector(entitiesSelector, entities => (
    entities.valueSeq().toArray()
))




/**
 * Action Creators
 */

export function fetchAll() {
    return {
        type: FETCH_ALL_REQUEST
    }
}

/**
 * Sagas
 */

export const fetchAllSaga = function * () {

    while(true) {
        const action = yield take(FETCH_ALL_REQUEST)

        const ref = firebase.database().ref('events')

        const data = yield ref.once('value')
        // const data = yield call([ref, ref.once], 'value')

        yield put({
            type: FETCH_ALL_SUCCESS,
            payload: data.val()
        })
    }
}

export function * saga() {
    yield all([
        fetchAllSaga()
    ])
}