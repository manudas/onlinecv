import { Component } from 'react';

import { connect } from 'react-redux';
import { sortElementsByTypeAndOrder } from '../../helpers/sortingElements';

import { translateString } from '../../helpers/translations';
import TimeLineHeader from '../timeLineHeader';
import TimeLineItem from '../timeLineItem';

import './training.css';

class Training extends Component {
    renderTrainingItem(training, index) {
        /* SECTION ITEM */
        let start_date_string;
        if (training.start_date) {
            const start_date = new Date(Number(training.start_date));
            start_date_string = start_date.toLocaleDateString(this.language, {year: 'numeric', month: 'short'});
        }
        let finish_date_string;
        if (training.finish_date) {
            const finish_date = new Date(Number(training.finish_date));
            finish_date_string = finish_date.toLocaleDateString(this.language, {year: 'numeric', month: 'short'});
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
                <span
                    className={
                        'text-decoration-none d-inline-block ms-1'
                    }
                >
                    🡕
                </span>
            </a>
        ) : (
            school_name
        );

        return (
            <TimeLineItem key={index} type="education">
                <div className="line-content">
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
                        {
                            start_date_string
                                ? <span className="graduation-date">
                                    {translateString(
                                        'started',
                                        this
                                    )}
                                    {' ' + start_date_string}
                                </span>
                                : null
                        }
                        {start_date_string ? ' - ' : null}
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
                            {training.description ??
                                null}
                            {training.description &&
                            training.final_project
                                ? '. '
                                : null}
                            {training.final_project
                                ? `. ${translateString(
                                        'final_project',
                                        this
                                    )}: `
                                : null}
                            {training.final_project ??
                                null}
                        </p>
                    </div>
                    {training.average_grade ? (
                        <div>
                            <p>
                                <span>
                                    {`${translateString(
                                        'average_grade',
                                        this
                                    )}: `}
                                </span>
                                <strong>
                                    {`${training.average_grade}/10`}
                                </strong>
                            </p>
                        </div>
                    ) : null}
                    {/* /Content */}
                </div>
            </TimeLineItem>
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
        console.log('pensar como clasificar por tipo de training. Creo que mejor añadir tipo de experiencia')
        return <TimeLineHeader name={this.props.name} />;
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
