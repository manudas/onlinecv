import React, { Component } from 'react';

import Menu from '../menu';
import CVContainer from '../cvcontainer';
import ScrollBar from '../scrollBar';

class InfoContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
      if (!this.props.mounted) return null;
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