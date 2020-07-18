import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


const PrivateUserRoute = ({component: Component, 
    authUser: {isUserAuthenticated, loadingUser},
    ...rest}) => (
        <Route
            {...rest}
            render = {props =>     
                !isUserAuthenticated && !loadingUser ? (
                    <Redirect to="/loginUser" />
                ) : (
                    <Component {...props} />
                )
            }
        />
);

PrivateUserRoute.propTypes = {
    authUser: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    authUser: state.authUser
});

export default connect(mapStateToProps)(PrivateUserRoute);
