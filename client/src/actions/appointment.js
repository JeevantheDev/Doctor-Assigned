import axios from 'axios';
import {setAlert} from './alert';

import {
    GET_APPOINTMENTS,
    ADD_APPOINTMENTS,
    UPDATE_APPOINTMENTS,
    APPOINTMENT_ERROR,
    DELETE_USER_ACCOUNT
} from './types';

// Get Appointments
export const getAppointments = () => async dispatch => {
    try {
        const res = await axios.get('/api/authUser');
        dispatch({
            type: GET_APPOINTMENTS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: APPOINTMENT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    };
};

// Add appointment
export const addAppointment = (doctorId, formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post(`/api/appointment/${doctorId}`,formData, config);
        dispatch({
            type: ADD_APPOINTMENTS,
            payload: res.data
        });

        dispatch(setAlert('Appointment booked', 'success'));
        history.push('/appointment');
        
    } catch (err) {
        dispatch({
            type: APPOINTMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    };
};

// Delete appointment
export const deleteAppointment = (appointmentId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/authUser/${appointmentId}`);
        dispatch({
            type: UPDATE_APPOINTMENTS,
            payload: res.data
        });

        dispatch(setAlert('Appointment removed', 'success'));
    } catch (err) {
        dispatch({
            type: APPOINTMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    };
};

// Delete user account
export const deleteAccountUser = () => async dispatch => {
    if(window.confirm('Are you sure? this can not be undone!')) {
        try {
            await axios.delete('/api/authUser');

            dispatch({
                type: DELETE_USER_ACCOUNT
            });

            dispatch(setAlert("Your account has been removed", 'success'));
        } catch (err) {
            dispatch ({
                type: APPOINTMENT_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
}
