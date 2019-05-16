import React from 'react';

import List from '../List/List';
import SwapiService from "services/SwapiService";
import NetworkWrapper from "helpers/NetworkWrapper";

const { getAllPlanets, getAllPeople, getAllStarships } = new SwapiService();

// const onLoad = (data) => {
//   console.log(data);
//   this.setState({data});
// }

function onLoad (data) {
  console.log(data);
  this.setState({data});
}

console.log(List);

const PersonList = NetworkWrapper(<List>{ (item) => item.name }</List>, getAllPeople, onLoad);
console.log(PersonList);

const PlanetList = NetworkWrapper(List, getAllPlanets, onLoad);

const StarshipList = NetworkWrapper(List, getAllStarships, onLoad);


export {
  PersonList,
  PlanetList,
  StarshipList,
}