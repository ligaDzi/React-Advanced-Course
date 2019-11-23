import { Record, OrderedMap, List } from 'immutable'
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

export function addPerson(person) {
    return (dispatch) => {
        dispatch({
            type: ADD_PERSON,
            payload: { id: Date.now() + Math.random(), ...person }
        })
    }
}