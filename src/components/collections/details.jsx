import React from 'react';

import ItemDetails, {Record} from '../ItemDetails/ItemDetails';
import withSwapiService from "helpers/withSwapiService";
// import { SwapiServiceConsumer } from '../SwapiServiceContext';


let PlanetDetails = ({itemId, swapiService}) => {

  return (
    <ItemDetails 
      itemId={ itemId }
      getData={ swapiService.getPlanet }
      getImageUrl={ swapiService.getPlanetImage }>

      <Record field="population" label="Population:" />
      <Record field="diameter" label="Diameter:" />
      <Record field="rotationPeriod" label="Rotation Period:" />
    </ItemDetails>
  )
}


let PersonDetails = ({itemId, swapiService}) => {
  return (
    <ItemDetails 
      itemId={ itemId }
      getData={ swapiService.getPerson }
      getImageUrl={ swapiService.getPersonImage }>
      
      <Record field="gender" label="Gender:" />
      <Record field="birthYear" label="Birth Year:" />
      <Record field="eyeColor" label="Eye Color:" />
    </ItemDetails>
  );
}


let StarshipDetails = ({itemId, swapiService}) => {
  return (
    <ItemDetails 
      itemId={ itemId }
      getData={ swapiService.getStarship }
      getImageUrl={ swapiService.getStarshipImage }>

      <Record field="model" label="Model:" />
      <Record field="crew" label="Crew:" />
      <Record field="cost" label="Cost:" />
    </ItemDetails>
  );
}

let PlanetDetailsWithServer = withSwapiService(PlanetDetails);
let PersonDetailsWithServer = withSwapiService(PersonDetails);
let StarshipDetailsWithServer = withSwapiService(StarshipDetails);

  

export {
  PlanetDetailsWithServer as PlanetDetails,
  PersonDetailsWithServer as PersonDetails,
  StarshipDetailsWithServer as StarshipDetails,
}