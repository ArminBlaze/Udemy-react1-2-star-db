import React from 'react';

import Header from '../Header/Header';
import RandomPlanet from '../RandomPlanet/RandomPlanet';
import PeoplePage from '../PeoplePage/PeoplePage';
import ErrorButton from '../ErrorButton/ErrorButton';
import ErrorIndicator from "components/ErrorIndicator/ErrorIndicator";
import Row from '../Row/Row';

import List from '../List/List';
import ItemDetails, {Record} from '../ItemDetails/ItemDetails';
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

    let {
      getPerson,
      getStarship,
      getPlanet,
      getPersonImage,
      getStarshipImage,
      getPlanetImage,
    } = this.swapiService;

    let personDetails = (
      <ItemDetails 
        itemId={ 11 }
        getData={ getPerson }
        getImageUrl={ getPersonImage }>
        
        <Record field="gender" label="Gender:" />
        <Record field="birthYear" label="Birth Year:" />
        <Record field="eyeColor" label="Eye Color:" />
      </ItemDetails>
    );

    let starshipDetails = (
      <ItemDetails 
        itemId={ 15 }
        getData={ getStarship }
        getImageUrl={ getStarshipImage }>

        <Record field="model" label="Model:" />
        <Record field="crew" label="Crew:" />
        <Record field="cost" label="Cost:" />
      </ItemDetails>
    );

    // let planetDetails = (
    //   <ItemDetails itemId={ 5 }
    //   getData={ getPlanet }
    //   getImageUrl={ getPlanetImage }/>
    // );

    return (
      <div className="StardbApp">
        <Header />

        <Row 
          leftColumn={ personDetails } 
          rightColumn={ starshipDetails } 
        />

        {/* {this.state.showRandomPlanet ? <RandomPlanet/> : null} */}

        {/* <div className="row mb2 button-row">
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div> */}
        

        {/* <PeoplePage /> */}


        {/* <Row 
          leftColumn={
            <List 
              onPersonClick={ this.onPersonClick }
              getData={ this.swapiService.getAllPlanets }
              // в рендер функции можно передавать JSX разметку
              renderFunc={ (item) => (<span>{item.name} <button>!</button></span>) }
            /> 
          } 
          rightColumn={
            <ItemDetails selectedPerson={ this.state.selectedPerson } />
          } 
        /> */}


        {/* <Row 
          leftColumn={ 
            <List 
              onPersonClick={ this.onPersonClick }
              getData={ this.swapiService.getAllStarships }
              renderFunc={ (item) => item.name }
            /> 
          } 
          rightColumn={ 
            <ItemDetails selectedPerson={ this.state.selectedPerson }/> 
          } 
        /> */}
  
      </div>
    );
  }

};

export default App;