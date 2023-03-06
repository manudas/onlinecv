import React, { Component } from 'react';

import { connect } from 'react-redux';

import { translateString } from '../../helpers/translations';
import TimeLineItem from '../timeLineItem';

import './thank_you.css';

class ThankYou extends Component {
    render() {
        if (!this.props.data_is_loaded) {
            return null;
        }

        /* ====>> SECTION: THANK YOU <<====*/
        return (
            <section className="timeline">
                {/* SECTION ITEM */}
                {/* VERTICAL MARGIN (necessary for the timeline effect) */}
                <div className="line row timeline-margin timeline-margin-big content-wrap">
                    <div className="col-md-1 bg1 hidden-sm hidden-xs" />
                    <div className="col-md-2 timeline-progress hidden-sm hidden-xs" />
                    <div className="col-md-9 bg1" />
                </div>
                {/* /VERTICAL MARGIN */}
                <TimeLineItem type="point" className={'line-thank-you'}>
                    <div className="line-content">
                        {/* Subtitle */}
                        <h3 className="thank-you">
                            {translateString(
                                'thank you',
                                this
                            )}
                            !
                        </h3>
                        {/* /Subtitle */}
                    </div>
                </TimeLineItem>
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
