import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


const ProfileItem = ({
    profile: {
        doctor: {_id, name, avatar },
        clinic,
        location,
        specialists,
        ruppess
    },
    authUser
}) => {
    
    return (
        <div classNameName="profiles">
            <div className="profile-1">
                    <div className="profile-img">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="profile-details">
                        <div className="profile-desc">
                            <h2 className="profile-heading"><strong>{name}</strong></h2>
                            <p className="profile-p"><strong>{specialists}</strong> </p>
                            <p className="profile-p2"><strong>{clinic}</strong> {location}</p>
                            <p className="profile-p2"><strong>{ruppess}</strong> Consultation fee at clinic</p>
                        </div>
                    </div>
                    <div className="mx-auto profile-buttons">
                        {authUser.isUserAuthenticated ? (
                            <Fragment>
                                <Link to={`/appointment/${_id}`} type="button" className="rounded-pill profile-btn btn btn-info"><i className="fas fa-calendar-check"></i> Book Appointment</Link>
                            </Fragment>
                            ) : (
                                <Fragment>
                                    <button type="button" data-toggle="tooltip" data-placement="right" title="Please Login as a User" className="rounded-pill profile-btn btn btn-info disabled">
                                        <i className="fas fa-calendar-check"></i> Book Appointment
                                    </button>
                                </Fragment>
                            )
                        }
                        <Link to={`/doctor/${_id}`} type="button" className="rounded-pill profile-btn btn btn-dark">View Profile</Link>
                    </div>
                </div>
        </div>
    )
};

ProfileItem.propTypes ={
    profile: PropTypes.object.isRequired,
    authUser: PropTypes.object.isRequired
};
const mapStateToProps =state => ({
    authUser: state.authUser
});

export default connect(mapStateToProps)(ProfileItem);
