import React from 'react';
import Row from '../Row/Row';

import {
  PersonList,
  PersonDetails,
} from '../collections/index.js';

class PeoplePage extends React.Component {

  state = {}

  onPersonClick = (id) => {
    console.log(id);

    this.setState({
      selectedPerson: id
    })
  }

  render() {
    return (
      <Row 
        leftColumn={ <PersonList onItemClick={ this.onPersonClick } /> } 
        rightColumn={ <PersonDetails itemId={ this.state.selectedPerson }/> } 
      />
    )
  }

}

export {PeoplePage};