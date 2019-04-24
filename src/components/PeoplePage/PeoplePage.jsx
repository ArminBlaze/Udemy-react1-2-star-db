import React, { Component } from 'react';

import './PeoplePage.css';

import List from '../List/List';
import PersonDetails from '../PersonDetails/PersonDetails';

import ErrorIndicator from "components/ErrorIndicator/ErrorIndicator";

export default class PeoplePage extends Component {

  state = {
    selectedPerson: null,
    reactError: false,
  }

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

    let {selectedPerson} = this.state;

    return (
      <div className="row mb2 PeoplePage">
        <div className="col-md-6">
          <List onPersonClick={ this.onPersonClick }/>
        </div>
        <div className="col-md-6">
          <PersonDetails selectedPerson={ selectedPerson }/>
        </div>
      </div>
      
    )
  }
}