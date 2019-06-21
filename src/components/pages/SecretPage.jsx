import React from 'react';
import { Redirect } from 'react-router-dom';

const SecretPage = ({ isLoggedIn }) => {
  if(!isLoggedIn) return <Redirect to='/login'/>;

  return (
    <div className='jumbotron text-center'>
      <h3>Очень важная и секретная информация.</h3>
    </div>
  )
};

export {SecretPage};