import { Component } from 'react'
import { connect } from 'react-redux'

import { translateString } from 'helpers/translations'
import TimeLineHeader from '../timeLineHeader'
import TimeLineItem from '../timeLineItem'
import { reference, PropDef } from './types'

import './references.css'

class References extends Component<PropDef> {
    renderReferenceItem(reference_item: reference, index: number) {
        const {
            name,
            company = '',
            company_url,
            phone,
            email,
            role,
            description,
        } = reference_item
        const companyData = company_url ? (
            <a
                rel="noreferrer"
                href={company_url}
                target="_blank"
                title={company}
                className={'text-decoration-none'}
            >
                {`${company} ↗`}
            </a>
        ) : (
            company
        )

        /* SECTION ITEM */
        return (
            <TimeLineItem key={index.toString()} type="references">
                <div className="line-content line-content-references">
                    {/* Company / place data */}
                    <h3 className="section-item-title-1"> { companyData } </h3>
                    {/* End of Company / place data */}
                    {/* Graduation time */}
                    <h4 className="reference">
                        <i className="fa fa-address-card-o" />{' '}
                        { name }
                        { role ? ' - ' : null }
                        {
                            role
                                ? <span className="reference-role">
                                    { role }
                                </span>
                                : null
                        }
                    </h4>
                    {/* Graduation time */}
                    {/* content */}
                    <div className="reference-description">
                        <p className="text-justify"> { description } </p>
                        {
                            phone
                                ? <span>
                                    <i className="fa fa-phone"/> {`${translateString('Call to', this)} ${name}: `} <a href={`tel:${phone}`}>{ phone }</a>
                                </span>
                                : null
                        }
                        { phone && email ? <br /> : null }
                        {
                            email
                                ? <span>
                                    <i className="fa fa-envelope"/> {`${translateString('Send an email to', this)} ${name}: `} <a href={`mailto:${email}`}>{ email }</a>
                                </span>
                                : null
                        }
                    </div>
                    {/* /Content */}
                </div>
            </TimeLineItem>
        )
        /* SECTION ITEM */
    }

    renderReferenceItems() {
        if (!this.props.references?.length) return null
        return this.props.references.map((reference, index) => this.renderReferenceItem( reference, index ))
    }

    renderTitle() {
        if (!this.props.references?.length) return null
        return <TimeLineHeader name={this.props.name} />
    }

    render() {
        if (!this.props.references?.length) return null
        /* ====>> SECTION: REFERENCES <<====*/
        return (
            <section
                ref={this.props.reference}
                className="timeline references"
                id="references"
            >
                {this.renderTitle()}
                {this.renderReferenceItems()}
            </section>
        )
        /* ==>> /SECTION: REFERENCES <<==== */
    }
}

function mapStateToProps(state: {
    data: {
        resume: {
            references: Array<reference>,
        }
    },
    language: string,
    translations: Record<string, Record<string, Array<string>>>
}) {
    const {
        data: {
            resume: { references = []} = {}
        } = {},
        language,
        translations: {
            [language]: { References = []} = {}
        } = {}
    } = state
    return {
        references,
        language,
        translations: References
    }
}

export default connect(mapStateToProps)(References)
