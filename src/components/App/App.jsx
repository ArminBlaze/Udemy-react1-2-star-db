import React from 'react';

import Header from '../Header/Header';
import RandomPlanet from '../RandomPlanet/RandomPlanet';
import PeoplePage from '../PeoplePage/PeoplePage';
import ErrorButton from '../ErrorButton/ErrorButton';
import ErrorIndicator from "components/ErrorIndicator/ErrorIndicator";

import './App.css';

class App extends React.Component {

  state = {
    showRandomPlanet: true,
    reactError: false,
  }


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
      <div>
        <Header />

        {this.state.showRandomPlanet ? <RandomPlanet/> : null}
        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>
        <ErrorButton />

        <PeoplePage />
        <PeoplePage />
        <PeoplePage />
  
      </div>
    );
  }

};

export default App;