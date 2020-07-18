import {
    GET_APPOINTMENTS,
    ADD_APPOINTMENTS,
    UPDATE_APPOINTMENTS,
    APPOINTMENT_ERROR,
} from '../actions/types';

const initalState = {
    appointments: null,
    loading: true,
    error: {}
}

export default function(state=initalState, action) {
    const {type, payload} = action;

    switch(type) {
        case GET_APPOINTMENTS:
            return {
                ...state,
                appointments: payload,
                loading: false
            };
        case ADD_APPOINTMENTS:
            return {
                ...state,
                appointments: payload,
                loading: false
            };
        case UPDATE_APPOINTMENTS:
            return {
                ...state,
                appointments: payload,
                loading: false
            }
        case APPOINTMENT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}

