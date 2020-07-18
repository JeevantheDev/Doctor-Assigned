import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deleteExperience} from '../../actions/profile';

const Experience = ({experience, deleteExperience}) => {
    const experiences = experience.map(exp => (
        <tr key={exp.id}>
            <td>{exp.medical}</td>
            <td>{exp.position}</td>
            <td>
                <Moment format='DD/MM/YYYY'>{exp.from}</Moment> - {' '}
                {exp.to === null ? (
                    'Now'
                ) : (
                    <Moment format='DD/MM/YYYY'>{exp.to}</Moment>
                )}
            </td>
            <td>
                <button
                    onClick={() => deleteExperience(exp._id)}
                    type="button" 
                    className="btn btn-danger">X
                </button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <div className="common-details">
                <h2 class="credentials"><strong>Experience Credentials</strong></h2>
                    <br />
                    <div class="common-table">
                        <table class="table">
                        <tr>
                            <th>Hospital</th>
                            <th>Postion</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                        {experiences}
                        </table>
                    </div>
            </div>
            <br />
        </Fragment>
    );
};

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, {deleteExperience})(Experience);
