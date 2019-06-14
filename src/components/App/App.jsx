import React from 'react';

import Header from '../Header/Header';
import RandomPlanet from '../RandomPlanet/RandomPlanet';
import ErrorButton from '../ErrorButton/ErrorButton';
import ErrorIndicator from "components/ErrorIndicator/ErrorIndicator";

import { BrowserRouter as Router, Route } from 'react-router-dom';

import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
} from '../pages/index.js';

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
        <Router>
          <div className="StardbApp">
            <Header onServiceChange={this.onServiceChange}/>

            {this.state.showRandomPlanet ? <RandomPlanet updateInterval={20000}/> : null}

            <div className="row mb2 button-row">
              <button
                className="toggle-planet btn btn-warning btn-lg"
                onClick={this.toggleRandomPlanet}>
                Toggle Random Planet
              </button>
              <ErrorButton />
            </div>

            {/* <PeoplePage />
            <PlanetPage />
            <StarshipPage /> */}

            <Route path="/people" component={PeoplePage} />
            <Route path="/planets" component={PlanetsPage} />
            <Route path="/starships" component={StarshipsPage} />

          </div>
        </Router>
      </SwapiServiceProvider>
    );
  }

};

export default App;