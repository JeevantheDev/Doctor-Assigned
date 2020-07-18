import axios from 'axios';
import {setAlert} from './alert';

import {
    ADD_REVIEW,
    ADD_REVIEW_ERROR,
    REMOVE_REVIEW
} from './types';

// Add review
export const addReview = (doctorId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post(`/api/profile/doctor/${doctorId}`, formData, config);
        
        dispatch({
            type: ADD_REVIEW,
            payload: res.data.review
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