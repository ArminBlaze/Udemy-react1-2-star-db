import React from 'react';
import Row from '../Row/Row';
import { withRouter } from 'react-router-dom';

import {
  PersonList,
  PersonDetails,
} from '../collections/index.js';

function PeoplePage ( {match, history} ) {

  function onPersonClick (id) {
    console.log(id);

    history.push(id);
  }

  return (
    <Row 
      leftColumn={ <PersonList onItemClick={ onPersonClick } /> } 
      rightColumn={ <PersonDetails itemId={ match.params.id } /> }
    />
  )

}

let pageWithRouter = withRouter( PeoplePage );

export {pageWithRouter as PeoplePage};