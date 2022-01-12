import React, { Component } from 'react';

import { connect } from 'react-redux';
import { sortElementsByTypeAndOrder } from '../../helpers/sortingElements';

import { translateString } from '../../helpers/translations';

import './training.css';

class Training extends Component {
    renderTrainingItem(training, index) {
        /* SECTION ITEM */
        let finish_date_string;
        if (training.finish_date) {
        const finish_date = new Date(training.finish_date);
        const options = { year: 'numeric', month: 'short' };
        finish_date_string =
            finish_date.toLocaleDateString(
                this.language,
                options
            );
        } else {
            finish_date_string = translateString('current', this);
        }
        const school_name = training.school ?? '';
        const school = training.school_url ? (
            <a
                rel="noreferrer"
                href={training.school_url}
                target="_blank"
                title={school_name}
            >
                {school_name}
                <span className={'text-decoration-none d-inline-block ms-1'}>🡕</span>
            </a>
        ) : school_name;

        return (
            <div key={index} className="line row d-flex">
                {/* Margin Collums (necessary for the timeline effect) */}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                <div className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-education " />
                {/* /Margin Collums */}
                {/* Item Content */}
                <div className="col-md-8 content-wrap bg1">
                    <div className="line-content line-content-training">
                        {/* Graduation title */}
                        <h3 className="section-item-title-1">
                            {training.tag ?? null}
                        </h3>
                        {/* /Graduation title */}
                        {/* Graduation time */}
                        <h4 className="graduation-time">
                            <i className="fa fa-university" />{' '}
                            {school}
                            {school ? ' - ' : null}
                            <span className="graduation-date">
                                {translateString(
                                    'graduation',
                                    this
                                )}
                                {' ' + finish_date_string}
                            </span>
                        </h4>
                        {/* /Graduation time */}
                        {/* content */}
                        <div className="graduation-description">
                            <p className="text-justify">
                                {training.description ?? null}
                                {training.description && training.final_project ? '. ': null}
                                {training.final_project ? `. ${translateString('final_project', this)}: `: null}
                                {training.final_project ?? null}
                            </p>
                        </div>
                        {training.average_grade
                            ?
                                <div>
                                    <p>
                                        <span>
                                            {`${translateString('average_grade', this)}: `}
                                        </span>
                                        <strong>
                                            {`${training.average_grade}/10`}
                                        </strong>
                                    </p>
                                </div>
                            : null
                        }
                        {/* /Content */}
                    </div>
                </div>
                {/* /Item Content */}
                {/* Margin Collum */}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                {/* /Margin Collum */}
            </div>
        );
        /* /SECTION ITEM */
    }

    renderRegulatedTrainingItems() {
        if (!this.props.training) {
            return null;
        } else {
            return this.props.training.map(
                (training_item, index) => {
                    return this.renderTrainingItem(
                        training_item,
                        index
                    );
                }
            );
        }
    }

    renderTitle() {
        if (!this.props.training) {
            return null;
        }

        /* Margin (necessary for the timeline effect) */
        return [
            <div
                key="1"
                className="line row timeline-margin content-wrap"
            >
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                <div className="col-md-2 timeline-progress hidden-sm hidden-xs full-height" />
                <div className="col-md-9 bg1 full-height" />
            </div>,
            /* /Margin */
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
                {/* /Item Content */}
                {/* Margin Collum*/}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                {/* /Margin Collum*/}
            </div>
        ];
        /* /SECTION TITLE */
    }

    render() {
        if (!this.props.training) {
            return null;
        }
        /* ====>> SECTION: TRAINING <<====*/
        return (
            <section
                ref={this.props.reference}
                className="timeline training"
                id="training"
            >
                {this.renderTitle()}
                {this.renderRegulatedTrainingItems()}
            </section>
        );
        /* ==>> /SECTION: TRAINING <<==== */
    }
}

function mapStateToProps(state) {
    const {
        data: {
            resume: { trainings, trainingTypes } = {}
        } = {},
        language,
        translations: { [language]: { Training } = {} } = {}
    } = state;

    return {
        training: sortElementsByTypeAndOrder(
            trainings,
            trainingTypes
        ),
        translations: Training,
        language
    };
}

export default connect(mapStateToProps)(Training);
