import ItemDetails from '../ItemDetails/ItemDetails';
import SwapiService from "services/SwapiService";
import NetworkWrapper from "helpers/NetworkWrapper";

const {       
  getPerson,
  getStarship,
  getPlanet,
  getPersonImage,
  getStarshipImage,
  getPlanetImage, 
} = new SwapiService();

function onLoad (data) {
  console.log(data);
  this.setState({data});
}

const PersonDetails = NetworkWrapper(ItemDetails, getPerson, onLoad)

const PlanetDetails = NetworkWrapper(ItemDetails, getPlanet, onLoad);

const StarshipDetails = NetworkWrapper(ItemDetails, getStarship, onLoad);


export {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
}