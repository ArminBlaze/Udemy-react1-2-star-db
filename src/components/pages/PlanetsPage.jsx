import React from 'react';
import Row from '../Row/Row';

import {
  PlanetList,
  PlanetDetails,
} from '../collections/index.js';

class PlanetsPage extends React.Component {

  state = {}

  onPlanetClick = (id) => {
    console.log(id);

    this.setState({
      selectedPlanet: id
    })
  }

  render() {
    return (
      <Row 
        leftColumn={ <PlanetList onItemClick={ this.onPlanetClick } /> } 
        rightColumn={ <PlanetDetails itemId={ this.state.selectedPlanet } /> } 
      />
    )
  }
  
}

export {PlanetsPage};