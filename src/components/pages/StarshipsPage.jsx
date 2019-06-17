import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  StarshipList,
} from '../collections/index.js';

function StarshipsPage ( {history} ) {
  

  return (
    <StarshipList onItemClick={ onStarshipClick } />  
  )

  function onStarshipClick(id) {
    let newPath = `/starships/${id}`;

    history.push(newPath);
  }
}



let pageWithRouter = withRouter( StarshipsPage );

export {pageWithRouter as StarshipsPage};