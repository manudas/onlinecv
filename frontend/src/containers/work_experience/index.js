import React, { Component } from 'react';

import { connect } from 'react-redux';

import './work_experience.css';

class WorkExperience extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height_title1: 0,
            height_title2: 0,
            height_workExperienceItem: null
        };
    }

    componentDidMount() {
        const height_titleRef1 = this.titleRef1.clientHeight;
        const height_titleRef2 = this.titleRef2.clientHeight;
        let height_workExperienceItem = [];
        if (this.workExperienceItem) {
            this.workExperienceItem.map(
                (work_experience_ref, index) => {
                    height_workExperienceItem[index] = work_experience_ref.clientHeight;
                });
        } else {
            height_workExperienceItem = null;
        }
        this.setState({
            height_title1: height_titleRef1,
            height_title2: height_titleRef2,
            height_workExperienceItem
        });
    }

    renderWorkExperienceItem(work_experience_item, index) {
        /* SECTION ITEM */
        return (
            <div className="line row">
                {/* Margin Collums (necessary for the timeline effect) */}
                <div
                    style={{ height: this.state.height_workExperienceItem[index] }}
                    className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                <div
                    style={{ height: this.state.height_workExperienceItem[index] }}
                    className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-work "></div>
                {/* /Margin Collums */}
                {/* Item Content */}
                <div
                    ref={workExperienceItem => this.workExperienceItem[index] = workExperienceItem}
                    className="col-md-8 content-wrap bg1">
                    <div className="line-content line-content-education">
                        {/* Work Place */}
                        <h3 className="section-item-title-1">Black Tie Corp</h3>
                        {/* /work place */}
                        {/* Graduation time */}
                        <h4 className="job"><i className="fa fa-flag"></i> Web Designer - <span className="job-date">June 2012 - Current</span></h4>
                        {/* /Graduation time */}
                        {/* content */}
                        <div className="job-description">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        {/* /Content */}
                    </div>
                </div>
                {/* /Item Content */}
                {/* Margin Collum*/}
                <div
                    style={{ height: this.state.height_workExperienceItem[index] }}
                    className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                {/* /Margin Collum*/}
            </div>
        );
        /* /SECTION ITEM */
    }

    renderWorkExperienceItems() {
        if (!this.props.work_experience_items) {
            return null;
        } else {
            return (
                this.props.work_experience_items.map(
                    (work_experience_items, index) => { return this.renderWorkExperienceItem(work_experience_items, index) }
                )
            );
        }
    }

    renderTitle() {
        return (
            [
                /* VERTICAL MARGIN (necessary for the timeline effect) */
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
                        className="col-md-2 timeline-progress hidden-sm hidden-xs timeline-title full-height"></div>
                    {/* /Margin Collums */}
                    {/* Item Content */}
                    <div
                        ref={titleRef2 => this.titleRef2 = titleRef2}
                        className="col-md-8 content-wrap bg1">
                        {/* Section title */}
                        <h2 className="section-title">Work Experience</h2>
                        {/* /Section title */}
                    </div>
                    {/* /Item Content */}
                    {/* Margin Collum*/}
                    <div
                        style={{ height: this.state.height_title2 }}
                        className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                    {/* /Margin Collum*/}
                </div>
                /* /SECTION TITLE */
            ]
        );
    }

    render() {
        /* ====>> SECTION: WORK EXPERIENCE <<====*/
        return (
            <section className="timeline work-experience" id="works">
                {this.renderTitle()}
                {this.renderWorkExperienceItems()}
            </section>
        );
        /* ==>> /SECTION: WORK EXPERIENCE <<==== */
    }
}

function mapStateToProps(state) {
    return {
        work_experience_items: state.work_experience
    };
}

export default connect(mapStateToProps)(WorkExperience);