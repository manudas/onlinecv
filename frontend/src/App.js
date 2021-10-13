import React, { Component } from "react";
import Cookies from 'universal-cookie';

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./App.css";

import PageLoader from "./components/pageloader";
import InfoContainer from "./components/infoContainer";

import { getBase64ImageMimeType, bufferToBase64 } from "./helpers/image";

import { connect } from "react-redux";

import {
    requestUserDataLoad,
    setLanguageAC,
} from "./store/actions";

import { bindActionCreators } from "redux";

import {
    DEFAULT_LANGUAGE_ISO,
    LANG_COOKIE,
    LOADER_UNMOUNT_TIMEOUT
} from './helpers/constants'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPageLoader: true
        };
        this.cookies = new Cookies();
        const lang = this.cookies.get(LANG_COOKIE);
        this.props.setLanguage(lang ?? DEFAULT_LANGUAGE_ISO);
    }

    componentDidMount() {
        const language = this.props.language ? this.props.language : DEFAULT_LANGUAGE_ISO;
        this.props.requestUserDataLoad(language);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.userDetails !== nextProps.userDetails) {
            // console.log(nextProps.userDetails);
            // console.log(this.props.userDetails);
            setTimeout(() => this.hideLoader_binded(), LOADER_UNMOUNT_TIMEOUT); // hide loader in 2 seconds time
        }
    }

    hideLoader() {
        this.setState({
            showPageLoader: !this.state.showPageLoader
        });
    }

    hideLoader_binded = this.hideLoader.bind(this)

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
                              backgroundImage: _backgroundImage
                          }
                      }
                    : "")}
                data-spy="scroll"
                data-target="#side-menu"
                className="App">
                <PageLoader
                    onTransitionEnd={this.transitionEnd}
                    mounted={this.state.showPageLoader}
                    userData={this.props.userData}
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
    // console.log(state);
    const data = state && state.data ? state.data : null;
    const bgimage =
        data && data.images && data.images.bgimage ? data.images.bgimage : null;
    const language = data && data.language ? data.language : null;
    const userData = data && data.userData ? data.userData : null;
    const userDetails = data && data.userDetails ? data.userDetails : null;

    return {
        background: bgimage ? bufferToBase64(bgimage.value) : null,
        language,
        userData,
        userDetails
    };
}

function mapDistpatchToProps(dispatch) {
    return bindActionCreators(
        {
            requestUserDataLoad,
            setLanguage: setLanguageAC
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDistpatchToProps
)(App);
