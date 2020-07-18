import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    USER_LOADED,
    AUTH_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT_USER,
    DELETE_USER_ACCOUNT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isUserAuthenticated: null,
    loadingUser: true,
    user: null
}

export default function(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isUserAuthenticated: true,
                loadingUser: false,
                user: payload
            };
        case REGISTER_USER_SUCCESS:            
        case LOGIN_USER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isUserAuthenticated: true,
                loadingUser: false
            };
        case REGISTER_USER_FAIL:
        case LOGIN_USER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isUserAuthenticated: false,
                loadingUser: false
            }; 
        case AUTH_USER_ERROR:
        case LOGOUT_USER:
        case DELETE_USER_ACCOUNT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isUserAuthenticated: false,
                loadingUser: false
            };    
        default:
            return state;
    }
}