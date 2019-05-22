import React from 'react';
import { SwapiServiceConsumer } from 'components/SwapiServiceContext';

const withSwapiService = (Component, mapMethodsToProps) => {
  return (props) => {
    return (
      <SwapiServiceConsumer>
      {
        (swapiService) => {
          let methods = mapMethodsToProps(swapiService);
          return <Component {...props} {...methods} />
        }
      }
      </SwapiServiceConsumer>
    )
  }
}

export default withSwapiService;