import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./App.css";

import PageLoader from "./components/pageloader";
import InfoContainer from "./components/infoContainer";

import { getBase64ImageMimeType, bufferToBase64 } from "./helpers/image";

import { connect } from "react-redux";

import {
    dataDidLoad,
    requestUserDataLoad,
} from "./actions";

import { bindActionCreators } from "redux";

import { setLanguageAC } from "./actions";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPageLoader: true
        };
        this.props.setLanguage("en"); // in the future, look for a cookie with language content to assign
    }

    componentDidMount() {
        const language = this.props.language ? this.props.language : "en";
        this.props.requestUserDataLoad(language);
    }

    hideLoader() {
        this.setState({
            showPageLoader: !this.state.showPageLoader
        });
    }

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
    console.log(state);
    const data = state && state.data ? state.data : null;
    const bgimage =
        data && data.images && data.images.bgimage ? data.images.bgimage : null;
    const language = data && data.language ? data.language : null;
    const userData = data && data.userData ? data.userData : null;
    return {
        background: bgimage ? bufferToBase64(bgimage.value) : null,
        language,
        userData
    };
}

function mapDistpatchToProps(dispatch) {
    return bindActionCreators(
        {
            requestUserDataLoad,
            dataLoaded: dataDidLoad,
            setLanguage: setLanguageAC
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDistpatchToProps
)(App);
