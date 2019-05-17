import React from 'react';
import { SwapiServiceConsumer } from 'components/SwapiServiceContext';

const withSwapiService = (Component, mapping) => {
  return (props) => {
    return (
      <SwapiServiceConsumer>
      {
        (swapiService) => {
          let methods = mapping(swapiService);
          return <Component {...props} {...methods} />
        }
      }
      </SwapiServiceConsumer>
    )
  }
}

export default withSwapiService;