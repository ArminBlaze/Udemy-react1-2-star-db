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

const PersonList = NetworkWrapper(ListWithRenderFunction, getAllPeople, onLoad);
const PlanetList = NetworkWrapper(List, getAllPlanets, onLoad);
const StarshipList = NetworkWrapper(List, getAllStarships, onLoad);


export {
  PersonList,
  PlanetList,
  StarshipList,
}