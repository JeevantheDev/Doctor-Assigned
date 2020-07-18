import React, {Fragment, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addEducation} from '../../actions/profile';


const AddEducation = ({addEducation, history}) => {
    const [formData, setFormdata] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from:'',
        to:'',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {school, degree, fieldofstudy, from, to, current, description} = formData;

    const onChange = e => setFormdata({
        ...formData,
        [e.target.name]: e.target.value
    });

    return (
        <Fragment>
            <section id="Login">
                <div className="container">
                        <div style={{height: "auto"}} class="common-form">
                            <div className="form-side">
                                <div className="heading-common">
                                    <h1><strong>Add Education</strong>
                                        <i className="fas fa-university"></i>
                                    </h1>  
                                    <p className="lead">
                                        <i className="fas fa-user"></i> Add any school, Medicalcamp, etc that you have attended
                                    </p>
                                </div>
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addEducation(formData, history);
                                }}>
                                    <small>* = required field</small>
                                    <div className="form-group">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="* School"
                                        name="school"
                                        value={school}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                    </div>
                                    <div className="form-group">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="* Degree or Certification"
                                        name="degree" 
                                        value={degree} 
                                        onChange={e => onChange(e)} 
                                        required
                                    />
                                    </div>
                                    <div className="form-group">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="* Field of study" 
                                        name="fieldofstudy" 
                                        value={fieldofstudy} 
                                        onChange={e => onChange(e)} 
                                        required 
                                    />
                                    </div>
                                    
                                    <h6>From Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control" name="from" value={from} onChange={e => onChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {
                                            setFormdata({ ...formData, current: !current });
                                            toggleDisabled(!toDateDisabled);
                                        }} /> {' '} Current School</p>
                                    </div>
                                    <h6>To Date</h6>
                                    <div className="form-group">
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            name="to" 
                                            value={to} 
                                            onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
                                    </div>
                                    <div className="form-group">
                                        <textarea 
                                            name="description"
                                            className="form-control" 
                                            placeholder="* Program Description" 
                                            value={description} onChange={e => onChange(e)}></textarea>
                                        <small className="form-text">Tell us a little about the program.</small>
                                    </div>
                                    <input type="submit" className="btn btn-info" />{' '}
                                    <Link to="/dashboard" type="submit" className="btn btn-outline-secondary">Go Back</Link>
                                </form>
                                <br />
                            </div>
                            <div className="img-side">
                                <img src={require("../../img/graduation.svg")} alt="" className="register-user" />
                            </div>
                        </div>
                    </div>
            </section>
        </Fragment>
    );
};

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, {addEducation})(withRouter(AddEducation));
