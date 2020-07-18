import {combineReducers} from 'redux';
import alert from './alert';
import authDoctor from './authDoctor';
import authUser from './authUser';
import profile from './profile';
import appointment from './appointment';

export default combineReducers({
    alert,
    authDoctor,
    authUser,
    profile,
    appointment
});
