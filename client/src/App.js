import React, { useEffect, Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import LoginUser from './components/auth/LoginUser';
import LoginDoctor from './components/auth/LoginDoctor';
import DoctorRegister from './components/auth/DoctorRegister';
import UserRegister from './components/auth/UserRegister';
import Dashboard from './components/dashboard/Dashboard';
import AddEducation from './components/profile-forms/AddEducation';
import AddExperience from './components/profile-forms/AddExperience';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import PrivateDoctorRoute from './components/routing/PrivateDoctorRoute';
import Appointment from './components/user/Appointments';
import AppointmentForm from './components/bookappointment/AppointmentForm';
import PrivateUserRoute from './components/routing/PrivateUserRoute';
import './App.css';

// Redux
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/authUser';
import { loadDoctor } from './actions/authDoctor';
import setAuthToken from './utils/setAuthToken';


if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadDoctor());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path='/loginUser' component={LoginUser} />
              <Route exact path='/loginDoctor' component={LoginDoctor} />
              <Route exact path='/registerDoctor' component={DoctorRegister} />
              <Route exact path='/registerUser' component={UserRegister} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/doctor/:id' component={Profile} />
              <PrivateDoctorRoute exact path='/dashboard' component={Dashboard} />
              <PrivateDoctorRoute exact path='/add-education' component={AddEducation} />
              <PrivateDoctorRoute exact path='/add-experience' component={AddExperience} />
              <PrivateDoctorRoute exact path='/create-profile' component={CreateProfile} />
              <PrivateDoctorRoute exact path='/edit-profile' component={EditProfile} />
              <PrivateUserRoute   exact path='/appointment' component={Appointment} />
              <PrivateUserRoute   exact path='/appointment/:id' component={AppointmentForm} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
