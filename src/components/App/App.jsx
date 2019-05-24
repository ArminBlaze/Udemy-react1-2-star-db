import React from 'react';

import Header from '../Header/Header';
import RandomPlanet from '../RandomPlanet/RandomPlanet';
// import PeoplePage from '../PeoplePage/PeoplePage';
import ErrorButton from '../ErrorButton/ErrorButton';
import ErrorIndicator from "components/ErrorIndicator/ErrorIndicator";
import Row from '../Row/Row';
import {
  PersonList,
  PlanetList,
  StarshipList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
} from '../collections/index.js';

import SwapiService from "services/SwapiService";
import DummySwapiService from "services/DummySwapiService";

import { SwapiServiceProvider } from '../SwapiServiceContext';

import './App.css';

class App extends React.Component {

  state = {
    showRandomPlanet: true,
    reactError: false,
    swapiService: new SwapiService(),
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  onServiceChange = () => {
    this.setState( ({swapiService}) => {
      const Service = (swapiService instanceof SwapiService) 
      ? DummySwapiService : SwapiService;

      return { swapiService: new Service() }
    })
  }

  onPlanetClick = (id) => {
    console.log(id);

    this.setState({
      selectedPlanet: id
    })
  }

  onPersonClick = (id) => {
    console.log(id);

    this.setState({
      selectedPerson: id
    })
  }

  onStarshipClick = (id) => {
    console.log(id);

    this.setState({
      selectedStarship: id
    })
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
      <SwapiServiceProvider value={ this.state.swapiService }>
        <div className="StardbApp">
          <Header onServiceChange={this.onServiceChange}/>

          {this.state.showRandomPlanet ? <RandomPlanet/> : null}

          <div className="row mb2 button-row">
            <button
              className="toggle-planet btn btn-warning btn-lg"
              onClick={this.toggleRandomPlanet}>
              Toggle Random Planet
            </button>
            <ErrorButton />
          </div>
          

          {/* <PeoplePage /> */}

          <Row 
            leftColumn={ <PersonList onItemClick={ this.onPersonClick } /> } 
            rightColumn={ <PersonDetails itemId={ this.state.selectedPerson }/> 
            } 
          />

          <Row 
            leftColumn={ <PlanetList onItemClick={ this.onPlanetClick } /> } 
            rightColumn={ <PlanetDetails itemId={ this.state.selectedPlanet } /> } 
          />

          <Row 
            leftColumn={ <StarshipList onItemClick={ this.onStarshipClick } /> } 
            rightColumn={ <StarshipDetails itemId={ this.state.selectedStarship } /> } 
          />
    
        </div>
      </SwapiServiceProvider>
    );
  }

};

export default App;