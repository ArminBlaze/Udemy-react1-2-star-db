import React, { Component } from 'react';

import './RandomPlanet.css';
import SwapiService from "services/SwapiService";
import Spinner from "components/Spinner/Spinner";
import ErrorIndicator from "components/ErrorIndicator/ErrorIndicator";
import PropTypes from 'prop-types';

export default class RandomPlanet extends Component {

  //добавили свойство loading, пока компонент не получит данные с сервера будет крутиться спиннер
  state = {
    loading: true,
    error: false,
    planet: {
      population: null,
      rotationPeriod: null,
      diameter: null,
      name: undefined,
      id: null,
    },
  }

  //инициализируем сервис для работы с сервером
  swapiService = new SwapiService();

  static defaultProps = {
    updateInterval: 10000,
  }

  static propTypes = {
    updateInterval: PropTypes.number,
  }

  //получение данных о планете тут. Гарантированно можно менять state, и есть DOM
  //Запускаем тут код, который создаёт побочные эффекты
  componentDidMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();

    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  
  updatePlanet = () => {
    let maxPlanetNumber = 19;
    let minPlanetNumber = 2;
    let id = this.generateRandom(minPlanetNumber, maxPlanetNumber);
    console.log(id);

    //получаем с сервера планету через сервис для работы с сервером
    this.swapiService.getPlanet(id)
    .then(this.onPlanetLoaded)
    .catch(this.onError)
    .finally( () => {
      this.setState({loading: false})
    })
  }

  generateRandom(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  onError = (err) => {
    console.log(err);
    this.setState({error: true})
  }

  onPlanetLoaded = (planet) => {
    console.log(planet);
    //когда данные загружены обновляем планету и меняем флаг загрузки, чтобы спрятать спиннер
    this.setState({planet});
  }

  render() {
    //планета теперь отдельный объект-свойство, поэтому у нас получается короткая деструктуризация
    const {planet, loading, error} = this.state;

    //если данные получены, то спиннер можно спрятать
    //также вся разметка компонента вынесена в отдельный компонент, для удобства
    return (
      <div className="RandomPlanet jumbotron rounded">
        {loading ? <Spinner /> : null}
        {error ? <ErrorIndicator /> : null}
        <PlanetView planet={planet}/>
      </div>
    );
  }
}

// RandomPlanet.defaultProps = {
//   updateInterval: 10000,
// }


const PlanetView = (props) => {
  const {population, rotationPeriod, diameter, name = "\u200B", id} = props.planet;

  //Чтобы не создавать лишнюю обёртку-div, мы можем использовать фрагмент. Так можно экспортировать несколько "корневых" элементов (ниже это img и div), обернув их виртуальной оберткой.
  return (
    <React.Fragment>
      <img className="planet-image"
             src={ id ? `https://starwars-visualguide.com/assets/img/planets/${id}.jpg` : '' }
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
    </React.Fragment>
  )
}
