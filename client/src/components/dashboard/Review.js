import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import Graph from './Graph';

const Review = ({review, patient}) => {
    const reviews = review.map(rev => (
        <div className="card">
            <img className="card-img-top" src={rev.avatar} alt="Card image cap" />
                <div className="card-body">
                    <p className="card-text">{rev.text}</p>
                    <p class="post-date">posted on 
                     {' '}<Moment format='DD/MM/YYYY'>{rev.date}</Moment>
                    </p>
                    <em>{rev.name}</em>
                </div>
        </div>
    ));
    return (
        <Fragment>
            <div className="review-graph">
                <div className="common-details">
                <h2 class="credentials"><strong>Users Reviews</strong></h2>
                    <br />
                    <div id="testimonials">
                        <div class="scroll">
                            { review.length === 0 ? "No Reviews Yet" : reviews }
                        </div>
                    </div>
                </div>
                <div className="common-details">
                    <h2 className="credentials"><strong>Total Appointments</strong></h2>
                    <br />
                    <div id="graph">
                        <Graph patient={patient} />
                    </div>
                </div>
            </div>
            <br />
        </Fragment>
    );
};

Review.propTypes = {
    patient: PropTypes.array.isRequired,
}

export default connect(null)(Review);
