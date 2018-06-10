import React, { Component } from 'react';

import { connect } from 'react-redux';

class Education extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height_title1: 0,
            height_title2: 0,
            height_educationItem: null
        };
    }

    componentDidMount() {
        /*
            titleRef1
            titleRef2
            educationItem[]
        */
        const height_title1 = this.titleRef1.clientHeight;
        const height_title2 = this.titleRef2.clientHeight;
        let height_educationItem = [];
        if (this.educationItem) {
            this.educationItem.map(
                (education_item_ref, index) => {
                    height_educationItem[index] = education_item_ref.clientHeight;
                });
        } else {
            height_educationItem = null;
        }

        this.setState({
            height_title1: height_title1,
            height_title2: height_title2,
            height_educationItem
        });
    }

    renderEducationItem(education_item, index) {
        /* SECTION ITEM */
        return (
            <div className="line row">
                {/* Margin Collums (necessary for the timeline effect) */}
                <div
                    style={{ height: this.state.height_educationItem[index] }}
                    className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                <div
                    style={{ height: this.state.height_educationItem[index] }}
                    className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-education "></div>
                {/* /Margin Collums */}
                {/* Item Content */}
                <div
                    ref={educationItem => this.educationItem[index] = educationItem}
                    className="col-md-8 content-wrap bg1">
                    <div className="line-content line-content-education">
                        {/* Graduation title */}
                        <h3 className="section-item-title-1">GRAPHIC DESIGN</h3>
                        {/* /Graduation title */}
                        {/* Graduation time */}
                        <h4 className="graduation-time"><i className="fa fa-university"></i> St. Patrick University (2 Years Course) - <span className="graduation-date">Graduation May 2013</span></h4>
                        {/* /Graduation time */}
                        {/* content */}
                        <div className="graduation-description">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        {/* /Content */}
                    </div>
                </div>
                {/* /Item Content */}
                {/* Margin Collum */}
                <div
                    style={{ height: this.state.height_educationItem[index] }}
                    className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                {/* /Margin Collum */}
            </div>
        );
        /* /SECTION ITEM */
    }

    renderEducationItems() {
        if (!this.props.education_items) {
            return null;
        } else {
            return (
                this.props.education_items.map(
                    (education_item, index) => { return this.renderEducationItem(education_item, index) }
                )
            );
        }
    }

    renderTitle() {
        /* Margin (necessary for the timeline effect) */
        return (
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
                /* /Margin */
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
                        <h2 className="section-title">Education</h2>
                        {/* /Section title */}
                    </div>
                    {/* /Item Content */}
                    {/* Margin Collum*/}
                    <div 
                    style={{ height: this.state.height_title2 }}
                    className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                    {/* /Margin Collum*/}
                </div>
            ]
        );
        /* /SECTION TITLE */
    }

    render() {
        /* ====>> SECTION: EDUCATION <<====*/
        return (
            <section className="timeline education" id="education">
                {this.renderTitle()}
                {this.renderEducationItems()}
            </section>
        );
        /* ==>> /SECTION: EDUCATION <<==== */
    }
}

function mapStateToProps(state) {
    return {
        education_items: state.education
    };
}

export default connect(mapStateToProps)(Education);