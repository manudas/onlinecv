import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getBase64ImageMimeType } from './../../helpers/image';

import './profileResume.css';

class ProfileResume extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let _profilePicture = this.props.profilePicture ? `data:${getBase64ImageMimeType(this.props.profilePicture)};base64,${this.props.profilePicture}` : null;
        /* =============== PROFILE INTRO ====================*/
        return (
            <div className="profile-intro row">
                {/* Left Collum with Avatar pic */}
                <div className="col-md-4 profile-col">
                    {/* Avatar pic */}
                    <div className="profile-pic">
                        <div className="profile-border">
                            {/* Put your picture here ( 308px by 308px for retina display)*/}
                            <img {...(_profilePicture ?
                                    {
                                        src :  _profilePicture
                                    }
                                    : '')
                                } alt="" />
                        {/* /Put your picture here */}
                        </div>
                    </div>
                {/* /Avatar pic */}
                </div>
                {/* /Left columm with avatar pic */}
                {/* Right Columm */}
                <div className="col-md-7">
                    {/* Welcome Title*/}
                    <h1 className="intro-title1">Hi, i'm <span className="color1 bold">John Rex!</span></h1>
                    {/* /Welcome Title */}
                    {/* Job - */}
                    <h2 className="intro-title2">Designer / Web Developer</h2>
                    {/* /job */}
                    {/* Description */}
                    <p><strong>Turpis, sit amet iaculis dui consectetur at.</strong> Cras sagittis molestie orci. <strong>Suspendisse ut laoreet mi</strong>. Phasellus eu tortor vehicula, blandit enim eu, auctor massa. Nulla ultricies tortor dolor, sit amet suscipit enim <strong>condimentum id</strong>. Etiam eget iaculis tellus.  Varius sit amet.</p>
                {/* /Description */}
                </div>
            {/* /Right Collum */}
            </div>
        );
        /* ============  /PROFILE INTRO ================= */
    }
}

function mapStateToProps(state) {
    let data = (state && state.data) ? state.data : null;
    let profile_picture = (data && data.images && data.images.profile_picture) ? data.images.profile_picture : null;
    let resume = (data && data.resume) ? data.resume : null;
    return {
        profilePicture: profile_picture ? Buffer.from(profile_picture.value.data).toString('base64') : null,
        resume: resume
    };
}

export default connect(mapStateToProps)(ProfileResume);