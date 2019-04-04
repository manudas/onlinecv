import React, { Component } from 'react';

import Menu from '../../containers/menu';
import CVContainer from '../../containers/cvcontainer';
import ScrollBar from '../../containers/scrollBar';

class InfoContainer extends Component {

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