import React from 'react';

import Header from '../Header/Header';
import RandomPlanet from '../RandomPlanet/RandomPlanet';
import List from '../List/List';
import PersonDetails from '../PersonDetails/PersonDetails';

import './App.css';

class App extends React.Component {

  state = {
    selectedPerson: null,
  }

  onPersonClick = (id) => {
    console.log(id);
    this.setState({
      selectedPerson: id
    })
  }


  render() {
    let {selectedPerson} = this.state;

    return (
      <div>
        <Header />
        <RandomPlanet />
  
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