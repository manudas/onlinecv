import React, { Component } from 'react';

import { connect } from 'react-redux';

import { translateString } from '../../helpers/translations';

import './training.css';

class Training extends Component {
    renderTrainingItem(training, index) {
        /* SECTION ITEM */
        const finish_date = new Date(
            training.finish_date
        );
        const options = { year: 'numeric', month: 'short' };
        const finish_date_string =
            finish_date.toLocaleDateString(
                this.language,
                options
            );

        const school = training.school_url ? (
            <a
                href={training.school_url}
                target="_blank"
                title={
                    training.school
                        ? training.school
                        : 'school'
                }
            >
                {training.school
                    ? training.school
                    : 'school'}
            </a>
        ) : training.school ? (
            training.school
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
                            {training.name
                                ? training.name
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
                                {training.description
                                    ? training.description
                                    : ''}
                                {training.description &&
                                training.final_project
                                    ? '. ' +
                                      translateString(
                                          'final_project',
                                          this
                                      ) +
                                      ': '
                                    : ''}
                                {training.final_project
                                    ? training.final_project
                                    : ''}
                            </p>
                        </div>
                        <div>
                            <p>
                                {training.average_score
                                    ? [
                                          <span key="1">
                                              {' '}
                                              {translateString(
                                                  'average_grade',
                                                  this
                                              )}
                                          </span>,
                                          <strong key="2">
                                              {training.average_score +
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
    const data = state && state.data ? state.data : null;
    const training =
        data && data.training
            ? data.training
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
        training: training,
        translations: translations,
        language: language
    };
}

export default connect(mapStateToProps)(Training);
