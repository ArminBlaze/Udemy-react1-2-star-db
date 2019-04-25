import React, { Component } from 'react';

import './PeoplePage.css';

import List from '../List/List';
import PersonDetails from '../PersonDetails/PersonDetails';
import SwapiService from "services/SwapiService";

import ErrorIndicator from "components/ErrorIndicator/ErrorIndicator";

export default class PeoplePage extends Component {

  state = {
    selectedPerson: null,
    reactError: false,
  }

  swapiService = new SwapiService();

  onPersonClick = (id) => {
    console.log(id);
    this.setState({
      selectedPerson: id
    })
  }

  componentDidCatch() {
    console.log('componentDidCatch()');
    this.setState({
      reactError: true
    })
  }

  render() {
    if(this.state.reactError) return <div className="row mb2 PeoplePage"><ErrorIndicator /></div>

    return (
      <div className="row mb2 PeoplePage">
        <div className="col-md-6">
          <List onPersonClick={ this.onPersonClick }
            getData={ this.swapiService.getAllPeople }
            renderFunc={ (item) => `${item.name} (${item.gender}, ${item.birthYear})` }
          />
        </div>
        <div className="col-md-6">
          <PersonDetails selectedPerson={ this.state.selectedPerson }/>
        </div>
      </div>
    )
  }
}