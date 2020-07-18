import {
    GET_PROFILE,
    GET_PROFILE_BY_ID,
    GET_PROFILES,
    UPDATE_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    ADD_REVIEW,
    ADD_REVIEW_ERROR,
    REMOVE_REVIEW
} from '../actions/types';

const initialState = {
    profileById: null,
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}

export default function( state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case GET_PROFILE_BY_ID:
            return {
                ...state,
                profileById: payload,
                loading: false
            };
        
        case ADD_REVIEW: 
            return {
                ...state,
                profileById: { ...state.profileById, review: payload },
                loading: false   
            };
        case REMOVE_REVIEW:
            return {
                ...state,
                profileById: {
                    ...state.profileById,
                    review: state.profileById.review.filter(comment => comment._id !== payload)
                },
                loading: false
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            };
        case PROFILE_ERROR:
        case ADD_REVIEW_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            };
    
        default:
            return state;
    }
}