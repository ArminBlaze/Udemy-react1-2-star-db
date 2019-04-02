import React, { Component } from 'react';

import './RandomPlanet.css';
import SwapiService from "services/SwapiService";


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


      //т.к. формат Api не совсем совпадает с форматом нашего state, то мы не просто присваеваем планету полученную с сервера в state, а проходимся по свойствам. Отбрасываем лишние свойства, плюс можем изменить названия свойств на более удобные
      this.setState({
        name: planet.name,
        population: planet.population,
        diameter: planet.diameter,
        rotationPeriod: planet.rotation_period,
        id: id,
      })
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
        <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
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
