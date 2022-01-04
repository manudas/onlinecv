import React, { Component } from 'react';
import Cookies from 'universal-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import './App.css';

import PageLoader from './components/pageloader';
import InfoContainer from './components/infoContainer';

import {
    getBase64ImageMimeType,
    bufferToBase64
} from './helpers/image';

import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import { Memoization } from './helpers/Memo';

import {
    requestUserDataLoad,
    requestTranslations,
    setLanguageAC
} from './store/actions';

import { bindActionCreators } from 'redux';

import {
    getModuleTagPairs,
    getNotTranslatedTranslationsRequest,
    TRANSLATION_DOMAIN
} from './helpers/translations';

import {
    DEFAULT_LANGUAGE_ISO,
    LANG_COOKIE,
    LOADER_UNMOUNT_TIMEOUT
} from './helpers/constants';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPageLoader: true
        };
        this.cookies = new Cookies();
        const lang = this.cookies.get(LANG_COOKIE);
        this.props.setLanguage(
            lang ?? DEFAULT_LANGUAGE_ISO
        );

        /*
         * We are going to use useMemo
         * here in order to not refetch
         * the data from the backend if
         * the input (requested translations
         * array), hasn't changed
         */
        this.debouncedHandler = Memoization(
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
        const language = this.props.language
            ? this.props.language
            : DEFAULT_LANGUAGE_ISO;
        this.props.requestUserDataLoad(language);

        this.requestTranslations();
    }

    componentDidUpdate(_prevProps) {
        this.requestTranslations();
    }

    requestTranslations() {
        const language = this.props.language
            ? this.props.language
            : DEFAULT_LANGUAGE_ISO;

        const translations =
            getNotTranslatedTranslationsRequest();
        if (Object.keys(translations).length > 0) {
            this.debouncedHandler(
                getModuleTagPairs(translations),
                language
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.resume !== nextProps.resume) {
            // an element inside data that can be rendered has been found
            setTimeout(
                () => this.hideLoader_binded(),
                LOADER_UNMOUNT_TIMEOUT
            ); // hide loader in 2 seconds time
        }
    }

    hideLoader() {
        this.setState({
            showPageLoader: !this.state.showPageLoader
        });
    }

    hideLoader_binded = this.hideLoader.bind(this);

    render() {
        let _backgroundImage = this.props.background
            ? `url(data:${getBase64ImageMimeType(
                  this.props.background
              )};base64,${this.props.background})`
            : null;

        return (
            <div
                {...(_backgroundImage
                    ? {
                          style: {
                              backgroundImage:
                                  _backgroundImage
                          }
                      }
                    : '')}
                data-spy="scroll"
                data-target="#side-menu"
                className="App"
            >
                <PageLoader
                    onTransitionEnd={this.transitionEnd}
                    mounted={this.state.showPageLoader}
                    introduction={this.props.introduction}
                />
                <InfoContainer
                    language={this.props.language}
                    mounted={!this.state.showPageLoader}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {
        data: {
            images: { bgimage } = {},
            introduction,
            resume
        } = {},
        language
    } = state;

    return {
        background: bgimage
            ? bufferToBase64(bgimage.value)
            : null,
        language,
        introduction,
        resume
    };
}

function mapDistpatchToProps(dispatch) {
    return bindActionCreators(
        {
            requestUserDataLoad,
            requestTranslations,
            setLanguage: setLanguageAC
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDistpatchToProps
)(App);
