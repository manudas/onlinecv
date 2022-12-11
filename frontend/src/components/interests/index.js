import React, { Component } from "react";

import { connect } from "react-redux";

class Interest extends Component {

    renderInterestItem(interest_item, index) {
        /* SECTION ITEM */
        return (
            <div key={index} className="line row d-flex">
                {/* Margin Collums (necessary for the timeline effect) */}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                <div className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-point " />
                {/* Margin Collums */}
                {/* Item Content */}
                <div className="col-md-8 content-wrap bg1">
                    <div className="line-content">
                        {/* Subtitle */}
                        <h3 className="section-item-title-1">
                            {interest_item.name
                                ? interest_item.name
                                : "INTEREST_NAME"}
                        </h3>
                        {/* Subtitle */}
                        {/* content */}
                        <p
                            className="text-justify"
                            dangerouslySetInnerHTML={{
                                __html: interest_item.description
                                    ? interest_item.description
                                    : "INTEREST / HOBBIE DESCRIPTION"
                            }}
                        />
                        {/* Content */}
                    </div>
                </div>
                {/* Item Content */}
                {/* Margin Collum*/}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                {/* Margin Collum*/}
            </div>
        );
        /* /SECTION ITEM */
    }

    renderInterestItems() {
        if (!this.props.interests) {
            return null;
        } else {
            return this.props.interests.map((interest_item, index) => {
                return this.renderInterestItem(interest_item, index);
            });
        }
    }

    renderTitle() {
        return [
            /* VERTICAL MARGIN (necessary for the timeline effect) */
            <div key="1" className="line row timeline-margin content-wrap">
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                <div className="col-md-2 timeline-progress hidden-sm hidden-xs full-height" />
                <div className="col-md-9 bg1 full-height" />
            </div>,
            /* VERTICAL MARGIN */
            /* SECTION TITLE */
            <div key="2" className="line row d-flex">
                {/* Margin Collums (necessary for the timeline effect) */}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                <div className="col-md-2 timeline-progress hidden-sm hidden-xs timeline-title full-height" />
                {/* Margin Collums */}
                {/* Item Content */}
                <div className="col-md-8 content-wrap bg1">
                    {/* Section title */}
                    <h2 className="section-title">
                        {this.props.name}
                    </h2>
                    {/* Section title */}
                </div>
                {/* Item Content */}
                {/* Margin Collum */}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                {/* Margin Collum */}
            </div>
            /* SECTION TITLE */
        ];
    }

    render() {
        if (!this.props.interests) {
            return null;
        }
        /* ====>> SECTION: INTERESTS <<==== */
        return (
            <section ref={ this.props.reference } className="timeline" id="interests">
                {this.renderTitle()}
                {this.renderInterestItems()}
            </section>
        );
        /* ==>> SECTION: INTERESTS */
    }
}

function mapStateToProps(state) {
    const data = state && state.data ? state.data : null;
    const interests = data && data.interests ? data.interests : null;

    return {
        interests: interests,
    };
}

export default connect(mapStateToProps)(Interest);
