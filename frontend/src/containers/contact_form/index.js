import React, { Component } from 'react';

import './contact_form.css';

class ContactForm extends Component {
    constructor(props) {
        super(props);
        console.log("Si se envia mensaje poner boton de enviar otro mensaje y deshabilitar\nmandar mensaje de mensaje enviado o ha habido un error, con un action creator asíncrono");

        this.state = {
            height_title1: 0,
            height_title2: 0,
            height_section: 0
        };
    }

    componentDidMount() {
        const height_title1 = this.titleRef1.clientHeight;
        const height_title2 = this.titleRef2.clientHeight;
        const height_section = this.sectionRef.clientHeight;

        this.setState({
            height_title1: height_title1,
            height_title2: height_title2,
            height_section: height_section
        });
    }

    renderTitle() {
        return (
            [
                /* VERTICAL MARGIN (necessary for the timeline effect) */
                <div key='1' className="line row timeline-margin">
                    <div
                        ref={titleRef1 => this.titleRef1 = titleRef1}
                        className="content-wrap">
                        <div
                            style={{ height: this.state.height_title1 }}
                            className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                        <div
                            style={{ height: this.state.height_title1 }}
                            className="col-md-2 timeline-progress hidden-sm hidden-xs full-height"></div>
                        <div
                            style={{ height: this.state.height_title1 }}
                            className="col-md-9 bg1 full-height"></div>
                    </div>
                </div>,
                /* /VERTICAL MARGIN */
                /* SECTION TITLE */
                <div key='2' className="line row">
                    {/* Margin Collums (necessary for the timeline effect) */}
                    <div
                        style={{ height: this.state.height_title2 }}
                        className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                    <div
                        style={{ height: this.state.height_title2 }}
                        className="col-md-2 timeline-progress hidden-sm hidden-xs timeline-title full-height"></div>
                    {/* /Margin Collums */}
                    {/* Item Content */}
                    <div
                        ref={titleRef2 => this.titleRef2 = titleRef2}
                        className="col-md-8 content-wrap bg1">
                        {/* Section title */}
                        <h2 className="section-title">Contact</h2>
                        {/* /Section title */}
                    </div>
                    {/* /Item Content */}
                    {/* Margin Collum*/}
                    <div
                        style={{ height: this.state.height_title2 }}
                        className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                    {/* / Margin Collum*/}
                </div>
                /* /SECTION TITLE */
            ]
        );
    }

    renderForm() {
        return (
            <div className="col-md-8 contact-form-wrapper">
                {/* Contact form */}
                <form id="contactForm" method="post" className="form" role="form">
                    {/* Form Field */}
                    <div className="form-group">
                        <input className="form-control required" id="name" name="name" placeholder="Name" type="text" required />
                    </div>
                    {/* /Form Field */}
                    {/* Form Field */}
                    <div className="form-group">
                        <input className="form-control required" id="email" name="email" placeholder="Email" type="email" required />
                    </div>
                    {/* /Form Field */}
                    {/* Form Field */}
                    <div className="form-group">
                        <input className="form-control required" id="subject" type="text" name="subject" placeholder="Subject" required />
                    </div>
                    {/* /Form Field */}
                    {/* Form Field */}
                    <div className="form-group">
                        <textarea className="form-control required" id="message" name="message" placeholder="Message" rows="5" required></textarea>
                    </div>
                    {/* /Form Field */}
                    {/* Form Field */}
                    <div className="form-group">
                        <input type="submit" className="btn btn-default form-send" value="Send!" />
                    </div>
                    {/* /Form Field */}
                </form>
                {/* /Contact Form */}
            </div>
        );
    }

    renderContactInfo() {
        /* Contact infos */
        return (
            <div className="col-md-4 contact-infos">
                <h4 className="contact-subtitle-1">Address</h4>
                <p>451 Lorem Ipsum, Austin - Texas - U.S.A</p>
                <h4 className="contact-subtitle-1">Phone</h4>
                <p>+61 3 8376 6284</p>
                <h4 className="contact-subtitle-1">Mail</h4>
                <p>john.Rex@dotrex.com</p>
            </div>
        );
        /* /Contact infos */
    }

    renderSection() {
        /* SECTION ITEM */
        return (
            <div className="line row">
                {/* Margin Collums (necessary for the timeline effect) */}
                <div
                    style={{ height: this.state.height_section }}
                    className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                <div
                    style={{ height: this.state.height_section }}
                    className="col-md-2 timeline-progress hidden-sm hidden-xs full-height timeline-mail "></div>
                {/* /Margin Collums */}
                {/* Item Content */}
                <div
                    ref={sectionRef => this.sectionRef = sectionRef}
                    className="col-md-8 content-wrap bg1">
                    <div className="line-content contact-content">
                        {/* Subtitle */}
                        <h3 className="section-item-title-1">Send me a message</h3>
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
                <div
                    style={{ height: this.state.height_section }}
                    className="col-md-1 bg1 timeline-space full-height hidden-sm hidden-xs"></div>
                {/*/} Margin Collum*/}
            </div>
        );
        /* /SECTION ITEM */
    }

    render() {
        /* ====>> SECTION: CONTACT <<====*/
        return (
            <section className="timeline" id="contact">
                {this.renderTitle()}
                {this.renderSection()}
            </section>
        );
        /* ==>> /SECTION: CONTACT */
    }
}

export default ContactForm;
