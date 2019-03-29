import React, { Component } from 'react';

import Menu from '../../containers/menu';
import CVContainer from '../../containers/cvcontainer';
import ScrollBar from '../scrollBar';

class InfoContainer extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    /* CV container
      ========================================================= */
    return (
      [
        <Menu key='Menu' />,
        <CVContainer key='CVContainer' language={this.props.language} />,
        <ScrollBar key='ScrollBar' />
      ]
    );
    /*  /End of CV container
      ========================================================= */
  }
}

export default InfoContainer;