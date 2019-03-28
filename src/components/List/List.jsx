import React, { Component } from 'react';

import './List.css';

export default class ItemList extends Component {

  render() {
    return (
      <ul className="List list-group">
        <li className="list-group-item">
          Luke Skywalker
        </li>
        <li className="list-group-item">
          Darth Vader
        </li>
        <li className="list-group-item">
          R2-D2
        </li>
      </ul>
    );
  }
}
