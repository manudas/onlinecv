import React, { Component } from 'react';

import { connect } from 'react-redux';

import { translateString } from '../../helpers/translations';

import './thank_you.css';

class ThankYou extends Component {
    render() {
        if (!this.props.data_is_loaded) {
            return null;
        }

        /* ====>> SECTION: THANK YOU <<====*/
        return (
            <section className="timeline profile-infos">
                {/* VERTICAL MARGIN (necessary for the timeline effect) */}
                <div className="line row timeline-margin timeline-margin-big content-wrap">
                    <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                    <div className="col-md-2 timeline-progress hidden-sm hidden-xs full-height" />
                    <div className="col-md-9 bg1 full-height" />
                </div>
                {/* /VERTICAL MARGIN */}
                {/* SECTION ITEM */}
                <div className="line row line-thank-you d-flex flex-wrap">
                    {/* Margin Collums (necessary for the timeline effect) */}
                    <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                    <div className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-point " />
                    {/* /Margin Collums */}
                    {/* Item Content */}
                    <div className="col-md-8 content-wrap bg1">
                        <div className="line-content">
                            {/* Subtitle */}
                            <h3 className="thank-you">
                                {translateString(
                                    'thank_you',
                                    this
                                )}
                                !
                            </h3>
                            {/* /Subtitle */}
                        </div>
                    </div>
                    {/* /Item Content */}
                    {/* Margin Collum*/}
                    <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                    {/* / Margin Collum*/}
                </div>
                {/* /SECTION ITEM */}
            </section>
        );
    }
}

function mapStateToProps(state) {
    const data = state && state.data ? state.data : null;
    const language =
        state && state.language ? state.language : null;
    const translations =
        data &&
        data.translations &&
        data.translations[language] &&
        data.translations[language]['ThankYou']
            ? data.translations[language]['ThankYou']
            : null;
    const data_is_loaded = data !== null;
    return {
        data_is_loaded: data_is_loaded,
        translations: translations,
        language: language
    };
}

export default connect(mapStateToProps)(ThankYou);
