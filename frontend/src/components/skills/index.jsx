import React, { Component } from 'react';

import { connect } from 'react-redux';

import { translateString } from '../../helpers/translations';

import './skills.css';

class Skill extends Component {
    renderSkillItem(skill_item, index) {
        /* we have three diferent kinds of progress bar
         * and depending on its index we will assing
         * one or another
         */

        const progressBarType = (index + 1) % 3;
        const skillLevel = skill_item.skill_level
            ? skill_item.skill_level
            : 'NO DATA ';
        const skillName = skill_item.name
            ? skill_item.name
            : 'NO NAME ';
        const skillDescription = skill_item.description
            ? skill_item.description
            : null;
        /* SECTION ITEM */
        return (
            <li key={index}>
                <div
                    className="progress"
                    title={`${skillDescription}`}
                >
                    <div
                        className={`progress-bar progress-bar-${progressBarType}`}
                        role="progressbar"
                        data-percent={`${skillLevel}%`}
                        style={{ width: `${skillLevel}%` }}
                    >
                        <span className="sr-only">
                            {skillLevel}% Complete
                        </span>
                    </div>
                    <span className="progress-type">
                        {skillName}
                    </span>
                    <span className="progress-completed">
                        {skillLevel}%
                    </span>
                </div>
            </li>
        );
        /* SECTION ITEM */
    }

    renderSkillItems(element, index) {
        return (
            <div
                key={element._id}
                className="line row d-flex"
            >
                {/* Margin Collums (necessary for the timeline effect) */}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                <div className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-point " />
                {/* / Margin Collums */}
                {/* Item Content */}
                <div className="col-md-8 content-wrap bg1">
                    <div className="line-content">
                        {/* Subtitle */}
                        <h3 className="section-item-title-1">
                            {element._id}{' '}
                            {translateString('skills', this)}
                        </h3>
                        {/* /Subtitle */}
                        {/* content */}
                        <ul className="skills-list">
                            {/* item-list */}
                            {element.value.map(
                                (skill, index) =>
                                    this.renderSkillItem(
                                        skill,
                                        index
                                    )
                            )}
                            {/* item list */}
                        </ul>
                        {/* /Content */}
                    </div>
                </div>
                {/* /Item Content */}
                {/* Margin Collum*/}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                {/* /Margin Collum*/}
            </div>
        );
    }

    renderTitle() {
        return [
            /* VERTICAL MARGIN (necessary for the timeline effect) */
            <div
                key="1"
                className="line row timeline-margin content-wrap"
            >
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                <div className="col-md-2 timeline-progress hidden-sm hidden-xs full-height" />
                <div className="col-md-9 bg1 full-height" />
            </div>,
            /* /VERTICAL MARGIN */
            /* SECTION TITLE */
            <div key="2" className="line row d-flex">
                {/* VERTICAL MARGIN (necessary for the timeline effect) */}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                <div className="col-md-2 timeline-progress hidden-sm hidden-xs timeline-title full-height" />
                {/* /VERTICAL MARGIN (necessary for the timeline effect) */}
                {/* Item Content */}
                <div className="col-md-8 content-wrap bg1">
                    {/* Section title */}
                    <h2 className="section-title">
                        {this.props.name}
                    </h2>
                    {/* /Section title */}
                </div>
                {/* /Item Content */}
                {/* Margin Collum*/}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                {/* /Margin Collum*/}
            </div>
            /* /SECTION TITLE */
        ];
    }

    render() {
        if (!this.props.skills) {
            return null;
        }
        /* ====>> SECTION: SKILLS <<====*/
        return (
            <section
                ref={this.props.reference}
                className="timeline skills"
                id="skills"
            >
                {this.renderTitle()}
                {this.props.skills.map((skill, index) =>
                    this.renderSkillItems(skill, index)
                )}
            </section>
        );
        /* ==>> /SECTION: SKILLS */
    }
}

function mapStateToProps(state) {
    const data = state && state.data ? state.data : null;
    const skills = data && data.skills ? data.skills : null;
    const language =
        state && state.language ? state.language : null;
    const translations =
        data &&
        data.translations &&
        data.translations[language] &&
        data.translations[language]['Skill']
            ? data.translations[language]['Skill']
            : null;

    return {
        skills: skills,
        translations: translations,
        language: state.language
    };
}

export default connect(mapStateToProps)(Skill);
