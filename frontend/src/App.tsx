
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.scss'

import React, { Component } from 'react'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import Cookies from 'universal-cookie'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'

import InfoContainer from 'components/infoContainer'
import PageLoader from 'components/pageloader'
import { getBase64MimeType, bufferToBase64 } from 'helpers/files'
import { Memoization } from 'helpers/Memo'
import { requestUserDataLoad, requestTranslations, setLanguage } from 'store/actions'
import { getModuleTagPairs, getNotTranslatedTranslationsRequest, TRANSLATION_DOMAIN } from './helpers/translations'
import { DEFAULT_LANGUAGE_ISO, LANG_COOKIE, LOADER_UNMOUNT_TIMEOUT } from 'helpers/constants'

import { propDef, stateDef } from 'types/App'

class App extends Component<propDef, stateDef> {
    debouncedHandler: (...args: any[]) => void
    debounceTimeout: number = 200 // ms
    transitionEnd: Function = Function.prototype

    constructor(props: propDef) {
        super(props)
        this.hideLoader = this.hideLoader.bind(this)
        this.state = { showPageLoader: true }
        const cookies = new Cookies()
        const lang = cookies.get(LANG_COOKIE)
        this.props.setLanguage(
            lang ?? DEFAULT_LANGUAGE_ISO,   // Set redux language data
            lang ? false : true             // Set cookie language data
        )

        /*
         * We are going to use useMemo here in order to not refetch the data from
         * the backend if  the input (requested translations array), hasn't changed
         */
        console.warn('review this memo, is it updating only when translation array changes?')
        this.debouncedHandler = Memoization<void>(
            debounce(
                ([params, iso]) => {
                    const { module_arr, tag_arr } = params;

                    return this.props.requestTranslations(
                        iso,
                        {
                            tags: tag_arr,
                            modules: module_arr,
                            domain: TRANSLATION_DOMAIN
                        }
                    );
                },
                this.debounceTimeout,
                {
                    leading: false,
                    trailing: true
                }
            ),
            {
                // Memo options
                ignoreMemorisedValue: true
            }
        );
    }

    componentDidMount() {
        this.requestTranslations()
        this.props.requestUserDataLoad(this.props.language)
    }

    componentDidUpdate(_prevProps: propDef) {
        if (_prevProps.language !== this.props.language) {
            this.showLoader()
            this.props.requestUserDataLoad(this.props.language)
        }
        if (this.props.resume !== _prevProps.resume) {
            // an element inside data that can be rendered has been found
            setTimeout(
                () => this.hideLoader(),
                LOADER_UNMOUNT_TIMEOUT
            ); // hide loader in 2 seconds time
        }
        this.requestTranslations()
    }

    requestTranslations() {
        const translations = getNotTranslatedTranslationsRequest(this.props.language)
        if (Object.keys(translations).length > 0) {
            this.debouncedHandler( getModuleTagPairs(translations), this.props.language)
        }
    }

    hideLoader = () => this.setState({ showPageLoader: false })
    showLoader = () => this.setState({ showPageLoader: true })

    render() {
        let _backgroundImage = this.props.background
            ? `url(data:${getBase64MimeType(
                  this.props.background.toString()
              )};base64,${this.props.background})`
            : null

        return (
            <div
                {
                    ...(_backgroundImage
                        ? { style: { backgroundImage: _backgroundImage } }
                        : {}
                    )
                }
                data-spy="scroll"
                data-target="#side-menu"
                className="App"
            >
                <PageLoader onTransitionEnd={this.transitionEnd} mounted={this.state.showPageLoader} introduction={this.props.introduction} />
                <InfoContainer language={this.props.language} mounted={!this.state.showPageLoader} />
            </div>
        );
    }
}

function mapStateToProps(state: {
    data : {
        images: {
            bgimage: {
                value: string
            }
        },
        introduction: unknown,
        resume: unknown
    },
    language: string,
}) {
    const {
        data: {
            images: { bgimage } = {},
            introduction,
            resume
        } = {},
        language
    } = state;

    return {
        background: bgimage ? bufferToBase64(bgimage.value) : null,
        language,
        introduction,
        resume
    };
}

function mapDistpatchToProps(dispatch: Dispatch<AnyAction>) {
    return bindActionCreators(
        {
            requestUserDataLoad,
            requestTranslations,
            setLanguage
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDistpatchToProps)(App)
