
import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import TimeLineHeader from 'components/timeLineHeader'
import TimeLineItem from 'components/timeLineItem'
import { PropDef } from './types'

import { translateString } from 'helpers/translations'

import './contact_form.css'

class ContactForm extends Component<PropDef> {
    constructor(props: PropDef) {
        super(props)
        console.log(
            'INTERESANTE HACER REFERENCIAS . cambiar mensaje send por send another cuando segundo mensaje? en css tenemos popoup de mensaje enviado/fallo mensaje. usar? cambiar por toast?'
        )
    }

    renderTitle = () => <TimeLineHeader name={this.props.name} />

    renderForm() {
        return (
            <div className="col-md-8 contact-form-wrapper">
                {/* Contact form */}
                <form
                    id="contactForm"
                    method="post"
                    className="form"
                >
                    {/* Form Field */}
                    <div className="form-group">
                        <input
                            className="form-control required"
                            id="name"
                            name="name"
                            placeholder={ translateString('Your name', this) }
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
                            placeholder={ translateString('email', this) }
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
                            placeholder={ translateString('subject', this) }
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
                            placeholder={ translateString('message', this) }
                            rows={5}
                            required
                        />
                    </div>
                    {/* /Form Field */}
                    {/* Form Field */}
                    <div className="form-group">
                        <input
                            type="submit"
                            className="btn btn-default form-send"
                            value={ translateString('send', this) + '!' }
                        />
                    </div>
                    {/* /Form Field */}
                </form>
                {/* /Contact Form */}
            </div>
        )
    }

    renderContactInfo() {
        if (Object.entries(this.props.contact_details ?? {}).length === 0) return null
        /* Contact infos */
        return (
            <div className="col-md-4 contact-infos">
                {
                    Object.entries(this.props.contact_details).map(
                        ([index, contact_detail]) => {
                            return (
                                <Fragment key={index}>
                                    <h4 className="contact-subtitle-1">
                                        { translateString(index, this) }
                                    </h4>
                                    <p>{ contact_detail }</p>
                                </Fragment>
                            )
                        }
                    )
                }
            </div>
        )
        /* /Contact infos */
    }

    renderSection() {
        /* SECTION ITEM */
        return (
            <TimeLineItem
                index={`${this.props.name}_section`}
                type="point"
            >
                <div className="line-content contact-content">
                        {/* Subtitle */}
                        <h3 className="section-item-title-1">
                        { translateString('send_me_a_message', this) }
                        </h3>
                        {/* /Subtitle */}
                        {/* content */}
                        <div className="row">
                            {this.renderForm()}
                            {this.renderContactInfo()}
                        </div>
                        {/* /Content */}
                    </div>
            </TimeLineItem>
        )
        /* /SECTION ITEM */
    }

    render() {
        if (!this.props.contact_details) return null
        /* ====>> SECTION: CONTACT <<====*/
        return (
            <section
                ref={this.props.reference}
                className="timeline"
                id={this.constructor.name}
            >
                { this.renderTitle() }
                { this.renderSection() }
            </section>
        )
        /* ==>> /SECTION: CONTACT */
    }
}

function mapStateToProps(state: any) {
    const data = state?.data?.resume?.details
    const { email, phone } = data
    const language = state?.language
    const translations = state?.data?.translations?.[language]?.['ContactForm']

    return {
        contact_details: {email, phone},
        translations: translations,
        language
    }
}

export default connect(mapStateToProps)(ContactForm)
