import axios from 'axios';
import {setAlert} from './alert';

import {
    GET_PROFILE,
    GET_PROFILE_BY_ID,
    GET_PROFILES,
    UPDATE_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    ADD_REVIEW,
    ADD_REVIEW_ERROR,
    REMOVE_REVIEW,
    DELETE_ACCOUNT
} from './types';

// Get current doctors profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        
    }
};
// Get all profiles
export const getProfiles = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get profiles by doctor id
export const getProfileById = doctorId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/doctor/${doctorId}`);        
        dispatch({
            type: GET_PROFILE_BY_ID,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Create / Update a profile
export const createProfile = (formData, history, edit=false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if(!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// ADD Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Experience added", 'success'));
        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
// ADD Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('api/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Education added", 'success'));
        console.log(history);
        
        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete experience
export const deleteExperience = exp_id => async dispatch => {
    try {
        const res = await axios.delete(`api/profile/experience/${exp_id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Experience Removed", 'success'));
    } catch (err) {
        dispatch ({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
// Delete education
export const deleteEducation = edu_id => async dispatch => {
    try {
        const res = await axios.delete(`api/profile/education/${edu_id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Education Removed", 'success'));
    } catch (err) {
        dispatch ({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add review
export const addReview = (doctorId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post(`/api/profile/doctor/:${doctorId}`, formData, config);
        dispatch({
            type: ADD_REVIEW,
            payload: res.data
        });

        dispatch(setAlert('Review Added', 'success'))
    } catch (err) {
        dispatch ({
            type: ADD_REVIEW_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete Review
export const deleteReview = (doctorId, reviewId) => async dispatch => {
    try {
         await axios.delete(`/api/profile/doctor/${doctorId}/${reviewId}`);
        
        dispatch({
            type: REMOVE_REVIEW,
            payload: reviewId
        });

        dispatch(setAlert('Comment removed', 'success'));
    } catch (err) {
        dispatch ({
            type: ADD_REVIEW_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete account and profile
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? this can not be undone!')) {
        try {
            await axios.delete('/api/profile');
    
            dispatch({
                type: CLEAR_PROFILE
            });
            dispatch({
                type: DELETE_ACCOUNT
            });
    
            dispatch(setAlert("Your Account has been Removed", 'success'));
        } catch (err) {
            dispatch ({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
};
