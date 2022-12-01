import { Component } from 'react';

import { connect } from 'react-redux';
import { sortElementsByTypeAndOrder } from '../../helpers/sortingElements';

import { translateString } from '../../helpers/translations';
import TimeLineHeader from '../timeLineHeader';
import TimeLineItem from '../timeLineItem';

import './work_experience.css';

class WorkExperience extends Component {
    renderWorkExperienceItem(work_experience_item, index) {
        const company_name =
            work_experience_item.company ?? '';
        const company = work_experience_item.company_url ? (
            <a
                rel="noreferrer"
                href={work_experience_item.company_url}
                target="_blank"
                title={company_name}
                className={'text-decoration-none'}
            >
                {`${company_name} 🡕`}
            </a>
        ) : (
            company_name
        );

        const options = { year: 'numeric', month: 'short' };
        let starting_date_string = null;
        if (work_experience_item.start_date) {
            const starting_date = new Date(
                Number(work_experience_item.start_date)
            );
            starting_date_string =
                starting_date.toLocaleDateString(
                    this.language,
                    options
                );
        }

        let finishing_date_string = null;
        if (work_experience_item.finish_date) {
            const finishing_date = new Date(
                Number(work_experience_item.finish_date)
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
            <TimeLineItem key={index} type="work">
                <div className="line-content line-content-education">
                    {/* Work Place */}
                    <h3 className="section-item-title-1">
                        {company}
                    </h3>
                    {/* work place */}
                    {/* Graduation time */}
                    <h4 className="job">
                        <i className="fa fa-flag" />{' '}
                        {work_experience_item.role}
                        {' - '}
                        <span className="job-date">
                            {starting_date_string}
                            {starting_date_string &&
                            finishing_date_string
                                ? ' - '
                                : ''}
                            {finishing_date_string}
                        </span>
                    </h4>
                    {/* Graduation time */}
                    {/* content */}
                    <div className="job-description">
                        <p
                            className="text-justify"
                            dangerouslySetInnerHTML={{
                                __html:
                                    work_experience_item.description ??
                                    null
                            }}
                        />
                    </div>
                    {/* /Content */}
                </div>
            </TimeLineItem>
        );
        /* SECTION ITEM */
    }

    renderWorkExperienceItems() {
        if (!this.props.experiences) {
            return null;
        } else {
            return this.props.experiences.map(
                (experience, index) => {
                    return this.renderWorkExperienceItem(
                        experience,
                        index
                    );
                }
            );
        }
    }

    renderTitle() {
        console.log('eliminar min-height 150 y pensar como clasificar por tipo de trabajo: profesional, ong y otros. Creo que mejor añadir solo tipo de trabajo')
        return <TimeLineHeader name={this.props.name} />
    }

    render() {
        if (!this.props.experiences) {
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
    const {
        data: {
            resume: { experiences, experienceTypes } = {}
        } = {},
        language,
        translations: {
            [language]: { WorkExperience } = {}
        } = {}
    } = state;
    return {
        experiences: sortElementsByTypeAndOrder(
            experiences,
            experienceTypes
        ),
        language,
        translations: WorkExperience
    };
}

export default connect(mapStateToProps)(WorkExperience);
