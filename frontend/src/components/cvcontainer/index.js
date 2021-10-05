import React, { Component } from "react";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import { cvComponentsWereLoadedActionCreator } from "../../actions";

import "./cvcontainer.css";

import ProfileResume from "../profileResume";
import ProfileDetail from "../profileDetails";
import RegulatedTraining from "../regulated_training";
import WorkExperience from "../work_experience";
import Skill from "../skills";
import Interest from "../interests";
import PortFolio from "../portfolio";
import ContactForm from "../contact_form";
import ThankYou from "../thank_you";
import Footer from "../footer";

class CVContainer extends Component {
    constructor(props) {
        super(props);
        this.refList = [];
    }

    componentDidUpdate() {
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
                        <span className="btn-hide-text">Send me a message</span>
                    </a>
                    {/* /Mail Button */}
                </div>
            </div>
        );
        /* /Header Buttons */
    }

    addToList(elem, component_name) {
        const name = this.getComponentTranslatedName(component_name);
        this.refList.push({
            component: elem,
            translated_name: name
        });
        return elem;
    }

    getComponentTranslatedName(component_name) {
        let translations = this.props.translations
            ? this.props.translations
            : null;
        let module_translations =
            translations && translations[component_name]
                ? translations[component_name]
                : null;
        let result =
            module_translations && module_translations["name"]
                ? module_translations["name"]
                : null;
        if (result) {
            return result["text"];
        } else {
            return component_name + "_translation";
        }
    }

    render() {
        if (!this.props.data_is_loaded) {
            return null;
        }
        /* CONTENT
	========================================================= */
        this.refList.length = 0; // lets reset the array reference before setting it again
        return (
            <section id="content-body" className="container animated">
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
                                        "ProfileDetail"
                                    )}
                                    name={this.getComponentTranslatedName(
                                        "ProfileDetail"
                                    )}
                                />
                                <RegulatedTraining
                                    reference={this.addToList(
                                        React.createRef(),
                                        "RegulatedTraining"
                                    )}
                                    name={this.getComponentTranslatedName(
                                        "RegulatedTraining"
                                    )}
                                />
                                <WorkExperience
                                    reference={this.addToList(
                                        React.createRef(),
                                        "WorkExperience"
                                    )}
                                    name={this.getComponentTranslatedName(
                                        "WorkExperience"
                                    )}
                                />
                                <Skill
                                    reference={this.addToList(
                                        React.createRef(),
                                        "Skill"
                                    )}
                                    name={this.getComponentTranslatedName(
                                        "Skill"
                                    )}
                                />
                                <Interest
                                    reference={this.addToList(
                                        React.createRef(),
                                        "Interest"
                                    )}
                                    name={this.getComponentTranslatedName(
                                        "Interest"
                                    )}
                                />
                                <PortFolio
                                    reference={this.addToList(
                                        React.createRef(),
                                        "PortFolio"
                                    )}
                                    name={this.getComponentTranslatedName(
                                        "PortFolio"
                                    )}
                                />
                                <ContactForm
                                    reference={this.addToList(
                                        React.createRef(),
                                        "ContactForm"
                                    )}
                                    name={this.getComponentTranslatedName(
                                        "ContactForm"
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
    const data = state && state.data ? state.data : null;

    const data_is_loaded = data !== null;
    const language = state && state.language ? state.language : null;
    const translations =
        data && data.translations && data.translations[language]
            ? data.translations[language]
            : null;
    return {
        data_is_loaded: data_is_loaded,
        translations: translations,
        language: language
    };
}

function mapDistpatchToProps(dispatch) {
    return bindActionCreators(
        {
            componentsWereLoaded: cvComponentsWereLoadedActionCreator
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDistpatchToProps
)(CVContainer);
