import React, {useState, Fragment, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {createProfile, getCurrentProfile} from '../../actions/profile';

const Edit = ({ profile: {profile, loading}, createProfile, getCurrentProfile, history}) => {
    const [formData, setFormData] = useState({
        clinic: '',
        website: '',
        location: '',
        status: '',
        specialists: '',
        ruppess: '',
        timing: '',
        bio: '',
        twitter: '',
        facebook: '',
        youtube: '',
        instagram: '' 
    });

    const [displySocialInputs, toggleSocialInputs] = useState(false);
    useEffect(() => {
        getCurrentProfile();
        setFormData({
            clinic: loading || !profile.clinic ? '': profile.clinic,
            website: loading || !profile.website ? '': profile.website,
            location: loading || !profile.location ? '': profile.location,
            status: loading || !profile.status ? '': profile.status,
            specialists: loading || !profile.specialists ? '': profile.specialists,
            ruppess: loading || !profile.ruppess ? '': profile.ruppess,
            timing: loading || !profile.timing ? '': profile.timing,
            bio: loading || !profile.bio ? '': profile.bio,
            twitter: loading || !profile.social ? '': profile.social.twitter,
            facebook: loading || !profile.social ? '': profile.social.facebook,
            youtube: loading || !profile.social ? '': profile.social.youtube,
            instagram: loading || !profile.social ? '': profile.social.instagram
        });
    },[loading, getCurrentProfile]);

    const {
        clinic,
        website,
        location,
        status,
        specialists,
        ruppess,
        timing,
        bio,
        twitter,
        facebook,
        youtube,
        instagram
    } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    };

    return (
        <Fragment>
            <section id="Login">
                <div className="container">
                    <div style={{height: "auto"}} class="common-form">
                        <div className="form-side">
                            <div className="heading-common">
                                <h1><strong>Edit Profile</strong>{' '}
                                    <i className="far fa-id-card"></i>
                                </h1>  
                                <p className="lead">
                                    <i className="fas fa-user"></i> Let's get some information to make your
                                    profile stand out
                                </p>
                            </div>
                            <form onSubmit={e => onSubmit(e)}>
                                <small>* = required field</small>
                                <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="* Enter your status. eg. Professor, Senior Specalist etc."
                                    name="status"
                                    value={status}
                                    onChange={e => onChange(e)} required
                                />
                                <small className="form-text text-muted">Give us an idea of where you are at in your career</small>
                                </div>
                                <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="* Clinic" 
                                    name="clinic" 
                                    value={clinic}
                                    onChange={e => onChange(e)} required
                                />
                                <small className="form-text text-muted">Could be your own clinic or one you work </small>
                                </div>
                                <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Specalist"
                                    name="specialists" 
                                    value={specialists}
                                    onChange={e => onChange(e)} required 
                                />
                                <small className="form-text text-muted">Give us an idea of your specalist. </small>
                                </div>
                                <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="* Timing"
                                    name="timing"
                                    value={timing}
                                    onChange={e => onChange(e)} required
                                />
                                <small className="form-text text-muted">At which time you are available for patients, mention day with time. </small>
                                </div>
                                <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="* Ruppess"
                                    name="ruppess"
                                    value={ruppess}
                                    onChange={e => onChange(e)} required
                                />
                                <small className="form-text text-muted">At which time you are available for patients, mention day with time. </small>
                                </div>
                                <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="* Website."
                                    name="website"
                                    value={website}
                                    onChange={e => onChange(e)} required
                                />
                                <small className="form-text text-muted">Could be your own or a clinic website </small>
                                </div>
                                <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="* Location."
                                    name="location"
                                    value={location}
                                    onChange={e => onChange(e)} required
                                />
                                <small className="form-text text-muted">Could be your own clinic address or one you work </small>
                                </div>
                                <div className="form-group">
                                    <textarea 
                                        className="form-control" 
                                        placeholder="* A short bio of yourself" 
                                        name="bio"
                                        value={bio}
                                        onChange={e => onChange(e)} required
                                    />
                                    <small className="form-text">Tell us a little about yourself</small>
                                </div>

                                <div className="mb-3">
                                    <button onClick={() => toggleSocialInputs(!displySocialInputs)}
                                        type="button" className="btn btn-outline-secondary">
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted"> {' '}
                                        Optional
                                    </span>
                                </div>
                                {displySocialInputs && (
                                    <Fragment>
                                        <div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fab fa-twitter"></i>
                                                    </span>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Twitter Profile URL" 
                                                    name="twitter" 
                                                    value={twitter} onChange={e => onChange(e)} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fab fa-facebook"></i>
                                                    </span>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-lg" 
                                                    placeholder="Facebook Profile URL" 
                                                    name="facebook" 
                                                    value={facebook} onChange={e => onChange(e)} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fab fa-youtube"></i>
                                                    </span>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-lg" 
                                                    placeholder="Youtube Profile URL" 
                                                    name="youtube" 
                                                    value={youtube} onChange={e => onChange(e)} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fab fa-instagram"></i>
                                                    </span>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Instagram Profile URL" 
                                                    name="instagram" 
                                                    value={instagram} onChange={e => onChange(e)} />
                                            </div>
                                        </div>
                                    </Fragment>
                                )}
                                <input type="submit" className="btn btn-info" /> {' '}
                                <Link to="/dashboard" className="btn btn-outline-secondary">Go Back</Link>
                            </form>
                            <br />
                        </div>
                        <div className="img-side">
                            <img src={require("../../img/mention.svg")} alt="" className="register-user" />
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

Edit.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile:PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(Edit));
