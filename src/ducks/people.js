import { Record, OrderedMap, List } from 'immutable'
import { call, put, takeEvery } from 'redux-saga/effects'
import { generateID } from './utils'
import { appName } from '../config'

const ReducerRecord = Record({
    enitites: new List([])
});

const PersonRecord = Record({
    id: null,    
    firstName: null,
    lastName: null,
    email: null
});

export const moduleName = 'people';
const prefix = `${appName}/${moduleName}`;
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`;
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`;
export const ADD_PERSON_ERROR = `${prefix}/ADD_PERSON_ERROR`;
export const ADD_PERSON = `${prefix}/ADD_PERSON`;

export default function reducer(state = new ReducerRecord(), action) {

    const { type, payload } = action;

    switch(type) {
        case ADD_PERSON:
            return state.update( 'enitites', enitites => enitites.push(new PersonRecord(payload.person)) )

        default:
            return state;
    }
}

// export function addPerson(person) {
//     return (dispatch) => {
//         dispatch({
//             type: ADD_PERSON,
//             payload: { id: Date.now() + Math.random(), ...person }
//         })
//     }
// }

export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: person
    }
}

export const addPersonSaga = function * (action) {
    const id = yield call(generateID);

    yield put({
        type: ADD_PERSON,
        payload: { ...action.payload, id }
    })
}

export const saga = function * () {
    yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
}