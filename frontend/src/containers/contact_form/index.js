import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import "./contact_form.css";

class ContactForm extends Component {
    constructor(props) {
        super(props);
        console.log(
            "Si se envia mensaje poner boton de enviar otro mensaje y deshabilitar\nmandar mensaje de mensaje enviado o ha habido un error, con un action creator asíncrono"
        );
    }

    translateString(string) {
        let translations = this.props.translations
            ? this.props.translations
            : null;
        let result = translations && translations[string] ? translations[string] : null;
        if (result) {
            return result["text"];
        } else {
            return string + "_translation";
        }
    }

    renderTitle() {   
        return [
            /* VERTICAL MARGIN (necessary for the timeline effect) */
            <div key="1" className="line row timeline-margin content-wrap">
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
                {/* /Item Content */}
                {/* Margin Collum*/}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                {/* / Margin Collum*/}
            </div>
            /* /SECTION TITLE */
        ];
    }

    renderForm() {
        return (
            <div className="col-md-8 contact-form-wrapper">
                {/* Contact form */}
                <form
                    id="contactForm"
                    method="post"
                    className="form">
                    {/* Form Field */}
                    <div className="form-group">
                        <input
                            className="form-control required"
                            id="name"
                            name="name"
                            placeholder={
								this.translateString('username')
                            }
                            type="text"
                            required
                        />
                    </div>
                    {/* /Form Field */}
                    {/* Form Field */}
                    <div className="form-group">
                        <input
                            className="form-control required"
                            id="email"
                            name="email"
                            placeholder={
                                this.translateString('email')
                            }
                            type="email"
                            required
                        />
                    </div>
                    {/* /Form Field */}
                    {/* Form Field */}
                    <div className="form-group">
                        <input
                            className="form-control required"
                            id="subject"
                            type="text"
                            name="subject"
                            placeholder={
								this.translateString('subject')
                            }
                            required
                        />
                    </div>
                    {/* /Form Field */}
                    {/* Form Field */}
                    <div className="form-group">
                        <textarea
                            className="form-control required"
                            id="message"
                            name="message"
                            placeholder={
								this.translateString('message')
                            }
                            rows="5"
                            required
                        />
                    </div>
                    {/* /Form Field */}
                    {/* Form Field */}
                    <div className="form-group">
                        <input
                            type="submit"
                            className="btn btn-default form-send"
                            value={
								this.translateString('send') + "!"
                            }
                        />
                    </div>
                    {/* /Form Field */}
                </form>
                {/* /Contact Form */}
            </div>
        );
    }

    renderContactInfo() {
        if (
            !this.props.contact_details ||
            this.props.contact_details.length === 0
        ) {
            return null;
        }
        /* Contact infos */
        return (
            <div className="col-md-4 contact-infos">
                {this.props.contact_details.map((contact_detail, index) => {
                    return (
                        <Fragment key={index}>
                            <h4 className="contact-subtitle-1">
                                {contact_detail.label}
                            </h4>
                            <p>{contact_detail.text}</p>
                        </Fragment>
                    );
                })}
            </div>
        );
        /* /Contact infos */
    }

    renderSection() {
        /* SECTION ITEM */
        return (
            <div className="line row d-flex">
                {/* Margin Collums (necessary for the timeline effect) */}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                <div className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-mail " />
                {/* /Margin Collums */}
                {/* Item Content */}
                <div className="col-md-8 content-wrap bg1">
                    <div className="line-content contact-content">
                        {/* Subtitle */}
                        <h3 className="section-item-title-1">
                            {
								this.translateString('send_me_a_message')
							}
                        </h3>
                        {/* /Subtitle */}
                        {/* content */}
                        <div className="row">
                            {this.renderForm()}
                            {this.renderContactInfo()}
                        </div>
                        {/* /Content */}
                    </div>
                </div>
                {/* /Item Content */}
                {/* Margin Collum*/}
                <div className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs" />
                {/*/} Margin Collum*/}
            </div>
        );
        /* /SECTION ITEM */
    }

    render() {
        if (!this.props.contact_details) {
            return null;
        }
        /* ====>> SECTION: CONTACT <<====*/
        return (
            <section ref={ this.props.reference } className="timeline" id={this.constructor.name}>
                {this.renderTitle()}
                {this.renderSection()}
            </section>
        );
        /* ==>> /SECTION: CONTACT */
    }
}

function mapStateToProps(state) {
    const data = state && state.data ? state.data : null;
    const contact_details =
        data && data.contact_details ? data.contact_details : null;
    const language = state && state.language ? state.language : null;
    const translations =
        data &&
        data.translations &&
        data.translations[language] &&
        data.translations[language]['ContactForm']
            ? data.translations[language]['ContactForm']
            : null;

    return {
        contact_details: contact_details,
        translations: translations,
        language: state.language
    };
}

export default connect(mapStateToProps)(ContactForm);
