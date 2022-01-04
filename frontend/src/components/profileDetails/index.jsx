import React, { Component } from "react";

import { connect } from "react-redux";

import "./profileDetails.css";

class ProfileDetail extends Component {

    notRenderableColumns = [
        'profileimage',
        'keywords',
        'language',
    ];

    renderProfileDetailItem(profile_detail_key, profile_detail_value, index) {
        if (!profile_detail_value || this.notRenderableColumns.includes(profile_detail_key.toLowerCase())) return null;
        /* SECTION ITEM */
        return (
            <div className="line row d-flex" key={index}>
                {/* Margin Columns (necessary for the timeline effect) */}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                <div className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-point " />
                {/* /Margin Columns */}
                {/* Item Content */}
                <div className="col-md-8 content-wrap bg1">
                    <div className="line-content">
                        {/* Subtitle */}
                        <h3 className="section-item-title-1">
                            {profile_detail_key}
                        </h3>
                        {/* /Subtitle */}
                        {/* content */}
                        <p>{profile_detail_value}</p>
                        {/* /Content */}
                    </div>
                </div>
                {/* /Item Content */}
                {/* Margin Column */}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                {/* /Margin Column */}
            </div>
        );
        /* /SECTION ITEM */
    }

    renderProfileDetailsItems() {
        if (!this.props.profile_details) {
            return null;
        } else {
            return Object.entries(this.props.profile_details).map(
                ([ profile_detail_key, profile_detail_value ], index) => {
                    return this.renderProfileDetailItem(
                        profile_detail_key,
                        profile_detail_value,
                        index
                    );
                }
            );
        }
    }

    renderTitle() {

        return (
            /* VERTICAL MARGIN (necessary for the timeline effect) */
            [
                <div key="1" className="line row timeline-margin content-wrap">
                    <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                    <div className="col-md-2 timeline-progress hidden-sm hidden-xs full-height" />
                    <div className="col-md-9 bg1 full-height" />
                </div>,
                /* /VERTICAL MARGIN */
                /* SECTION TITLE */
                <div key="2" className="line row d-flex">
                    {/* Margin Collums (necessary for the timeline effect) */}
                    <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                    <div className="col-md-2 timeline-progress hidden-sm hidden-xs timeline-title full-height" />
                    {/* /Margin Collums */}
                    {/* Item Content */}
                    <div className="col-md-8 content-wrap bg1">
                        {/* Section title */}
                        <h2 className="section-title">
                            {this.props.name}
                        </h2>
                        {/* Section title */}
                    </div>
                    {/* /Item Content */}
                    {/* Margin Collum*/}
                    <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                    {/* Margin Collum*/}
                </div>
            ]
            /* /SECTION TITLE */
        );
    }

    renderSocialNetworks() {
        if (!this.props.social_networks) {
            return null;
        } else {
            /* SECTION ITEM */
            return (
                <div className="line row d-flex">
                    {/* Margin Collums (necessary for the timeline effect) */}
                    <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                    <div className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-point " />
                    {/* Margin Collums (necessary for the timeline effect) */}
                    {/* Item Content */}
                    <div className="col-md-8 content-wrap bg1">
                        <div className="line-content">
                            {/* Subtitle */}
                            <h3 className="section-item-title-1">Find Me On</h3>
                            {/* Subtitle */}
                            {/* content */}

                            {this.props.social_networks.map(
                                (social_networks_item, index) => {
                                    return this.renderSocialNetworkItem(
                                        social_networks_item,
                                        index
                                    );
                                }
                            )}

                            {/* Content */}
                        </div>
                    </div>
                    {/* Item Content */}
                    {/* Margin Collum */}
                    <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                    {/* Margin Collum */}
                </div>
            );
            /* /SECTION ITEM */
        }
    }

    renderSocialNetworkItem(item, index) {
        return (
            <a
                href={item.url}
                className="btn btn-default"
                key={index}
                title={item.name + ". " + item.type + ": " + item.description}
                target="_blank">
                <i className={item.icon} />
            </a>
        );
    }

    render() {
        if (!this.props.profile_details && !this.props.social_networks) {
            return null;
        }
        /* ====>> SECTION: PROFILE INFOS <<====*/
        return (
            <section ref={ this.props.reference } className="timeline profile-infos">
                {this.renderTitle()}
                {this.renderProfileDetailsItems()}
                {this.renderSocialNetworks()}
            </section>
        );
        /* ==>> /SECTION: PROFILE INFOS */
    }
}

function mapStateToProps(state) {
    const {
        data: {
            resume: {
                details
            } = {},
            social_networks,
        } = {}
    } = state;

    return {
        profile_details: details,
        social_networks,
    };
}

export default connect(mapStateToProps)(ProfileDetail);
