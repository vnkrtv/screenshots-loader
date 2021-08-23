import {useMemo} from 'react'
import {createStore} from 'redux'

let store;

const initialState = {
    loggedIn: false,
    currentUser: {}
}

export const actionType = {
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LOGIN_USER:
            return {
                ...state,
                loggedIn: true,
                currentUser: action.currentUser
            }
        case actionType.LOGOUT_USER:
            return {
                ...state,
                loggedIn: false,
                currentUser: {}
            }
        default:
            return state;
    }
}

export const initStore = (preloadedState = initialState) => {
    return createStore(
        reducer,
        preloadedState
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)

    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        store = undefined;
    }

    if (typeof window === 'undefined') return _store

    if (!store) store = _store

    return _store
}

export function useStore(initialState) {
    return useMemo(() => initializeStore(initialState), [initialState])
}
