import React from 'react';

import ItemDetails, {Record} from '../ItemDetails/ItemDetails';
import { SwapiServiceConsumer } from '../SwapiServiceContext';


let PlanetDetails = ({itemId}) => {
  return (
    <SwapiServiceConsumer>
      {
        ({getPlanet, getPlanetImage}) => {
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
      }
    </SwapiServiceConsumer>
  )
}


let PersonDetails = ({itemId}) => {
  return (
    <SwapiServiceConsumer>
    {
      ({getPerson, getPersonImage}) => {
        return (
          <ItemDetails 
            itemId={ itemId }
            getData={ getPerson }
            getImageUrl={ getPersonImage }>
            
            <Record field="gender" label="Gender:" />
            <Record field="birthYear" label="Birth Year:" />
            <Record field="eyeColor" label="Eye Color:" />
          </ItemDetails>
        )
      }
    }
    </SwapiServiceConsumer>
  );
}


let StarshipDetails = ({itemId}) => {
  return (
    <SwapiServiceConsumer>
    {
      ({getStarship, getStarshipImage}) => {
        return (
          <ItemDetails 
            itemId={ itemId }
            getData={ getStarship }
            getImageUrl={ getStarshipImage }>
      
            <Record field="model" label="Model:" />
            <Record field="crew" label="Crew:" />
            <Record field="cost" label="Cost:" />
          </ItemDetails>
        )
      }
    }
    </SwapiServiceConsumer>
  );
}
  

export {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
}