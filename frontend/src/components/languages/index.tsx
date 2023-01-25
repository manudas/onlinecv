
import React, { Component } from 'react';
import { connect } from 'react-redux';

import TimeLineItem from 'components/timeLineItem';
import { translateString } from 'helpers/translations';

import TimeLineHeader from '../timeLineHeader';

import { PropDef, Language } from './types';

import './languages.scss';

class Languages extends Component<PropDef> {
    renderLanguageData(language: Language, index: string) {
        /* we have three diferent kinds of progress bar
         * and depending on its index we will assign
         * one or another
         */
        const {
            name,
            certification,
            school,
            school_url,
            written_level,
            spoken_level,
        } = language

        const schoolIcon = <i className="fa fa-university"></i>
        const schoolData = school && school_url ? (
            <>
                { schoolIcon }
                <a
                    rel="noreferrer"
                    href={school_url}
                    target="_blank"
                    title={school}
                    className={'text-decoration-none'}
                >
                    { ` ${school} ↗` }
                </a>
            </>
        ) : (
            school ? <>{ schoolIcon }{ ` ${school}` }</> : null
        )

        const progressBarTypeR = (Number(index) + 1) % 3;
        const progressBarTypeW = (Number(index) + 2) % 3;
        // level is from 0 to 10 in server and to 100 in frontend
        const spokenLevel = spoken_level ? spoken_level * 10.0 : null
        const writtenLevel = written_level ? written_level * 10.0 : null

        /* SECTION ITEM */
        return (
            <div className="line-content">
                        {/* Subtitle */}
                        <h3 className="section-item-title-1">
                            { name }
                        </h3>
                        {/* /Subtitle */}
                        {/* content */}
                        {
                            certification
                                ? <h4 className="certification">
                                    <i className="fa fa-book" aria-hidden="true"></i>
                                    { ` ${translateString('Certification: ', this)}` } <span className="certification-level" >{ certification }</span>
                                </h4>
                                : null
                        }
                        <ul className="list">
                            {/* item-list */}
                            <li key={index}>
                                { schoolData ? <h3 className="section-item-title-1"> { schoolData } </h3> : null }
                                {
                                    spokenLevel
                                        ? <div
                                            className="progress"
                                            title={`${name}`}
                                        >
                                            <div
                                                className={`progress-bar progress-bar-${progressBarTypeR}`}
                                                role="progressbar"
                                                data-percent={`${spokenLevel}%`}
                                                style={{ width: `${spokenLevel}%` }}
                                            >
                                                <span className="sr-only">
                                                    { spokenLevel }% { translateString('Complete', this) }
                                                </span>
                                            </div>
                                            <span className="progress-type">
                                                { translateString('Spoken', this) }
                                            </span>
                                            <span className="progress-completed">
                                                {spokenLevel}%
                                            </span>
                                        </div>
                                        : null
                                }
                                {
                                    writtenLevel
                                        ? <div
                                            className="progress"
                                            title={`${name}`}
                                        >
                                            <div
                                                className={`progress-bar progress-bar-${progressBarTypeW}`}
                                                role="progressbar"
                                                data-percent={`${writtenLevel}%`}
                                                style={{ width: `${writtenLevel}%` }}
                                            >
                                                <span className="sr-only">
                                                    { writtenLevel }% { translateString('Complete', this) }
                                                </span>
                                            </div>
                                            <span className="progress-type">
                                                { translateString('Written', this) }
                                            </span>
                                            <span className="progress-completed">
                                                {writtenLevel}%
                                            </span>
                                        </div>
                                        : null
                                }
                            </li>
                            {/* item list */}
                        </ul>
                {/* /Content */}
            </div>
        );
        /* SECTION ITEM */
    }

    renderLanguage(lang: Language, index: string) {
        return (
            <TimeLineItem key={index} type="languages" className="languages-subsection">
            {
                this.renderLanguageData(lang, index)
            }
            </TimeLineItem>
        );
    }

    renderTitle() {
        if (!Object.keys(this.props.languages)?.length) return null;
        return <TimeLineHeader name={this.props.name} />
    }

    render() {
        if (!Object.keys(this.props.languages)?.length) return null;
        /* ====>> SECTION: LANGUAGES <<====*/
        return (
            <section
                ref={this.props.reference}
                className="timeline languages"
                id="languages"
            >
                { this.renderTitle() }
                {
                    Object.entries(this.props.languages).map(([index, lang]) =>
                        this.renderLanguage(lang, index)
                    )
                }
            </section>
        );
        /* ==>> /SECTION: LANGUAGES */
    }
}

function mapStateToProps(state: {
    data: {
        resume: {
            languages: Language[]
        }
    },
    language: string,
    translations: Record<string, any>
}) {
    const {
        data: {
            resume: {
                languages = []
            } = {}
        } = {},
        language,
        translations: {
            [language]: { Languages = null } = {}
        } = {}
    } = state;

    return {
        languages,
        translations: Languages,
        language
    };
}

export default connect(mapStateToProps)(Languages);
