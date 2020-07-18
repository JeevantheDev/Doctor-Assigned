import React, { useState, Fragment } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/authUser';

const LoginUser = ({ login, isUserAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;
    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    const onSubmit = async e => {
        e.preventDefault();
        login(email,password);
    }

    // Redirect if login
    if(isUserAuthenticated) {
        return <Redirect to="/profiles" />
    }

    return (
        <Fragment>
            <section id="Login">
                <div className="container">
                    <div className="common-form">
                        <div className="form-side">
                            <div className="heading-common">
                                <h1><strong>Log in User</strong>{' '}
                                    <i className="fas fa-sign-in-alt"></i>
                                </h1>
                            </div>
                            <form onSubmit={e => onSubmit(e)}>
                                <div className="form-group">
                                <label className="label" for="exampleInputEmail1">Email address</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Enter your email address." 
                                    name="email"
                                    value={email}
                                    onChange={e => onChange(e)}
                                    required
                                />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                <label className="label" for="exampleInputPassword1">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Enter your password." 
                                    name="password"
                                    minLength="6"
                                    value={password}
                                    onChange={e => onChange(e)}
                                />
                                </div>
                                <input type="submit" className="btn btn-info" value="Log In" />
                                <p>Or {' '}
                                <Link to="/">Create a new account</Link></p>
                            </form>
                        </div>
                        <div className="img-side">
                            <img src={require("../../img/coughing_2.svg")} alt="" className="register-user" />
                        </div>
                    </div>
                </div>
            </section>    
        </Fragment>
    );
};

LoginUser.propTypes ={
    login: PropTypes.func.isRequired,
    isUserAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
    isUserAuthenticated: state.authUser.isUserAuthenticated
});

export default connect(mapStateToProps, {login})(LoginUser);
