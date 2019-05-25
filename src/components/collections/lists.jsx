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


const NetworkList1 = NetworkWrapper(ListWithRenderFunction, onLoad);
let mappingForPersons = (swapiService) => {
  return { getData: swapiService.getAllPeople }
}
const PersonList = withSwapiService(NetworkList1, mappingForPersons);


const NetworkList2 = NetworkWrapper(ListWithRenderFunction, onLoad);

let mappingForPlanets = (swapiService) => {
  return { getData: swapiService.getAllPlanets }
}
const PlanetList = withSwapiService(NetworkList2, mappingForPlanets);


const NetworkList3 = NetworkWrapper(ListWithRenderFunction, onLoad);

let mappingForStarships = (swapiService) => {
  return { getData: swapiService.getAllStarships }
}
const StarshipList = withSwapiService(NetworkList3, mappingForStarships);


export {
  PersonList,
  PlanetList,
  StarshipList,
}