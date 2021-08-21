import {createStore} from 'redux';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';

const initialState = {
    currentUser: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {...state, currentUser: action.payload}
        default:
            return state;
    }
}

const makeStore = (context) => createStore(reducer);

export const wrapper = createWrapper(makeStore, {debug: true});
