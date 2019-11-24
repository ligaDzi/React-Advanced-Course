import { call, put } from 'redux-saga/effects'
import { addPersonSaga, ADD_PERSON, ADD_PERSON_REQUEST } from './people'
import { generateID } from './utils'

it('should dispatch person with id', () => {
    const person = {
        firstName: 'Mihail',
        lastName: 'Rurikovich',
        email: 'test@gmail.com'
    }

    const saga = addPersonSaga({
        type: ADD_PERSON_REQUEST,
        payload: person
    })

    expect( saga.next().value ).toEqual( call(generateID) );

    const id  = generateID();

    expect( saga.next(id).value ).toEqual(put({
        type: ADD_PERSON,
        payload: {...person, id}
    }))
})