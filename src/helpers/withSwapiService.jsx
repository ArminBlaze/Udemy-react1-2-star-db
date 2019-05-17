import React from 'react';
import { SwapiServiceConsumer } from 'components/SwapiServiceContext';

const withSwapiService = (Component) => {
  return (props) => {
    return (
      <SwapiServiceConsumer>
      {
        (swapiService) => {
          return <Component {...props} swapiService={ swapiService } />
        }
      }
      </SwapiServiceConsumer>
    )
  }
}

export default withSwapiService;