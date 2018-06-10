import React, { Component } from 'react';

import Menu from '../../containers/menu';
import CVContainer from '../cvcontainer';
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
        <CVContainer key='CVContainer' />,
        <ScrollBar key='ScrollBar' />
      ]
    );
    /*  /End of CV container
      ========================================================= */
  }
}

export default InfoContainer;