import React, { Component } from 'react';

import './RandomPlanet.css';
import SwapiService from "services/SwapiService";
import Spinner from "components/Spinner/Spinner";


export default class RandomPlanet extends Component {

  state = {
    population: null,
    rotationPeriod: null,
    diameter: null,
    name: undefined,
    id: null
  }

  //инициализируем сервис для работы с сервером
  swapiService = new SwapiService();

  //в конструкторе получаем данные случайной планеты
  constructor() {
    super();
    this.updatePlanet();
  }

  
  updatePlanet() {
    let maxPlanetNumber = 19;
    let minPlanetNumber = 2;
    let id = generateRandom(minPlanetNumber, maxPlanetNumber);
    console.log(id);


    //получаем с сервера планету через сервис для работы с сервером
    this.swapiService.getPlanet(id)
    .then( (planet) => {
      console.log(planet);

      this.setState(planet);
    })


    function generateRandom(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    }
  }

  render() {
    //в имени вставляем пробел по умолчанию, чтобы не прыгала страница, пока не было загружено имя планеты
    const {population, rotationPeriod, diameter, name = "\u200B", id} = this.state;

    return (
      <div className="RandomPlanet jumbotron rounded">
        <Spinner />
        <img className="planet-image"
             src={ id ? (`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`) : ('') }
             alt={`Planet ${name}`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population:</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period:</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter:</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>

    );
  }
}
