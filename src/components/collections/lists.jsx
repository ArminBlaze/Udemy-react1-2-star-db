import React from 'react';

import List from '../List/List';
// import SwapiService from "services/SwapiService";
import withSwapiService from "helpers/withSwapiService";
import NetworkWrapper from "helpers/NetworkWrapper";

// const { getAllPlanets, getAllPeople, getAllStarships } = new SwapiService();

// const onLoad = (data) => {
//   console.log(data);
//   this.setState({data});
// }

function onLoad (data) {
  this.setState({data});
}

const WithRenderFunction = (Component, fn) => {
  return (props) => {
    return (<Component {...props}>
      {fn}
    </Component>)
  }
}


const ListWithRenderFunction = WithRenderFunction(
  List, 
  (item) => item.name
);


const PersonList = NetworkWrapper(ListWithRenderFunction, onLoad);
let mappingForPersons = (swapiService) => {
  return { getData: swapiService.getAllPeople }
}
const PersonListWithSwapiService = withSwapiService(PersonList, mappingForPersons);


const PlanetList = NetworkWrapper(ListWithRenderFunction, onLoad);
let mappingForPlanets = (swapiService) => {
  return { getData: swapiService.getAllPlanets }
}
const PlanetListWithSwapiService = withSwapiService(PlanetList, mappingForPlanets);


const StarshipList = NetworkWrapper(ListWithRenderFunction, onLoad);
let mappingForStarships = (swapiService) => {
  return { getData: swapiService.getAllStarships }
}
const StarshipListWithSwapiService = withSwapiService(StarshipList, mappingForStarships);


export {
  PersonListWithSwapiService as PersonList,
  PlanetListWithSwapiService as PlanetList,
  StarshipListWithSwapiService as StarshipList,
}