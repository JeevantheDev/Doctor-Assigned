import {
    REGISTER_DOCTOR_SUCCESS,
    REGISTER_DOCTOR_FAIL,
    DOCTOR_LOADED,
    AUTH_DOCTOR_ERROR,
    LOGIN_DOCTOR_SUCCESS,
    LOGIN_DOCTOR_FAIL,
    LOGOUT_DOCTOR,
    DELETE_ACCOUNT
    
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isDoctorAuthenticated: null,
    loadingDoctor: true,
    doctor: null
}

export default function(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case DOCTOR_LOADED:
            return {
                ...state,
                isDoctorAuthenticated: true,
                loadingDoctor: false,
                doctor: payload
            };
        case REGISTER_DOCTOR_SUCCESS:            
        case LOGIN_DOCTOR_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isDoctorAuthenticated: true,
                loadingDoctor: false
            };
        case REGISTER_DOCTOR_FAIL:
        case LOGIN_DOCTOR_FAIL:
        case DELETE_ACCOUNT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isDoctorAuthenticated: false,
                loadingDoctor: false
            }; 
        case LOGOUT_DOCTOR:
        case AUTH_DOCTOR_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isDoctorAuthenticated: false,
                loadingDoctor: false
            };         
        default:
            return state;
    }
}