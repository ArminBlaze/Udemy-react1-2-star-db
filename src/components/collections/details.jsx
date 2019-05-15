import React from 'react';

import ItemDetails, {Record} from '../ItemDetails/ItemDetails';
import SwapiService from "services/SwapiService";
// import NetworkWrapper from "helpers/NetworkWrapper";

const {       
  getPerson,
  getStarship,
  getPlanet,
  getPersonImage,
  getStarshipImage,
  getPlanetImage, 
} = new SwapiService();

// function onLoad (data) {
//   console.log(data);
//   this.setState({data});
// }


let PlanetDetails = ({itemId}) => {
  return (
    <ItemDetails 
      itemId={ itemId }
      getData={ getPlanet }
      getImageUrl={ getPlanetImage }>

      <Record field="population" label="Population:" />
      <Record field="diameter" label="Diameter:" />
      <Record field="rotationPeriod" label="Rotation Period:" />
    </ItemDetails>
  )
}


let PersonDetails = ({itemId}) => {
  return (
    <ItemDetails 
      itemId={ itemId }
      getData={ getPerson }
      getImageUrl={ getPersonImage }>
      
      <Record field="gender" label="Gender:" />
      <Record field="birthYear" label="Birth Year:" />
      <Record field="eyeColor" label="Eye Color:" />
    </ItemDetails>
  );
}


let StarshipDetails = ({itemId}) => {
  return (
    <ItemDetails 
      itemId={ itemId }
      getData={ getStarship }
      getImageUrl={ getStarshipImage }>

      <Record field="model" label="Model:" />
      <Record field="crew" label="Crew:" />
      <Record field="cost" label="Cost:" />
    </ItemDetails>
  );
}
  


export {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
}