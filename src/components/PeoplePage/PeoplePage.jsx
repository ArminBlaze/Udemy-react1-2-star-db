import React, { Component } from 'react';

import './PeoplePage.css';

import List from '../List/List';
import Row from '../Row/Row';
import ItemDetails from '../ItemDetails/ItemDetails';
import SwapiService from "services/SwapiService";
import ErrorBoundry from "components/ErrorBoundry/ErrorBoundry";


export default class PeoplePage extends Component {

  state = {
    selectedPerson: null,
  }

  swapiService = new SwapiService();

  onPersonClick = (id) => {
    console.log(id);
    this.setState({
      selectedPerson: id
    })
  }


  render() {
    // if(this.state.reactError) return <div className="row mb2 PeoplePage"><ErrorIndicator /></div>

    let itemList = (
      <List onPersonClick={ this.onPersonClick }
        getData={ this.swapiService.getAllPeople }
        renderFunc={ (item) => `${item.name} (${item.gender}, ${item.birthYear})` }
      />
    );
    let personDetails = (
      <ErrorBoundry>
        <ItemDetails selectedPerson={ this.state.selectedPerson }/>
      </ErrorBoundry>
    );

    return (
        <Row leftColumn={ itemList } rightColumn={ personDetails } />
    )
  }
}