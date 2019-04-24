import React from 'react';

import Header from '../Header/Header';
import RandomPlanet from '../RandomPlanet/RandomPlanet';
import PeoplePage from '../PeoplePage/PeoplePage';
import ErrorButton from '../ErrorButton/ErrorButton';
import ErrorIndicator from "components/ErrorIndicator/ErrorIndicator";

import List from '../List/List';
import PersonDetails from '../PersonDetails/PersonDetails';
import SwapiService from "services/SwapiService";

import './App.css';

class App extends React.Component {

  state = {
    showRandomPlanet: true,
    reactError: false,
  }

  swapiService = new SwapiService();


  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  }


  //ловим непойманные ошибки в методах реакта
  componentDidCatch() {
    console.log('componentDidCatch()');
    this.setState({
      reactError: true
    })
  }

  render() {
    if(this.state.reactError) return <ErrorIndicator />

    return (
      <div className="StardbApp">
        <Header />

        {this.state.showRandomPlanet ? <RandomPlanet/> : null}

        <div className="row mb2 button-row">
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div>
        

        <PeoplePage />


        <div className="row mb2 PeoplePage">
          <div className="col-md-6">
            <List onPersonClick={ this.onPersonClick }
            getData={ this.swapiService.getAllStarships }
            />
          </div>
          <div className="col-md-6">
            <PersonDetails selectedPerson={ this.state.selectedPerson }
            />
          </div>
        </div>


        <div className="row mb2 PeoplePage">
          <div className="col-md-6">
            <List onPersonClick={ this.onPersonClick }
            getData={ this.swapiService.getAllStarships }
            />
          </div>
          <div className="col-md-6">
            <PersonDetails selectedPerson={ this.state.selectedPerson }/>
          </div>
        </div>
  
      </div>
    );
  }

};

export default App;