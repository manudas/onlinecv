import React, { Component } from 'react';

import { connect } from 'react-redux';

import { translateString } from '../../helpers/translations';

import './work_experience.css';

class WorkExperience extends Component {
    renderWorkExperienceItem(work_experience_item, index) {
        const company = work_experience_item.company_url ? (
            <a
                href={work_experience_item.company_url}
                target="_blank"
                title={
                    work_experience_item.company
                        ? work_experience_item.company
                        : 'company_name'
                }
            >
                {work_experience_item.company
                    ? work_experience_item.company
                    : 'company_name'}
            </a>
        ) : work_experience_item.company ? (
            work_experience_item.company
        ) : (
            'company_name'
        );

        const options = { year: 'numeric', month: 'short' };
        let starting_date_string = null;
        if (work_experience_item.start_date) {
            const starting_date = new Date(
                work_experience_item.start_date
            );
            starting_date_string =
                starting_date.toLocaleDateString(
                    this.language,
                    options
                );
        } else {
            starting_date_string = 'starting_date';
        }

        let finishing_date_string = null;
        if (work_experience_item.finish_date) {
            const finishing_date = new Date(
                work_experience_item.finish_date
            );
            finishing_date_string =
                finishing_date.toLocaleDateString(
                    this.language,
                    options
                );
        } else {
            finishing_date_string = translateString(
                'current',
                this
            );
        }

        /* SECTION ITEM */
        return (
            <div key={index} className="line row d-flex">
                {/* Margin Colums (necessary for the timeline effect) */}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                <div className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-work " />
                {/* Margin Colums */}
                {/* Item Content */}
                <div className="col-md-8 content-wrap bg1">
                    <div className="line-content line-content-education">
                        {/* Work Place */}
                        <h3 className="section-item-title-1">
                            {company}
                        </h3>
                        {/* work place */}
                        {/* Graduation time */}
                        <h4 className="job">
                            <i className="fa fa-flag" />{' '}
                            {work_experience_item.position}
                            {' - '}
                            <span className="job-date">
                                {starting_date_string}
                                {' - '}
                                {finishing_date_string}
                            </span>
                        </h4>
                        {/* Graduation time */}
                        {/* content */}
                        <div className="job-description">
                            <p
                                className="text-justify"
                                dangerouslySetInnerHTML={{
                                    __html: work_experience_item.description
                                        ? work_experience_item.description
                                        : 'WORK EXPERIENCE DESCRIPTION'
                                }}
                            />
                        </div>
                        {/* /Content */}
                    </div>
                </div>
                {/* Item Content */}
                {/* Margin Collum */}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                {/* Margin Collum */}
            </div>
        );
        /* SECTION ITEM */
    }

    renderWorkExperienceItems() {
        if (!this.props.professional_experience) {
            return null;
        } else {
            return this.props.professional_experience.map(
                (professional_experience, index) => {
                    return this.renderWorkExperienceItem(
                        professional_experience,
                        index
                    );
                }
            );
        }
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
                    {/* /Section title */}
                </div>
                {/* Item Content */}
                {/* Margin Collum*/}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                {/* Margin Collum*/}
            </div>
            /* SECTION TITLE */
        ];
    }

    render() {
        if (!this.props.professional_experience) {
            return null;
        }
        /* ====>> SECTION: WORK EXPERIENCE <<====*/
        return (
            <section
                ref={this.props.reference}
                className="timeline work-experience"
                id="works"
            >
                {this.renderTitle()}
                {this.renderWorkExperienceItems()}
            </section>
        );
        /* ==>> /SECTION: WORK EXPERIENCE <<==== */
    }
}

function mapStateToProps(state) {
    const data = state && state.data ? state.data : null;
    const professional_experience =
        data && data.work_experience
            ? data.work_experience
            : null;
    const language =
        state && state.language ? state.language : null;
    const translations = data?.translations?.[language]?.[
        'WorkExperience'
    ]
        ? data.translations[language]['WorkExperience']
        : null;
    return {
        professional_experience: professional_experience,
        language: language,
        translations: translations
    };
}

export default connect(mapStateToProps)(WorkExperience);
