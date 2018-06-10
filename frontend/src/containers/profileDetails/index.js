import React, { Component } from 'react';

import { connect } from 'react-redux';

// import './profileDetails.css';

class ProfileDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height_socialNetwork: 0,
            height_title1: 0,
            height_title2: 0,
            height_ProfileDetailItem: null
        };
    }


    componentDidMount() {
        // const height = this.divElement.clientHeight;
        // this.setState({ height });
        /*
            socialNetworkRef
            titleRef1
            titleRef2
            ProfileDetailItem[]
        */
        const height_socialNetworkRef = this.socialNetworkRef.clientHeight;
        const height_titleRef1 = this.titleRef1.clientHeight;
        const height_titleRef2 = this.titleRef2.clientHeight;
        let height_ProfileDetailItem = [];
        if (this.ProfileDetailItem) {
            this.ProfileDetailItem.map(
                (profile_details_ref, index) => {
                    height_ProfileDetailItem[index] = profile_details_ref.clientHeight;
                });
        } else {
            height_ProfileDetailItem = null;
        }
        this.setState({
            height_socialNetwork: height_socialNetworkRef,
            height_title1: height_titleRef1,
            height_title2: height_titleRef2,
            height_ProfileDetailItem
        });
    }

    renderProfileDetailItem(profile_detail_item, index) {
        /* SECTION ITEM */
        return (
            <div className="line row">
                {/* Margin Collums (necessary for the timeline effect) */}
                <div
                    style={{ height: this.state.height_ProfileDetailItem[index] }}
                    className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                <div
                    style={{ height: this.state.height_ProfileDetailItem[index] }}
                    className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-point "></div>
                {/* /Margin Collums */}
                {/* Item Content */}
                <div
                    ref={profileDetailItem => this.profileDetailItem[index] = profileDetailItem}
                    className="col-md-8 content-wrap bg1">
                    <div className="line-content">
                        {/* Subtitle */}
                        <h3 className="section-item-title-1">Full Name</h3>
                        {/* /Subtitle */}
                        {/* content */}
                        <p>john@dotrex.co</p>
                        {/* /Content */}
                    </div>
                </div>
                {/* /Item Content */}
                {/* Margin Collum*/}
                <div
                    style={{ height: this.state.height_ProfileDetailItem[index] }}
                    className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                {/* /Margin Collum*/}
            </div>
        );
        /* /SECTION ITEM */
    }

    renderProfileDetailsItems() {
        if (!this.props.profile_details) {
            return null;
        } else {
            return (
                this.props.profile_details.map((profile_detail_item, index) => {
                    return this.renderProfileDetailItem(profile_detail_item, index);
                })
            );
        }
    }

    renderTitle() {
        return (
            /* VERTICAL MARGIN (necessary for the timeline effect) */
            [
                <div key='1' className="line row timeline-margin">
                    <div
                        ref={titleRef1 => this.titleRef1 = titleRef1}
                        className="content-wrap">
                        <div
                            style={{ height: this.state.height_title1 }}
                            className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                        <div
                            style={{ height: this.state.height_title1 }}
                            className="col-md-2 timeline-progress hidden-sm hidden-xs full-height"></div>
                        <div
                            style={{ height: this.state.height_title1 }}
                            className="col-md-9 bg1 full-height"></div>
                    </div>
                </div>,
                /* /VERTICAL MARGIN */
                /* SECTION TITLE */
                <div key='2' className="line row">
                    {/* Margin Collums (necessary for the timeline effect) */}
                    <div
                        style={{ height: this.state.height_title2 }}
                        className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                    <div
                        style={{ height: this.state.height_title2 }}
                        className="col-md-2 timeline-progress hidden-sm hidden-xs timeline-title full-height">
                    </div>
                    {/* /Margin Collums */}
                    {/* Item Content */}
                    <div
                        ref={titleRef2 => this.titleRef2 = titleRef2}
                        className="col-md-8 content-wrap bg1">
                        {/* Section title */}
                        <h2 className="section-title">Profile</h2>
                        {/* /Section title */}
                    </div>
                    {/* /Item Content */}
                    {/* Margin Collum*/}
                    <div
                        style={{ height: this.state.height_title2 }}
                        className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                    {/* / Margin Collum*/}
                </div>
            ]
            /* /SECTION TITLE */
        );
    }

    renderSocialNetworks() {
        /* SECTION ITEM */
        return (
            <div className="line row">
                {/* Margin Collums (necessary for the timeline effect) */}
                <div
                    style={{ height: this.state.height_socialNetwork }}
                    className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                <div
                    style={{ height: this.state.height_socialNetwork }}
                    className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-point "></div>
                {/* Margin Collums (necessary for the timeline effect) */}
                {/* Item Content */}
                <div
                    ref={socialNetworkRef => this.socialNetworkRef = socialNetworkRef}
                    className="col-md-8 content-wrap bg1">
                    <div className="line-content">
                        {/* Subtitle */}
                        <h3 className="section-item-title-1">Find Me On</h3>
                        {/* /Subtitle */}
                        {/* content */}
                        añadir metodo que simplifique la impresion de enlaces de redes sociales
                        <a href="#" className="btn btn-default"><i className="fa fa-facebook"></i></a>
                        <a href="#" className="btn btn-default"><i className="fa fa-twitter"></i></a>
                        <a href="#" className="btn btn-default"><i className="fa fa-linkedin"></i></a>
                        <a href="#" className="btn btn-default"><i className="fa fa-link"></i></a>
                        <a href="#" className="btn btn-default"><i className="fa fa-paper-plane-o"></i></a>
                        {/* /Content */}
                    </div>
                </div>
                {/* /Item Content */}
                {/* Margin Collum */}
                <div
                    style={{ height: this.state.height_socialNetwork }}
                    className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                {/* /Margin Collum */}
            </div>
        );
        /* /SECTION ITEM */
    }

    render() {
        /* ====>> SECTION: PROFILE INFOS <<====*/
        return (
            <section className="timeline profile-infos">
                {this.renderTitle()}
                {this.renderProfileDetailsItems()}
                {this.renderSocialNetworks()}
            </section>
        );
        /* ==>> /SECTION: PROFILE INFOS */
    }
}

function mapStateToProps(state) {
    return {
        profile_details: state.details
    };
}

export default connect(mapStateToProps)(ProfileDetail);