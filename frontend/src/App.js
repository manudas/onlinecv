import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import './App.css';

import PageLoader from './components/pageloader';
import InfoContainer from './components/infoContainer';

import { getBase64ImageMimeType, bufferToBase64 } from './helpers/image';

import { connect } from 'react-redux';

import { dataDidLoad } from './actions';

import { bindActionCreators } from 'redux';

import { setLanguageAC } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPageLoader: true,
    }
    this.props.setLanguage('en'); // in the future, look for a cookie with language content to assign
  }

  componentDidMount() {
    const language = this.props.language ? this.props.language : 'en';
    const url = `api/getcontent/${language}?first_time_load`;
    let component = this;
    fetch(url) // Call the fetch function passing the url of the API as a parameter
      .then((response) => response.json())
        .then((data) => { 
        // Your code for handling the data you get from the API
        component.props.dataLoaded(data);
        component.hideLoader();
      })
      .catch((error) => {
        // This is where you run code if the server returns any errors
        console.error(`An error has ocurred calling api url ${url}\n: ${error}`);
      });
  }

  hideLoader(){
    this.setState({
      showPageLoader: !this.state.showPageLoader
    })
  }

  render() {
    let _backgroundImage = this.props.background ? `url(data:${getBase64ImageMimeType(this.props.background)};base64,${this.props.background})` : null;
    return (
      <div {...(_backgroundImage ?
        {
        style : {
            backgroundImage: _backgroundImage
          } 
        }
          : '')}
        data-spy="scroll"
        data-target="#side-menu"
        className="App">

        <PageLoader 
          onTransitionEnd={this.transitionEnd} 
          mounted={this.state.showPageLoader} 
          userData={this.props.userData} />
        <InfoContainer language={this.props.language} userData={this.props.userData} />

      </div>
    );
  }
}

function mapStateToProps(state) {
  const data = (state && state.data) ? state.data : null;
  const bgimage = (data && data.images && data.images.bgimage) ? data.images.bgimage : null;
  const language = (data && data.language) ? data.language : null;
  return {
    background: bgimage ? bufferToBase64(bgimage.value) : null,
    language: language,
    userData: window.dataSet.userData
  };
}

function mapDistpatchToProps(dispatch) {
  return bindActionCreators({
    dataLoaded: dataDidLoad,
    setLanguage: setLanguageAC
  }, dispatch);
}

export default connect(mapStateToProps, mapDistpatchToProps)(App);