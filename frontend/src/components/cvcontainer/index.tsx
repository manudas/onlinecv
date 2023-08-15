import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'lodash'

import ContactForm from 'components/contactForm'
import Experience from 'components/experience'
import Footer from 'components/footer'
import Interest from 'components/interests'
import Languages from 'components/languages'
import LanguageSwitcher from 'components/languageSwitcher'
import PortFolio from 'components/portfolio'
import ProfileDetail from 'components/profileDetails'
import ProfileResume from 'components/profileResume'
import References from 'components/references'
import Skill from 'components/skills'
import ThankYou from 'components/thank_you'
import Training from 'components/training'

import { downloadDocument } from 'helpers/files'
import { EventType } from "helpers/customEvents"
import { translateString } from 'helpers/translations'
import { PropDef } from './types'
import { ComponentDef } from "helpers/types"

import './cvcontainer.css'

class CVContainer extends PureComponent<PropDef> {
    private cvComponents: ComponentDef[] = []

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
        )
        /* /Header Colors */
    }

    renderHeaderButtons() {
        const { details } = this.props.resume
        let name = details?.name
        let surname = details?.surname
        name = name?.split(' ')[0]
        surname = surname?.split(' ')[0]

        const primaryRole = details?.primaryRole;
        const secondaryRole = details?.secondaryRole;

        const jobNames = `${primaryRole}${primaryRole && secondaryRole ? ' / ' : ''}${secondaryRole ? secondaryRole : ''}`

        /* Header Buttons */
        return (
            <div className="row">
                <div className="header-buttons col-md-10 col-md-offset-1">
                    <LanguageSwitcher />
                    {/* Download Resume Button */}
                    {
                        this.props.resume.resume
                            ? <a
                                onClick={() => downloadDocument(this.props.resume.resume.data, `${name}${surname ? ' ' + surname : ''}${jobNames ? ' - ' + jobNames : ''}`)}
                                href="#downloadResumeTopBar"
                                className="btn btn-default btn-top-resume">
                                <i className="fa fa-download" />
                                <span className="btn-hide-text">
                                    { translateString('Download my resume', this) }
                                </span>
                            </a>
                            : null
                    }
                    {/* /Download Resume Button */}
                    {/* Mail Button */}
                    <a
                        href="#sendMessageTopBar"
                        className="btn btn-default btn-top-message"
                        onClick={this.onClickSendMeMessage}
                    >
                        <i className="fa fa-envelope-o" />
                        <span className="btn-hide-text">
                            { translateString('Send me a message', this) }
                        </span>
                    </a>
                    {/* /Mail Button */}
                </div>
            </div>
        )
        /* /Header Buttons */
    }

    componentDidMount() {
        this.cvComponents.forEach(element => document.dispatchEvent(new CustomEvent(EventType[EventType.SECTION_ADDED], {detail: element} )))
    }

    addToList(elem: React.Ref<HTMLElement>, component_name: string) {
        const name = translateString(component_name, this)
        this.cvComponents.push({
            component: elem,
            translated_name: name,
        })

        return elem
    }

    render() {
        if (!this.props.resume) return null
        /* CONTENT
	    ========================================================= */

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
                                    reference={ this.addToList(React.createRef(), 'ProfileDetail') }
                                    name={ translateString('ProfileDetail', this) }
                                />
                                <Training
                                    reference={ this.addToList(React.createRef(), 'Training') }
                                    name={ translateString('Training', this) }
                                />
                                <Experience
                                    reference={ this.addToList(React.createRef(), 'Experience') }
                                    name={ translateString('Experience', this) }
                                />
                                <Skill
                                    reference={ this.addToList(React.createRef(), 'Skill') }
                                    name={ translateString('Skill', this) }
                                />
                                <Languages
                                    reference={ this.addToList(React.createRef(), 'Languages') }
                                    name={ translateString('Languages', this) }
                                />
                                <Interest
                                    reference={ this.addToList(React.createRef(), 'Interest') }
                                    name={ translateString('Interest', this) }
                                />
                                <PortFolio
                                    reference={ this.addToList(React.createRef<HTMLElement>(), 'PortFolio') }
                                    name={ translateString('PortFolio', this) }
                                />
                                <References
                                    reference={ this.addToList(React.createRef(), 'References') }
                                    name={ translateString('References', this) }
                                />
                                <ContactForm
                                    reference={this.addToList(React.createRef(), 'ContactForm') }
                                    name={ translateString('ContactForm', this) }
                                />
                                <ThankYou />
                            </div>
                        </div>
                        {/* ============  /TIMELINE ================= */}
                        <Footer />
                    </div>
                </div>
            </section>
        )
        /* /CONTENT
        ========================================================= */
    }

    /**
	 * Debouncing to avoid flooding
	 * the app with dispatches
	 */
	onClickSendMeMessage = debounce(() => {
        document.dispatchEvent(new CustomEvent(EventType[EventType.SCROLL_TO_SECTION],
            { detail: { component: this.cvComponents[this.cvComponents.length - 1].component, unique_id: Date.now() } }
        ))
	}, 1000).bind(this)
}

function mapStateToProps(state: any) {
    const {
        data: {
            resume = null,
        } = {},
        language,
        translations: {
            [language]: {
                CVContainer: translations = null
            } = {}
        } = {}
    } = state

    return {
        resume,
        translations,
        language
    }
}

export default connect(mapStateToProps)(CVContainer)
