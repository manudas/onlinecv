import React, { Component } from 'react';

import { connect } from 'react-redux';

import './skills.css';

class Skill extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height_title1: 0,
            height_title2: 0,
            height_skillItem: null
        };
    }

    componentDidMount() {
        const height_titleRef1 = this.titleRef1.clientHeight;
        const height_titleRef2 = this.titleRef2.clientHeight;
        let height_skillItem = [];
        if (this.skillItem) {
            this.skillItem.map(
                (skill_ref, index) => {
                    height_skillItem[index] = skill_ref.clientHeight;
                });
        } else {
            height_skillItem = null;
        }
        this.setState({
            height_title1: height_titleRef1,
            height_title2: height_titleRef2,
            height_skillItem
        });
    }

    renderSkillItem(skill_item, index) {
        /* SECTION ITEM */
        return (
            <div className="line row">
                {/* Margin Collums (necessary for the timeline effect) */}
                <div 
                style={{ height: this.state.height_skillItem[index] }}
                className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                <div 
                style={{ height: this.state.height_skillItem[index] }}
                className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-point "></div>
                {/* / Margin Collums */}
                {/* Item Content */}
                <div 
                ref={skillItem => this.skillItem[index] = skillItem}
                className="col-md-8 content-wrap bg1">
                    <div className="line-content">
                        {/* Subtitle */}
                        <h3 className="section-item-title-1">Professional Skills</h3>
                        {/* /Subtitle */}
                        {/* content */}
                        <ul className="skills-list">
                            {/* item-list */}
                            <li>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" data-percent="70%" style="width: 70%;">
                                        <span className="sr-only">70% Complete</span>
                                    </div>
                                    <span className="progress-type">Comunication</span>
                                    <span className="progress-completed">70%</span>
                                </div>
                            </li>
                            {/* /item list */}
                            {/* item-list */}
                            <li>
                                <div className="progress">
                                    <div className="progress-bar progress-bar-2" role="progressbar" data-percent="90%" style="width: 90%;">
                                        <span className="sr-only">90% Complete</span>
                                    </div>
                                    <span className="progress-type">Leadership</span>
                                    <span className="progress-completed">90%</span>
                                </div>
                            </li>
                            {/* /item list */}
                            {/* item-list */}
                            <li>
                                <div className="progress" title="Doing my best!">
                                    <div className="progress-bar progress-bar-3" role="progressbar" data-percent="85%" style="width: 85%;">
                                        <span className="sr-only">85% Complete</span>
                                    </div>
                                    <span className="progress-type">Confidence</span>
                                    <span className="progress-completed">85%</span>
                                </div>
                            </li>
                        {/* /item list */}
                        </ul>
                    {/* /Content */}
                    </div>
                </div>
                {/* /Item Content */}
                {/* Margin Collum*/}
                <div 
                style={{ height: this.state.height_skillItem[index] }}
                className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
            {/* /Margin Collum*/}
            </div>
        );
        /* /SECTION ITEM */
    }

    renderSkillItems() {
        if (!this.props.skills) {
            return null;
        } else {
            return (
                this.props.skills.map((skill, index) => {
                    return this.renderSkillItem(skill, index)
                })
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
                </div> ,
                /* /VERTICAL MARGIN */
                /* SECTION TITLE */
                <div key='2' className="line row">
                    {/* VERTICAL MARGIN (necessary for the timeline effect) */}
                    <div 
                    style={{ height: this.state.height_title2 }}
                    className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                    <div 
                    style={{ height: this.state.height_title2 }}
                    className="col-md-2 timeline-progress hidden-sm hidden-xs timeline-title full-height"></div>
                    {/* /VERTICAL MARGIN (necessary for the timeline effect) */}
                    {/* Item Content */}
                    <div 
                    ref={titleRef2 => this.titleRef2 = titleRef2}
                    className="col-md-8 content-wrap bg1">
                        {/* Section title */}
                        <h2 className="section-title">Skills</h2>
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
        /* ====>> SECTION: SKILLS <<====*/
        return (
            <section className="timeline skills" id="skills">
                {this.renderTitle()}
                {this.renderSkillItems()}
            </section>
        );
        /* ==>> /SECTION: SKILLS */
    }
}

function mapStateToProps(state) {
    return {
        computer_knowledge: state.computer_knowledge,
        knowledge: state.knowledge,
        languages: state.languages
    };
}
  
export default connect(mapStateToProps)(Skill);