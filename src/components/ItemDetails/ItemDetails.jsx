import React, { Component } from 'react';

import './ItemDetails.css';

import Spinner from "components/Spinner/Spinner";
import ErrorIndicator from "components/ErrorIndicator/ErrorIndicator";
// import ErrorButton from '../ErrorButton/ErrorButton';


let Record = ({item = null, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{ label }</span>
      <span>{ item[field] }</span>
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

  componentDidMount() {
    this.updatePerson();
  }

  updatePerson() {
    if(!this.state.loading) this.setState({loading: true})
    let {itemId, getData} = this.props;
    if(!itemId) {
      this.setState({loading: false});
      return;
    } 

    console.log('Начинаю загрузку данных updatePerson')

    getData(itemId)
    .then(this.onDataLoaded)
    .catch(this.onError)
    .finally( () => {
      this.setState({loading: false})
    })
  }

  componentDidUpdate(prevProps) {
    if(this.props.itemId !== prevProps.itemId) {

      this.updatePerson();
      console.log('обновить')
    }
  }

  onDataLoaded = (item) => {
    console.log('загрузил данные')
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
    console.log('itemId: ' + id);
    console.log(item);
    console.log(loading);

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
    const { 
      item,
      imageUrl, 
    } = this.props;

    console.log(item);

    const { 
      name = "\u200B",
      id,
    } = item;
    const { imageLoaded } = this.state;

    // const imageUrl = this.props.imageUrl;
  
    // style={imageLoaded ? 'visible' : 'hidden'}

    return (
      <React.Fragment>
        <img className="item-image"
          src={ id ? `${imageUrl}` : ''} 
          alt={name}
          onLoad={ this.onImageLoad }
          style={{visibility: `${imageLoaded ? 'visible' : 'hidden'}`}}
          />
  
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            { 
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
        </div>

        
      </React.Fragment>
    )
  }
}


