import React from 'react';
import Row from '../Row/Row';

import {
  StarshipList,
  StarshipDetails,
} from '../collections/index.js';

class StarshipsPage extends React.Component {

  state = {}

  onStarshipClick = (id) => {
    console.log(id);

    this.setState({
      selectedStarship: id
    })
  }

  render() {
    return (
      <Row 
        leftColumn={ <StarshipList onItemClick={ this.onStarshipClick } /> } 
        rightColumn={ <StarshipDetails itemId={ this.state.selectedStarship } /> } 
      />
    )
  }
  
}

export {StarshipsPage};