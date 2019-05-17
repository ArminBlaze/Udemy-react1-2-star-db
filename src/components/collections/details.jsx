import React from 'react';

import ItemDetails, {Record} from '../ItemDetails/ItemDetails';
import withSwapiService from "helpers/withSwapiService";
// import { SwapiServiceConsumer } from '../SwapiServiceContext';


let PlanetDetails = ({itemId, getData, getImageUrl}) => {
  return (
    <ItemDetails 
    itemId={ itemId }
    getData={ getData }
    getImageUrl={ getImageUrl }>

      <Record field="population" label="Population:" />
      <Record field="diameter" label="Diameter:" />
      <Record field="rotationPeriod" label="Rotation Period:" />
    </ItemDetails>
  )
}

let mappingForPlanet = (swapiService) => {
  return {
    getData: swapiService.getPlanet,
    getImageUrl: swapiService.getPlanetImage,
  }
}

let PlanetDetailsWithServer = withSwapiService(PlanetDetails, mappingForPlanet);


let PersonDetails = (props) => {
  return (
    <ItemDetails {...props}>
      
      <Record field="gender" label="Gender:" />
      <Record field="birthYear" label="Birth Year:" />
      <Record field="eyeColor" label="Eye Color:" />
    </ItemDetails>
  );
}

let mappingForPerson = (swapiService) => {
  return {
    getData: swapiService.getPerson,
    getImageUrl: swapiService.getPersonImage,
  }
}

let PersonDetailsWithServer = withSwapiService(PersonDetails, mappingForPerson);


let StarshipDetails = (props) => {
  return (
    <ItemDetails {...props}>

      <Record field="model" label="Model:" />
      <Record field="crew" label="Crew:" />
      <Record field="cost" label="Cost:" />
    </ItemDetails>
  );
}

let mappingForStarship = (swapiService) => {
  return {
    getData: swapiService.getStarship,
    getImageUrl: swapiService.getStarshipImage,
  }
}

let StarshipDetailsWithServer = withSwapiService(StarshipDetails, mappingForStarship);

  

export {
  PlanetDetailsWithServer as PlanetDetails,
  PersonDetailsWithServer as PersonDetails,
  StarshipDetailsWithServer as StarshipDetails,
}