import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
    getBase64MimeType,
    bufferToBase64
} from './../../helpers/files';

import { translateString } from '../../helpers/translations';

import './profileResume.css';

class ProfileResume extends Component {
    render() {
        if (!this.props.details) {
            return null;
        }

        const _profilePicture = this.props.profilePicture
            ? `data:${getBase64MimeType(
                  this.props.profilePicture
              )};base64,${this.props.profilePicture}`
            : null;

        let name = this.props?.details?.name ?? 'Name ex.';
        let surname = this.props?.details?.surname ?? '';
        name = name.split(' ')[0];
        surname = surname.split(' ')[0];

        const primaryRole = this.props?.details?.primaryRole;
        const secondaryRole = this.props?.details?.secondaryRole;

        const description = this.props?.details?.description;
        const roles = `${primaryRole} ${primaryRole && secondaryRole ? '/' : ''} ${secondaryRole}`

        /* =============== PROFILE INTRO ====================*/
        return (
            <div className="profile-intro row">
                {/* Left Collum with Avatar pic */}
                <div className="col-md-5 col-lg-4 profile-col">
                    {/* Avatar pic */}
                    <div className="profile-pic">
                        <div className="profile-border">
                            {/* Put your picture here ( 308px by 308px for retina display)*/}
                            <img
                                {...(_profilePicture
                                    ? {
                                          src: _profilePicture
                                      }
                                    : '')}
                                alt={`${name} ${surname} ${roles}`}
                                title={`${name} ${surname} ${roles}`}
                            />
                            {/* /Put your picture here */}
                        </div>
                    </div>
                    {/* /Avatar pic */}
                </div>
                {/* /Left columm with avatar pic */}
                {/* Right Columm */}
                <div className="col-md-6 col-lg-7">
                    {/* Welcome Title*/}
                    <h1 className="intro-title1">
                        {translateString(
                            'Hi, I am',
                            this
                        )}
                        <span className="color1 bold">
                            {' '}
                            {name} {surname}!
                        </span>
                    </h1>
                    {/* Welcome Title */}
                    {/* Job - */}
                    <h2 className="intro-title2">
                        { roles }
                    </h2>
                    {/* job */}
                    {/* Description */}
                    <p className="text-justify">{ description }</p>
                    {/* /Description */}
                </div>
                {/* /Right Collum */}
            </div>
        );
        /* ============  /PROFILE INTRO ================= */
    }
}

function mapStateToProps(state) {
    const data = state?.data
    const language = state?.language
    const details = data?.resume?.details
    const profileImage = details?.profileImage
    const translations = state?.[language]?.ProfileResume

    return {
        profilePicture: profileImage
            ? bufferToBase64(profileImage)
            : null,
        details,
        translations,
        language
    };
}

export default connect(mapStateToProps)(ProfileResume);
