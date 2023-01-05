
import React, { ChangeEvent, Component, Fragment } from 'react'
import debounce from 'lodash/debounce'

import { connect } from 'react-redux'
import TimeLineHeader from 'components/timeLineHeader'
import TimeLineItem from 'components/timeLineItem'
import { PropDef, StateDef } from './types'

import ControlledPopup from 'components/popup'

import { translateString } from 'helpers/translations'
import { sendMessage } from 'queries/sendMessage'
import { DataService } from 'queries/data.service'
import { isValidEmail, isEmpty } from 'helpers/validators'

import './contact_form.css'

class ContactForm extends Component<PropDef, StateDef> {
    touchSet: Set<string> = new Set()
    validators: Map<keyof StateDef['contactForm'], Function> = new Map([
        ['name', isEmpty],
        ['from', (...args) => !isValidEmail(...args)],
        ['subject', isEmpty],
        ['message', isEmpty]

    ])
    messageSentMessage = translateString('Message sent. Will reach back to you as soon as possible. Thank you!', this)
    messageError = translateString('Something unexpected happened. Please try again later', this)
    popupMessage: string | null = null

    constructor(props: PropDef) {
        super(props)
        console.log(
            'INTERESANTE HACER REFERENCIAS . cambiar mensaje send por send another cuando segundo mensaje? en css tenemos popoup de mensaje enviado/fallo mensaje. usar? cambiar por toast?'
        )

        this.state =  {
            contactForm : {
                name: '',
                from: '',
                subject: '',
                message: '',
            },
            popupMessage: null,
        }

        this.setValue = debounce(this.setValue.bind(this), 500)
        this.sendMessage = this.sendMessage.bind(this)
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
                            onChange={this.setValue}
                            required
                        />
                        {
                            this.touchSet.has('name') && this.validators.get('name')?.(this.state.contactForm.name)
                                ? <small className="mt-2 d-block alert alert-danger">{ translateString('Please provide your name', this) }</small>
                                : null
                        }
                    </div>
                    {/* /Form Field */}
                    {/* Form Field */}
                    <div className="form-group">
                        <input
                            className="form-control required"
                            id="from"
                            name="from"
                            placeholder={ translateString('email', this) }
                            type="email"
                            onChange={this.setValue}
                            required
                        />
                        {
                            this.touchSet.has('from') && this.validators.get('from')?.(this.state.contactForm.from)
                                ? <small className="mt-2 d-block alert alert-danger">{ translateString('A valid email is required', this) }</small>
                                : null
                        }
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
                            onChange={this.setValue}
                            required
                        />
                        {
                            this.touchSet.has('subject') && this.validators.get('subject')?.(this.state.contactForm.subject)
                                ? <small className="mt-2 d-block alert alert-danger">{ translateString('Subject is required', this) }</small>
                                : null
                        }
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
                            onChange={this.setValue}
                            required
                        />
                        {
                            this.touchSet.has('message') && this.validators.get('message')?.(this.state.contactForm.message)
                                ? <small className="mt-2 d-block alert alert-danger">{ translateString('Message is required', this) }</small>
                                : null
                        }
                    </div>
                    {/* /Form Field */}
                    {/* Form Field */}
                    <div className="form-group">
                        <input
                            type="button"
                            className="btn btn-default form-send"
                            value={ translateString('send', this) + '!' }
                            onClick={this.sendMessage}
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
                            return contact_detail 
                                ? (
                                    <Fragment key={index}>
                                        <h4 className="contact-subtitle-1">
                                            { translateString(index, this) }
                                        </h4>
                                        <p>{ contact_detail }</p>
                                    </Fragment>
                                )
                                : null
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
                <ControlledPopup
                    openFlag={this.state.popupMessage !== null}
                    title={ translateString('Thank you so much for your message', this) }
                    message={this.state.popupMessage}
                    onClose={() => this.setState({ popupMessage: null}) }
                />
            </section>
        )
        /* ==>> /SECTION: CONTACT */
    }

    setValue(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        this.touchSet.add(event.target.name)
        this.setState({
            contactForm: {
                ...this.state.contactForm,
                [event.target.name]: event.target.value } as Pick<StateDef['contactForm'], keyof StateDef['contactForm']>
        })
    }


    validateAll() {
        const keys: Array<keyof StateDef['contactForm']> = Array.from<keyof StateDef['contactForm']>(this.validators.keys())
        const someFail = keys.some((elementKey) => this.validators.get(elementKey)?.(this.state['contactForm'][elementKey]))
        return !someFail
    }

    setAllTouched() {
        const arr = Array.from(this.validators.keys())
        arr.forEach(this.touchSet.add, this.touchSet)
    }

    async sendMessage() {
        const isValid = this.validateAll()

        if (isValid) {
            const { contactForm : {name, from, subject, message}}  = this.state
            const {
                query: queryUserData,
                variables: variablesUserData
            } = sendMessage(name, from, subject, message);
            const dataService = DataService.factory();
            const {
                data,
                errors
            } = await dataService.setData(
                queryUserData,
                variablesUserData
            )
            
            const ok = data?.sendMessage ?? false

            if (errors || ok !== true) {
                this.setState({ popupMessage: this.messageError })
            } else {
                this.setState({ popupMessage: this.messageSentMessage })
            }
        } else {
            this.setAllTouched()
            // force redraw
            this.setState({...this.state})
        }
    }
}

function mapStateToProps(state: any) {
    const data = state?.data?.resume?.details
    const { email, phone } = data ?? {}
    const language = state?.language
    const translations = state?.data?.translations?.[language]?.['ContactForm']

    return {
        contact_details: {email, phone},
        translations: translations,
        language
    }
}

export default connect(mapStateToProps)(ContactForm)