import React from 'react';

import Header from '../Header/Header';
import RandomPlanet from '../RandomPlanet/RandomPlanet';
import List from '../List/List';
import ErrorButton from '../ErrorButton/ErrorButton';
import PersonDetails from '../PersonDetails/PersonDetails';
import ErrorIndicator from "components/ErrorIndicator/ErrorIndicator";

import './App.css';

class App extends React.Component {

  state = {
    selectedPerson: null,
    showRandomPlanet: true,
    reactError: false,
  }

  onPersonClick = (id) => {
    console.log(id);
    this.setState({
      selectedPerson: id
    })
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

    let {selectedPerson} = this.state;

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
  
        <div className="row mb2">
          <div className="col-md-6">
            <List onPersonClick={ this.onPersonClick }/>
          </div>
          <div className="col-md-6">
            <PersonDetails selectedPerson={ selectedPerson }/>
          </div>
        </div>
      </div>
    );
  }

};

export default App;