import React, { Component } from 'react';

import { connect } from 'react-redux';

import { translateString } from '../../helpers/translations';

import './regulatedTraining.css';

class RegulatedTraining extends Component {
    renderTrainingItem(regulated_training, index) {
        /* SECTION ITEM */
        const finish_date = new Date(
            regulated_training.finish_date
        );
        const options = { year: 'numeric', month: 'short' };
        const finish_date_string =
            finish_date.toLocaleDateString(
                this.language,
                options
            );

        const school = regulated_training.school_url ? (
            <a
                href={regulated_training.school_url}
                target="_blank"
                title={
                    regulated_training.school
                        ? regulated_training.school
                        : 'school'
                }
            >
                {regulated_training.school
                    ? regulated_training.school
                    : 'school'}
            </a>
        ) : regulated_training.school ? (
            regulated_training.school
        ) : (
            'school'
        );

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
                            {regulated_training.name
                                ? regulated_training.name
                                : 'name'}
                        </h3>
                        {/* /Graduation title */}
                        {/* Graduation time */}
                        <h4 className="graduation-time">
                            <i className="fa fa-university" />{' '}
                            {school}
                            {' - '}
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
                                {regulated_training.description
                                    ? regulated_training.description
                                    : ''}
                                {regulated_training.description &&
                                regulated_training.final_project
                                    ? '. ' +
                                      translateString(
                                          'final_project',
                                          this
                                      ) +
                                      ': '
                                    : ''}
                                {regulated_training.final_project
                                    ? regulated_training.final_project
                                    : ''}
                            </p>
                        </div>
                        <div>
                            <p>
                                {regulated_training.average_score
                                    ? [
                                          <span key="1">
                                              {' '}
                                              {translateString(
                                                  'average_grade',
                                                  this
                                              )}
                                          </span>,
                                          <strong key="2">
                                              {regulated_training.average_score +
                                                  '/10'}
                                          </strong>
                                      ]
                                    : ''}
                            </p>
                        </div>
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
        if (!this.props.regulated_training) {
            return null;
        } else {
            return this.props.regulated_training.map(
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
        if (!this.props.regulated_training) {
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
        if (!this.props.regulated_training) {
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
    const data = state && state.data ? state.data : null;
    const regulated_training =
        data && data.regulated_training
            ? data.regulated_training
            : null;
    const language =
        state && state.language ? state.language : null;
    const translations =
        data &&
        data.translations &&
        data.translations[language] &&
        data.translations[language]['RegulatedTraining']
            ? data.translations[language][
                  'RegulatedTraining'
              ]
            : null;
    return {
        regulated_training: regulated_training,
        translations: translations,
        language: language
    };
}

export default connect(mapStateToProps)(RegulatedTraining);
