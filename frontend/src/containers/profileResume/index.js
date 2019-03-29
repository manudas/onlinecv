import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getBase64ImageMimeType, bufferToBase64 } from './../../helpers/image';

import './profileResume.css';

class ProfileResume extends Component {
    constructor(props) {
        super(props);
	}
	
    translateString(string) {
        let translations = this.props.translations
            ? this.props.translations
            : null;
        let result = translations && translations[string] ? translations[string] : null;
        if (result) {
            return result["text"];
        } else {
            return string + "_translation";
        }
    }

    render() {
        if (!this.props.details) {
            return null;
        }
        
        const _profilePicture = this.props.profilePicture ? `data:${getBase64ImageMimeType(this.props.profilePicture)};base64,${this.props.profilePicture}` : null;
        
        let name = this.props.details && this.props.details.name ? this.props.details.name : 'Name ex.';
        let surname = this.props.details && this.props.details.surname ? this.props.details.surname : 'LastName ex.';
        name = name.split(' ')[0];
        surname = surname.split(' ')[0];
        
        const primaryJobName = this.props.details && this.props.details.primaryJobName ? this.props.details.primaryJobName : null;
        const secondaryJobName = this.props.details && this.props.details.secondaryJobName ? this.props.details.secondaryJobName : null;
        
        const smallDescription = this.props.details && this.props.details.smallDescription ? 
                                    this.props.details.smallDescription
                                    : null;

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
                    <h1 className="intro-title1">{this.translateString('salutations')} 
                        <span className="color1 bold"> {name} {surname}!</span>
                    </h1>
                    {/* Welcome Title */}
                    {/* Job - */}
                    <h2 className="intro-title2">
                        {primaryJobName} {(primaryJobName && secondaryJobName) ? '/' : ''} {secondaryJobName}
                    </h2>
                    {/* job */}
                    {/* Description */}
                    <p className="text-justify" dangerouslySetInnerHTML={{__html: smallDescription}}></p>
                {/* /Description */}
                </div>
            {/* /Right Collum */}
            </div>
        );
        /* ============  /PROFILE INTRO ================= */
    }
}

function mapStateToProps(state) {
    const data = (state && state.data) ? state.data : null;
    const profile_picture = (data && data.images && data.images.profile_picture) ? data.images.profile_picture : null;
    const resume = (data && data.resume) ? data.resume : null;
    const details = (data && data.details) ? data.details : null;
    const language = (state && state.language) ? state.language : null;
    const translations =
        data &&
        data.translations &&
        data.translations[language] &&
        data.translations[language]['ProfileResume']
            ? data.translations[language]['ProfileResume']
            : null;
    return {
        profilePicture: profile_picture ? bufferToBase64(profile_picture.value) : null,
        resume: resume,
        details: details,
        translations: translations,
        language: language,
    };
}

export default connect(mapStateToProps)(ProfileResume);