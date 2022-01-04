import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { cvComponentsWereLoadedActionCreator } from '../../store/actions';

import { translateString } from '../../helpers/translations';

import './cvcontainer.css';

import ProfileResume from '../profileResume';
import ProfileDetail from '../profileDetails';
import Training from '../training';
import WorkExperience from '../work_experience';
import Skill from '../skills';
import Interest from '../interests';
import PortFolio from '../portfolio';
import ContactForm from '../contact_form';
import ThankYou from '../thank_you';
import Footer from '../footer';

class CVContainer extends Component {
    constructor(props) {
        super(props);
        /**
         * refList will be used to
         * share with Menu component
         * which components were
         * rendered on the App
         */
        this.refList = [];
    }

    componentDidUpdate() {
        /**
         * Dispatching action:
         *
         * refList will be used to
         * share with Menu component
         * which components were
         * rendered on the App
         */
        this.props.componentsWereLoaded(this.refList);
    }

    renderHeaderColors() {
        /* Header Colors */
        return (
            <div className="col-md-10 col-sm-10  col-md-offset-2 col-sm-offset-1 clearfix top-colors">
                <div className="top-color top-color1" />
                <div className="top-color top-color2" />
                <div className="top-color top-color3" />
                <div className="top-color top-color1" />
                <div className="top-color top-color2" />
            </div>
        );
        /* /Header Colors */
    }

    renderHeaderButtons() {
        /* Header Buttons */
        return (
            <div className="row">
                <div className="header-buttons col-md-10 col-md-offset-1">
                    {/* Download Resume Button */}
                    <a className="btn btn-default btn-top-resume">
                        <i className="fa fa-download" />
                        <span className="btn-hide-text">
                            Download my resume
                        </span>
                    </a>
                    {/* /Download Resume Button */}
                    {/* Mail Button */}
                    <a className="btn btn-default btn-top-message">
                        <i className="fa fa-envelope-o" />
                        <span className="btn-hide-text">
                            Send me a message
                        </span>
                    </a>
                    {/* /Mail Button */}
                </div>
            </div>
        );
        /* /Header Buttons */
    }

    addToList(elem, component_name) {
        console.log('creo que seria mejor usar un custon event para enviar elementos al menu en lugar de usar la redux store');
        const name =
            translateString(component_name, this);
        this.refList.push({
            component: elem,
            translated_name: name
        });
        return elem;
    }

    render() {
        if (!this.props.resume) {
            return null;
        }
        /* CONTENT
	========================================================= */
        this.refList.length = 0; // lets reset the array reference before setting it again
        return (
            <section
                id="content-body"
                className="container animated"
            >
                <div className="row" id="intro">
                    {this.renderHeaderColors()}
                    {/* Beginning of Content */}
                    <div className="col-md-10 col-sm-10 col-md-offset-2 col-sm-offset-1 resume-container">
                        {this.renderHeaderButtons()}
                        <ProfileResume />
                        {/* ============  TIMELINE ================= */}
                        <div className="timeline-wrap">
                            <div className="timeline-bg">
                                <ProfileDetail
                                    reference={this.addToList(
                                        React.createRef(),
                                        'ProfileDetail'
                                    )}
                                    name={translateString(
                                        'ProfileDetail',
                                        this
                                    )}
                                />
                                <Training
                                    reference={this.addToList(
                                        React.createRef(),
                                        'RegulatedTraining'
                                    )}
                                    name={translateString(
                                        'RegulatedTraining',
                                        this
                                    )}
                                />
                                <WorkExperience
                                    reference={this.addToList(
                                        React.createRef(),
                                        'WorkExperience'
                                    )}
                                    name={translateString(
                                        'WorkExperience',
                                        this
                                    )}
                                />
                                <Skill
                                    reference={this.addToList(
                                        React.createRef(),
                                        'Skill'
                                    )}
                                    name={translateString(
                                        'Skill',
                                        this
                                    )}
                                />
                                <Interest
                                    reference={this.addToList(
                                        React.createRef(),
                                        'Interest'
                                    )}
                                    name={translateString(
                                        'Interest',
                                        this
                                    )}
                                />
                                <PortFolio
                                    reference={this.addToList(
                                        React.createRef(),
                                        'PortFolio'
                                    )}
                                    name={translateString(
                                        'PortFolio',
                                        this
                                    )}
                                />
                                <ContactForm
                                    reference={this.addToList(
                                        React.createRef(),
                                        'ContactForm'
                                    )}
                                    name={translateString(
                                        'ContactForm',
                                        this
                                    )}
                                />
                                <ThankYou />
                            </div>
                        </div>
                        {/* ============  /TIMELINE ================= */}
                        <Footer />
                    </div>
                </div>
            </section>
        );
        /* /CONTENT
    ========================================================= */
    }
}

function mapStateToProps(state) {

    const {
        data: {
            resume
        } = {},
        language,
        translations: {
            [language]: {
                CVContainer: translations
            } = {}
        } = {}
    } = state;

    return {
        resume,
        translations,
        language
    };
}

function mapDistpatchToProps(dispatch) {
    return bindActionCreators(
        {
            componentsWereLoaded:
                cvComponentsWereLoadedActionCreator
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDistpatchToProps
)(CVContainer);
