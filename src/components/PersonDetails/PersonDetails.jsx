import React, { Component } from 'react';

import './PersonDetails.css';

import SwapiService from "services/SwapiService";
import Spinner from "components/Spinner/Spinner";
import ErrorIndicator from "components/ErrorIndicator/ErrorIndicator";
import ErrorButton from '../ErrorButton/ErrorButton';

export default class PersonDetails extends Component {
  state = {
    loading: true,
    error: false,
    person: {
      eyeColor: null,
      gender: null,
      birthYear: null,
      name: "\u200B",
      id: null
    }
  }

  swapiService = new SwapiService();

  updatePerson() {
    if(!this.state.loading) this.setState({loading: true})
    let id = this.props.selectedPerson;
    if(!id) {
      this.setState({loading: false});
      return;
    } 

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
    console.log(this.state);
    const {person, loading, error, imageLoaded} = this.state;
    if(person) console.log(person);

    let id = this.props.selectedPerson;

    // if(!person) return <div className="PersonDetails card">Пожалуйста выберите персонажа из списка</div>

    return (
      <div className="PersonDetails card">
        {loading ? <Spinner /> : null}
        {error ? <ErrorIndicator /> : null}
        {id ? <PersonView person={person} imageLoaded={imageLoaded} /> : "Пожалуйста выберите персонажа из списка"}
        
      </div>
    )
  }
}

//проверить сколько раз запускается render
class PersonView extends Component {
  state = {
    imageLoaded: false,
  }

  componentDidUpdate(prevProps) {
    if(this.props.person !== prevProps.person) {
      this.setState({
        imageLoaded: false
      })
    }
  }


  onImageLoad = () => {
    this.setState({
      imageLoaded: true
    })
  }


  render() {
    const {eyeColor, gender, birthYear, name = "\u200B", id} = this.props.person;
    let {imageLoaded} = this.state;
  
    // style={imageLoaded ? 'visible' : 'hidden'}
  
    return (
      <React.Fragment>
        <img className="person-image"
          src={ id ? `https://starwars-visualguide.com/assets/img/characters/${id}.jpg` : ''} 
          alt={name}
          width="auto"
          height="209"
          onLoad={ this.onImageLoad }
          style={{visibility: `${imageLoaded ? 'visible' : 'hidden'}`}}
          />
  
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
            <li className="list-group-item">
              <ErrorButton />
            </li>
          </ul>
        </div>

        
      </React.Fragment>
    )
  }
}


