import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = ({onServiceChange}) => {
  return (
    <div className="Header d-flex">
      <h3>
        <a href="#/">
          StarDB
        </a>
      </h3>
      <ul className="d-flex">
        <li>
          <Link to="/people">People</Link>
        </li>
        <li>
          <Link to="/planets">Planets</Link>
        </li>
        <li>
          <Link to="/starships">Starships</Link>
        </li>
      </ul>
      <button 
      className="btn btn-primary btn-sm"
      type="button"
      onClick={onServiceChange}>Change API service</button>
    </div>
  )
}

export default Header;