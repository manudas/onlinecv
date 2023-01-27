import React, { Component } from "react"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import { language, selectorTypeDef } from "./types"
import { setLanguage } from 'store/actions'


import './styles.scss'

const languages = [
    { code: 'en', name: 'English'},
    { code: 'es', name: 'Español'},
    { code: 'deu', name: 'Deutsch'}
]

const translations: { [key in language]?: Record<string, string> } = {
    [language[language.en]]: {
        'lang-choice': 'Language:'
    },
    [language[language.deu]]: {
        'lang-choice': 'Sprache:'
    },
    [language[language.es]]: {
        'lang-choice': 'Idioma:'
    }
}


















// PRIMERO: ENGANCHARLO A LA COOKIE, SEGUNDO ENCANCHARLO AL SISTEMA DE TRADUCCIONES REALES

const getTranslation = (lang: string, text: string) => {
    const isoLang: language = lang as any
    return translations?.[isoLang]?.[text]
}
class LanguageSwitcher extends Component<any, { language: language } >{
    // state = {
    //     lang: language.en
    // }

    changeLanguageHandler = (lang: string) => {
        this.props.setLanguage(lang)
    }

    render() {
        return (
            <div className="languageSwitcher">
                <p className="small d-none d-sm-block">
                    { getTranslation(this.props.language, 'lang-choice') }
                </p>
                <LanguageSwitcherSelector
                    lang={this.props.language}
                    handleChangeLanguage={this.changeLanguageHandler}
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
        const options = languages.map(langOpt => {
            if (langOpt.code !== this.props.lang) {
                return (
                    <li key={langOpt.code} onClick={this.onChange}>
                        <div data-flag={langOpt.code} className={ `flag ${langOpt.code}` }></div>
                    </li>
                )
            }

            return null
        })

        return (
            <div className="lang">
                <div
                    className={ `flag ${this.props.lang}` }
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
  language: string
}) {
    const { language = null } = state

    return { language }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
      setLanguage,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher)