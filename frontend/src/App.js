import React, { Component } from 'react';

import './assets/bootstrap/css/bootstrap.css';
import './assets/font-awesome/css/font-awesome.css';
import './App.css';

import PageLoader from './components/pageloader';
import InfoContainer from './components/infoContainer';

import { getBase64ImageMimeType } from './helpers/image';

import { connect } from 'react-redux';

import { dataDidLoad } from './actions';

import { bindActionCreators } from 'redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPageLoader: true,
    }
  }

  componentDidMount() {
    const language = this.props.selectedLanguage ? this.props.selectedLanguage : 'en';
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
          onTransitionEnd={this.transitionEnd______________________________________________} 
          mounted={this.state.showPageLoader} 
          userData={window.dataSet.userData} />
        <InfoContainer />

      </div>
    );
  }
}

function mapStateToProps(state) {
  let data = (state && state.data) ? state.data : null;
  let bgimage = (data && data.images && data.images.bgimage) ? data.images.bgimage : null;
  return {
    background: bgimage ? Buffer.from(bgimage.value.data).toString('base64') : null
  };
}

function mapDistpatchToProps(dispatch) {
  return bindActionCreators({
    dataLoaded: dataDidLoad
  }, dispatch);
}

export default connect(mapStateToProps, mapDistpatchToProps)(App);