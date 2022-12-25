import { Component } from 'react'

import { connect } from 'react-redux'
import { sortElementsByTypeAndOrder } from '../../helpers/sortingElements'

import { translateString } from '../../helpers/translations'
import TimeLineHeader from '../timeLineHeader'
import TimeLineItem from '../timeLineItem'

import { experience, PropDef } from './types'

import './experience.css'

class Experience extends Component<PropDef> {
    renderExperienceItem(work_experience_item: experience, index: number) {
        const {
            company = '',
            company_url,
            start_date,
            finish_date,
            role,
            description,
            details,
        } = work_experience_item
        const companyData = company_url ? (
            <a
                rel="noreferrer"
                href={company_url}
                target="_blank"
                title={company}
                className={'text-decoration-none'}
            >
                {`${company} ↗`}
            </a>
        ) : (
            company
        )

        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' }
        let starting_date_string = null
        if (start_date) {
            const starting_date = new Date(Number(start_date))
            starting_date_string = starting_date.toLocaleDateString(this.props.language, options)
        }

        let finishing_date_string = null
        if (finish_date) {
            const finishing_date = new Date(Number(finish_date))
            finishing_date_string = finishing_date.toLocaleDateString(this.props.language, options)
        } else {
            finishing_date_string = translateString('current', this)
        }

        /* SECTION ITEM */
        return (
            <TimeLineItem index={index.toString()} type="work">
                <div className="line-content line-content-education">
                    {/* Work Place */}
                    <h3 className="section-item-title-1"> { companyData } </h3>
                    {/* work place */}
                    {/* Graduation time */}
                    <h4 className="job">
                        <i className="fa fa-flag" />{' '}
                        {role}
                        {' - '}
                        <span className="job-date">
                            { starting_date_string }
                            {
                                starting_date_string && finishing_date_string
                                    ? ' - '
                                    : ''
                            }
                            { finishing_date_string }
                        </span>
                    </h4>
                    {/* Graduation time */}
                    {/* content */}
                    <div className="job-description">
                        <p className="text-justify"> { description } </p>
                        {
                            details?.length
                                ? <ul className="text-justify detail-list">
                                    {
                                        details.map(detail =>
                                            <li key={ detail }>{ detail }</li>
                                        )
                                    }
                                </ul>    
                                : null
                        }
                    </div>
                    {/* /Content */}
                </div>
            </TimeLineItem>
        )
        /* SECTION ITEM */
    }

    renderExperienceItems() {
        if (!this.props.experiences?.length) return null
        return this.props.experiences.map((experience, index) => this.renderExperienceItem( experience, index ))
    }

    renderTitle() {
        console.log('eliminar min-height 150 y pensar como clasificar por tipo de trabajo: profesional, ong y otros. Creo que mejor añadir solo tipo de trabajo')
        if (!this.props.experiences?.length) return null
        return <TimeLineHeader name={this.props.name} />
    }

    render() {
        if (!this.props.experiences?.length) return null
        /* ====>> SECTION: WORK EXPERIENCE <<====*/
        return (
            <section
                ref={this.props.reference}
                className="timeline work-experience"
                id="work"
            >
                {this.renderTitle()}
                {this.renderExperienceItems()}
            </section>
        )
        /* ==>> /SECTION: WORK EXPERIENCE <<==== */
    }
}

function mapStateToProps(state: {
    data: {
        resume: {
            experiences: Array<experience>, 
            experienceTypes: Array<string>
        }
    },
    language: string,
    translations: Record<string, Record<string, Array<string>>>
}) {
    const {
        data: {
            resume: { experiences = [], experienceTypes = [] } = {}
        } = {},
        language,
        translations: {
            [language]: { WorkExperience = []} = {}
        } = {}
    } = state
    return {
        experiences: sortElementsByTypeAndOrder(
            experiences,
            experienceTypes
        ),
        language,
        translations: WorkExperience
    }
}

export default connect(mapStateToProps)(Experience)
