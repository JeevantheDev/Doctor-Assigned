import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteReview} from '../../actions/profile';
import { connect } from 'react-redux';

const ProfileReview = ({
    doctorId,
    review: { _id, text, name, avatar, date, user},
    authUser,
    deleteReview
}) => {

    return (
        <Fragment>
            <div className="current-review">
                <div className="img-user">
                    <img className="user-pic round-img" src={avatar} alt="" />
                    <h6><strong>{name}</strong></h6>
                </div>
                <div className="user-review">
                    <p>{text}</p>
                    <p className="post-date">
                          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                    </p>
                    {
                        authUser.user !== null && user === authUser.user._id && (
                        <button
                            onClick={e => deleteReview(doctorId, _id)}
                            className="btn btn-danger">X</button>
                    )}
                </div>
            </div>
        </Fragment>
    )
};

ProfileReview.propTypes = {
    profileId: PropTypes.number.isRequired,
    review: PropTypes.object.isRequired,
    authUser: PropTypes.object.isRequired,
    deleteReview: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    authUser: state.authUser
});

export default connect(mapStateToProps, {deleteReview})(ProfileReview);
