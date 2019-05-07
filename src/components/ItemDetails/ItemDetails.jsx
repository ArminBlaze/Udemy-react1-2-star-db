import React, { Component } from 'react';

import './ItemDetails.css';

import Spinner from "components/Spinner/Spinner";
import ErrorIndicator from "components/ErrorIndicator/ErrorIndicator";
import ErrorButton from '../ErrorButton/ErrorButton';


let Record = ({item = null, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{field}</span>
    </li>
  )
};

export {Record};

export default class ItemDetails extends Component {
  state = {
    loading: true,
    error: false,
    imageUrl: null,

    item: {
      eyeColor: null,
      gender: null,
      birthYear: null,
      name: "\u200B",
      id: null
    }
  }

  updatePerson() {
    if(!this.state.loading) this.setState({loading: true})
    let {itemId, getData} = this.props;
    if(!itemId) {
      this.setState({loading: false});
      return;
    } 

    getData(itemId)
    .then(this.onDataLoaded)
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

  onDataLoaded = (item) => {
    let getImageUrl = this.props.getImageUrl;
    //когда данные загружены обновляем планету и меняем флаг загрузки, чтобы спрятать спиннер
    this.setState({
      item: item,
      imageUrl: getImageUrl(item)
    });
  }

  onError = (err) => {
    console.log(err);
    this.setState({error: true})
  }


  render() {
    const {item, loading, error, imageUrl} = this.state;

    let id = this.props.itemId;
    let personView = <PersonView item={item} imageUrl={imageUrl} >
      {this.props.children}
    </PersonView>

    // if(!item) return <div className="ItemDetails card">Пожалуйста выберите персонажа из списка</div>

    return (
      <div className="ItemDetails card">
        {loading ? <Spinner /> : null}
        {error ? <ErrorIndicator /> : null}
        {id ? personView : "Пожалуйста выберите персонажа из списка"}
        
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
    if(this.props.item !== prevProps.item) {
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
    const {eyeColor, gender, birthYear, name = "\u200B", id} = this.props.item;
    const imageUrl = this.props.imageUrl;
    let {imageLoaded} = this.state;
  
    // style={imageLoaded ? 'visible' : 'hidden'}

    return (
      <React.Fragment>
        <img className="item-image"
          src={ id ? `${imageUrl}` : ''} 
          alt={name}
          width="auto"
          height="209"
          onLoad={ this.onImageLoad }
          style={{visibility: `${imageLoaded ? 'visible' : 'hidden'}`}}
          />
  
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            { 
              React.Children.map(this.props.children, (child) => {
                return child;
              })
            }
          </ul>
        </div>

        
      </React.Fragment>
    )
  }
}


