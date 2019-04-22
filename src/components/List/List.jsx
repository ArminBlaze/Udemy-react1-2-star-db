import React, { Component } from 'react';

import './List.css';

import SwapiService from "services/SwapiService";
import Spinner from "components/Spinner/Spinner";
import ErrorIndicator from "components/ErrorIndicator/ErrorIndicator";

export default class ItemList extends Component {

  state = {
    peopleList: null,
    loading: true,
    error: false,
  }

  swapiService = new SwapiService();

  componentDidMount() {
    this.swapiService.getAllPeople()
    .then(this.onPeopleLoaded)
    .catch(this.onError)
    .finally( () => {
      this.setState({loading: false})
    })
  }

  onPeopleLoaded = (peopleList) => {
    console.log(peopleList);
    //когда данные загружены обновляем планету и меняем флаг загрузки, чтобы спрятать спиннер
    this.setState({peopleList});
  }

  onError = (err) => {
    console.log(err);
    this.setState({error: true})
  }

  renderItems(arr) {
    return arr.map((item) => {
      return (
        <li className="list-group-item" key={item.id}
        onClick={ () => this.props.onPersonClick(item.id) }>
          {item.name}
        </li>
      )
    })
  }


  render() {
    const {peopleList, loading, error} = this.state;
    let showContent = !loading && !error;

    
    return (
      <ul className="List list-group">
			  {loading ? <Spinner /> : null}
        {error ? <ErrorIndicator /> : null}
        {showContent ? this.renderItems(peopleList) : null }
		  </ul>
    );
  }
}