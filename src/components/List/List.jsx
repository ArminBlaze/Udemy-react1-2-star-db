import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './List.css';


class ItemList extends Component {

  static defaultProps = {
    onItemClick: () => {},
  }

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    onItemClick: PropTypes.func,
    children: PropTypes.func.isRequired,
  }

  renderItems(arr) {
    return arr.map((item) => {
      //используем рендер-функцию для создания содержимого каждого Li
      //теперь стиль вывода информации задаётся в родительском компоненте
      // console.log(this.props);
      let renderFunc = this.props.children;
      let content = renderFunc(item);

      return (
        <li className="list-group-item" key={item.id}
        onClick={ () => this.props.onItemClick(item.id) }>
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