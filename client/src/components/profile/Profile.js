import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getProfileById} from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileReview from './ProfileReview';
import ReviewForm from '../profile/ReviewForm';
import { Link } from 'react-router-dom';

const Profile = ({
    getProfileById,
    profile: {profileById, loading}, authDoctor,authUser, match
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    },[getProfileById, match.params.id]);

    return (
        <Fragment>
           {profileById === null || loading ? (
               <Spinner />
           ) : (
               <Fragment>
                    <section id="profile-page">
                            <div class="container">
                                <div class="current-profile">
                                    <div class="current-btn">
                                        <Link class="rounded-pill btn btn-dark" to="/profiles">Back to Profiles</Link>
                                        {authUser.isUserAuthenticated ? (
                                            <Fragment>
                                                <Link to={`/appointment/${profileById.doctor._id}`} type="button" className="rounded-pill btn btn-info"><i className="fas fa-calendar-check"></i> Book Appointment</Link>
                                            </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <a href="#" data-toggle="tooltip" data-placement="right" title="Please Login as a User" className="rounded-pill btn btn-info disabled">
                                                        <i className="fas fa-calendar-check"></i> Book Appointment
                                                    </a>
                                                </Fragment>
                                            )
                                        }
                                        {authDoctor.isDoctorAuthenticated && 
                                            authDoctor.loadingDoctor === false && 
                                            authDoctor.doctor._id === profileById.doctor._id && (
                                                <Link to='/edit-profile' className='rounded-pill btn btn-secondary'>
                                                    <i class="fas fa-edit"></i>
                                                </Link>
                                        )}
                                    </div>
                                    <ProfileTop profile={profileById} />
                                    <ProfileAbout profile={profileById} />
                                    <div className="exp-edu">
                                        <div className="exp-bottom">
                                            <h2 className="exp-common-heading">Experience</h2>
                                            {profileById.experience.length > 0 ? (
                                                    <Fragment>
                                                        {profileById.experience.map(experience => (
                                                            <ProfileExperience key={experience._id} experience={experience} />
                                                        ))}
                                                    </Fragment>
                                                ) : (
                                                    <h4>No Experience credentials</h4>
                                                )
                                            }
                                        </div>
                                        <div className="edu-bottom">
                                            <h2 className="exp-common-heading">Education</h2>
                                            {profileById.education.length > 0 ? (
                                                    <Fragment>
                                                        {profileById.education.map(education => (
                                                            <ProfileEducation key={education._id} education={education} />
                                                        ))}
                                                    </Fragment>
                                                ) : (
                                                    <h4>No education credentials</h4>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div class="patient-review">
                                            <h2 class="exp-common-heading">Patient Reviews</h2> 
                                            { authUser.isUserAuthenticated ? 
                                                (
                                                   <ReviewForm doctorId={profileById.doctor._id} /> 
                                                ) : ""
                                            }
                                            {
                                                profileById.review.map(rev => (
                                                    <ProfileReview key={rev._id} review={rev} doctorId={match.params.id} />
                                                ))
                                            }
                                        </div>
                                </div>
                            </div>
                    </section>
               </Fragment>
           )} 
        </Fragment>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    authDoctor: PropTypes.object.isRequired,
    authUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    authDoctor: state.authDoctor,
    authUser: state.authUser
});

export default connect(mapStateToProps, {getProfileById})(Profile);
