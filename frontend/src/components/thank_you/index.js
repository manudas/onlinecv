import React, { Component } from 'react';

import './thank_you.css';

class ThankYou extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height_ThankYouSpace: 0,
            height_ThankYou: 0
        };
    }

    componentDidMount() {
        const height_ThankYouSpace = this.refThankYouSpace.clientHeight;
        const height_ThankYou = this.refThankYou.clientHeight;

        this.setState({
            height_ThankYouSpace,
            height_ThankYou
        });
    }

    render() {
        /* ====>> SECTION: THANK YOU <<====*/
        return (
            <section className="timeline profile-infos">
                {/* VERTICAL MARGIN (necessary for the timeline effect) */}
                <div className="line row timeline-margin timeline-margin-big">
                    <div
                        ref={refThankYouSpace => this.refThankYouSpace = refThankYouSpace}
                        className="content-wrap">
                        <div
                            style={{ height: this.state.height_ThankYouSpace }}
                            className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                        <div
                            style={{ height: this.state.height_ThankYouSpace }}
                            className="col-md-2 timeline-progress hidden-sm hidden-xs full-height"></div>
                        <div
                            style={{ height: this.state.height_ThankYouSpace }}
                            className="col-md-9 bg1 full-height"></div>
                    </div>
                </div>
                {/* /VERTICAL MARGIN */}
                {/* SECTION ITEM */}
                <div className="line row line-thank-you">
                    {/* Margin Collums (necessary for the timeline effect) */}
                    <div
                        style={{ height: this.state.height_ThankYou }}
                        className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                    <div
                        style={{ height: this.state.height_ThankYou }}
                        className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-point "></div>
                    {/* /Margin Collums */}
                    {/* Item Content */}
                    <div
                        ref={refThankYou => this.refThankYou = refThankYou}
                        className="col-md-8 content-wrap bg1">
                        <div className="line-content">
                            {/* Subtitle */}
                            <h3 className="thank-you">Thank You!</h3>
                            {/* /Subtitle */}
                        </div>
                    </div>
                    {/* /Item Content */}
                    {/* Margin Collum*/}
                    <div
                        style={{ height: this.state.height_ThankYou }}
                        className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                    {/* / Margin Collum*/}
                </div>
                {/* /SECTION ITEM */}
            </section>
        );
    }
}

export default ThankYou;