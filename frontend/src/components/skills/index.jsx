
import React, { Component } from 'react';
import { connect } from 'react-redux';

import TimeLineItem from 'components/timeLineItem';
import { clasifyByType } from 'helpers/sortingElements';
import { translateString } from 'helpers/translations';

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
                            { skillLevel }% { translateString('Complete', this) }
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
            <TimeLineItem key={indexGroup.toString()} type="skill">
                    <div className="line-content">
                        {/* Subtitle */}
                        <h3 className="section-item-title-1">
                            { translateString(`${indexGroup} skills`, this) }
                        </h3>
                        {/* /Subtitle */}
                        {/* content */}
                        <ul className="skills-list">
                            {/* item-list */}
                            {
                                skillGroup.map((skill, index) => this.renderSkillItem(skill, index))
                            }
                            {/* item list */}
                        </ul>
                        {/* /Content */}
                    </div>
            </TimeLineItem>
        );
    }

    renderTitle = () => <TimeLineHeader name={this.props.name} />

    render() {
        if (!Object.keys(this.props.skills)?.length) return null;
        /* ====>> SECTION: SKILLS <<====*/
        return (
            <section
                ref={this.props.reference}
                className="timeline skills"
                id="skills"
            >
                { this.renderTitle() }
                {
                    Object.entries(this.props.skills).map(([groupIndex, skillGroup]) =>
                        this.renderSkillGroup(skillGroup, groupIndex)
                    )
                }
            </section>
        );
        /* ==>> /SECTION: SKILLS */
    }
}

function mapStateToProps(state) {
    const skills = state?.data?.resume?.skills
    const language = state?.data?.language
    const translations = state?.data?.translations?.[language]?.['Skills']

    return {
        skills: skills ? clasifyByType(skills) : [],
        translations,
        language
    };
}

export default connect(mapStateToProps)(Skills);
