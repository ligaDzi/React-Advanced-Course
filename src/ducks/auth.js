import firebase from 'firebase'
import { Record } from 'immutable'
import { appName } from '../config'
import { all, call, put, takeEvery, take, cps } from 'redux-saga/effects'
import { push } from 'connected-react-router'

/**
 * Constants
 */
export const ReducerRecord = Record({
    user: null,
    error: null,
    loading: false
})

export const moduleName = 'auth'
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`
export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${appName}/${moduleName}/SIGN_IN_ERROR`
export const SIGN_OUT_REQUEST = `${appName}/${moduleName}/SIGN_OUT_REQUEST`
export const SIGN_OUT_SUCCESS = `${appName}/${moduleName}/SIGN_OUT_SUCCESS`


/**
 * Reducer
 */
export default function reducer(state = new ReducerRecord(), action) {

    const { type, payload, error } = action;

    switch(type) {
        case SIGN_IN_REQUEST:
        case SIGN_UP_REQUEST:
            return state.set('loading', true);

        case SIGN_IN_SUCCESS:
            return state
                .set('loading', false)
                .set('user', payload.user)
                .set('error', null);

        case SIGN_IN_ERROR:
        case SIGN_UP_ERROR:
            return state
                .set('loading', false)
                .set('error', error);

        case SIGN_OUT_SUCCESS:
            return new ReducerRecord({});

        default:
            return state;
    }
}

/**
 * Selectors
 */



/**
 * Action Creators
 */
export function signUp(email, password) {
    return {
        type: SIGN_UP_REQUEST,
        payload: { email, password }
    }
}

export function signIn(email, password) {
    return {
        type: SIGN_IN_REQUEST,
        payload: { email, password }
    }
}

export function signOut() {
    return {
        type: SIGN_OUT_REQUEST
    }
}


/**
 * Sagas
 */

export const signUpSaga = function * () {
    
    const auth = firebase.auth();
    
    while(true){
        const action = yield take(SIGN_UP_REQUEST);
        
        try {
            const user = yield call(
                [auth, auth.createUserWithEmailAndPassword],
                action.payload.email, action.payload.password
            )

            yield put({
                type: SIGN_IN_SUCCESS,
                payload: { user }
            })

        } catch (error) {
            yield put({
                type: SIGN_UP_ERROR,
                error
            })
        }
    }
}

export const watchStatusChange = function * () {
    const auth = firebase.auth();

    try {
        yield cps([auth, auth.onAuthStateChanged]);

    } catch (user) {

        yield put({
            type: SIGN_IN_SUCCESS,
            payload: { user }
        })
    }
}

export const signInSaga = function * (action) {
    const auth = firebase.auth();

    try {
        const user = yield call(
            [auth, auth.signInWithEmailAndPassword],
            action.payload.email, action.payload.password
        )

        yield put({
            type: SIGN_IN_SUCCESS,
            payload: { user }
        })

    } catch (error) {

        yield put({
            type: SIGN_IN_ERROR,
            error
        })
        
    }
}

export const signOutSaga = function * () {
    const auth = firebase.auth();

    try {
        yield call([auth, auth.signOut]);
        yield put({
            type: SIGN_OUT_SUCCESS
        });
        yield put(push('/auth/signin'));
    } catch (error) {
        
    }
}

export const saga = function * () {
    yield all([
        signUpSaga(),
        watchStatusChange(),
        takeEvery(SIGN_IN_REQUEST, signInSaga),
        takeEvery(SIGN_OUT_REQUEST, signOutSaga)
    ])
}