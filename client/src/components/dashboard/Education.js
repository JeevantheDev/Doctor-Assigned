import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deleteEducation} from '../../actions/profile';

const Education = ({education, deleteEducation}) => {
    const educations = education.map(edu => (
        <tr key={edu.id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
                <Moment format='DD/MM/YYYY'>{edu.from}</Moment> - {' '}
                {edu.to === null ? (
                    'Now'
                ) : (
                    <Moment format='DD/MM/YYYY'>{edu.to}</Moment>
                )}
            </td>
            <td>
                <button
                    onClick={() => deleteEducation(edu._id)}
                    type="button" 
                    className="btn btn-danger">X
                </button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <div className="common-details">
                <h2 class="credentials"><strong>Education Credentials</strong></h2>
                    <br />
                    <div class="common-table">
                        <table class="table">
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                        {educations}
                        </table>
                    </div>
            </div>
            <br />
        </Fragment>
    );
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, {deleteEducation})(Education);
