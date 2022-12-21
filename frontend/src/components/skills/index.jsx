import React, { Component } from 'react';

import { connect } from 'react-redux';
import { clasifyByType } from '../../helpers/sortingElements';

import { translateString } from '../../helpers/translations';
import TimeLineHeader from '../timeLineHeader';

import './skills.css';

class Skills extends Component {
    renderSkillItem(skill_item, index) {
        /* we have three diferent kinds of progress bar
         * and depending on its index we will assign
         * one or another
         */

        const progressBarType = (index + 1) % 3;
        // level is from 0 to 10 in server and to 100 in frontend
        const skillLevel = skill_item.skill_level * 10.0;
        const skillName = skill_item.tag;
        const skillDescription = skill_item.description;
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

    renderSkillGroup(skillGroup, indexGroup) {
        return (
            <div
                key={indexGroup}
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
                            'aqui hay que poner el tipo y agruparlos por tipo'
                            {translateString(`${indexGroup} skills`, this)}
                        </h3>
                        {/* /Subtitle */}
                        {/* content */}
                        <ul className="skills-list">
                            {/* item-list */}
                            {
                                skillGroup.map((skill, index) =>
                                    this.renderSkillItem(
                                        skill,
                                        index
                                    )
                                )
                            }
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
        if (!this.props.skills?.length) return null;
        return <TimeLineHeader name={this.props.name} />
    }

    render() {
        if (!Object.keys(this.props.skills)?.length) return null;
        /* ====>> SECTION: SKILLS <<====*/
        return (
            <section
                ref={this.props.reference}
                className="timeline skills"
                id="skills"
            >
                {this.renderTitle()}
                {Object.entries(this.props.skills).map(([groupIndex, skillGroup]) =>
                    this.renderSkillGroup(skillGroup, groupIndex)
                )}
            </section>
        );
        /* ==>> /SECTION: SKILLS */
    }
}

function mapStateToProps(state) {
    const {
        data: {
            resume: {
                skills
            } = {}
        } = {},
        language,
        translations: {
            [language]: { Skills } = {}
        } = {}
    } = state;

    return {
        skills: clasifyByType(skills),
        translations: Skills,
        language
    };
}

export default connect(mapStateToProps)(Skills);
