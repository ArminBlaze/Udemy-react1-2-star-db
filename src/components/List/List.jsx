import React, { Component } from 'react';

import SwapiService from "services/SwapiService";

import './List.css';


class ItemList extends Component {

  renderItems(arr) {
    return arr.map((item) => {
      //используем рендер-функцию для создания содержимого каждого Li
      //теперь стиль вывода информации задаётся в родительском компоненте
      let renderFunc = this.props.children;
      let content = renderFunc(item);

      return (
        <li className="list-group-item" key={item.id}
        onClick={ () => this.props.onPersonClick(item.id) }>
          {content}
        </li>
      )
    })
  }

  render() {
    const data = this.props.data;
    
    return (
      <ul className="List list-group">
			  { this.renderItems(data) }
		  </ul>
    );
  }
}

export default ItemList;