import React, { Component } from 'react';

import './PersonDetails.css';

import SwapiService from "services/SwapiService";
import Spinner from "components/Spinner/Spinner";
import ErrorIndicator from "components/ErrorIndicator/ErrorIndicator";

export default class PersonDetails extends Component {
  state = {
    loading: true,
    error: false,
    person: null
  }

  swapiService = new SwapiService();

  updatePerson() {
    let id = this.props.selectedPerson;
    if(!id) return;

    this.swapiService.getPerson(id)
    .then(this.onPersonLoaded)
    .catch(this.onError)
    .finally( () => {
      this.setState({loading: false})
    })
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if(this.props.selectedPerson !== prevProps.selectedPerson) {
      this.updatePerson();
      console.log('обновить')
    }
  }

  onPersonLoaded = (person) => {
    console.log(person);
    //когда данные загружены обновляем планету и меняем флаг загрузки, чтобы спрятать спиннер
    this.setState({person});
  }

  onError = (err) => {
    console.log(err);
    this.setState({error: true})
  }


  render() {
    const {person, loading, error} = this.state;
    if(person) console.log(person);

    if(!person) return <div className="PersonDetails card">Пожалуйста выберите персонажа из списка</div>

    return (
      <div className="PersonDetails card">
        {loading ? <Spinner /> : null}
        {error ? <ErrorIndicator /> : null}
        <PersonView person={person}/>
      </div>
    )
  }
}

let PersonView = (props) => {
  const {eyeColor, gender, birthYear, name = "\u200B", id} = props.person;
 

  return (
    <React.Fragment>
      <img className="person-image"
        src={ id ? `https://starwars-visualguide.com/assets/img/characters/${id}.jpg` : ''} alt={name}/>

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}
