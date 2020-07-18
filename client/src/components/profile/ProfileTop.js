import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({profile: {
    doctor: { name, avatar },
        clinic,
        location,
        specialists,
        ruppess,
        website,
        social
    }
}) => {
    return (
        <div className="top-profile">
            <div className="top-details">
                <div className="top-img">
                    <img className="round-img" src={avatar} alt="" />
                </div>
                <div className="details">
                    <h2 className="profile-top-heading"><strong>{name}</strong></h2>
                    <br />
                    <h3 className="profile-top-desc">{specialists}</h3>
                    <br />
                    <p className="profile-top-p">{clinic}, {location}</p>
                    <p className="fee"><strong>{ruppess} </strong>Consultation Fee</p>
                    <div className="logos">
                        {website && (
                            <a className="logo" href={website} target="_blank" rel="noopener noreferrer">
                                <i className="fas fa-globe fa-2x"></i>
                            </a>
                        )}
                        { social && social.twitter && (
                            <a className="logo" href={social.twitter} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter fa-2x"></i>
                            </a>
                        )}
                        { social && social.facebook && (
                            <a className="logo" href={social.facebook} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-square fa-2x"></i>
                            </a>
                        )}
                        { social && social.instagram && (
                            <a className="logo" href={social.instagram} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram fa-2x"></i>
                            </a>
                        )}
                        { social && social.youtube && (
                            <a className="logo" href={social.youtube} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-youtube fa-2x"></i>
                            </a>
                        )}
                    </div>
                </div>    
            </div>   
            <div className="top-profile-img">
                <img src={require("../../img/doctor4.svg")} />
            </div>   
        </div>
    )
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileTop;
