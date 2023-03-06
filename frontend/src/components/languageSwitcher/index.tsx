import React, { Component } from "react"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import { language, localeDef, selectorTypeDef, switcherDev } from "./types"
import { setLanguage } from 'store/actions'

import './styles.scss'
import { translateString } from "helpers/translations"
import { DEFAULT_LANGUAGE_ISO } from "helpers/constants"
class LanguageSwitcher extends Component<switcherDev, { language: language } >{
    changeLanguageHandler = (lang: string) => {
        this.props.setLanguage(lang)
    }

    render() {
        return (
            <div className="languageSwitcher">
                <p className="small d-none d-sm-block">
                    { translateString('Language', this) }:
                </p>
                <LanguageSwitcherSelector
                    lang={this.props.language}
                    handleChangeLanguage={this.changeLanguageHandler}
                    locales={this.props.locales}
                />
            </div>
        )
    }
}

class LanguageSwitcherSelector extends Component<selectorTypeDef> {
    onChange = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
        const target = e.target as HTMLElement
        this.props.handleChangeLanguage(target.dataset.flag ?? language[language.en])
    }

    render() {
        const options = this.props.locales.map(langOpt => {
            if (langOpt.iso !== this.props.lang) {
                return (
                    <li key={langOpt.iso} onClick={this.onChange}>
                        <div data-flag={langOpt.iso} className={ `flag ${langOpt.flag}` }></div>
                    </li>
                )
            }

            return null
        })

        return (
            <div className="lang">
                <div
                    className={ `flag ${this.props.locales.find(locale => locale.iso === this.props.lang)?.flag}` }
                >
                </div>
                <ul className="dropdown" >
                    { options }
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state: {
  language: string,
  locales: localeDef[]
}) {
    const { language = DEFAULT_LANGUAGE_ISO, locales = [] } = state

    return { language, locales }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
      setLanguage,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher)