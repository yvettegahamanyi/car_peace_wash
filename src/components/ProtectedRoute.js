import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const ProtectedRoute = ({ component: Component, user, permissions, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (user) {
          if(permissions.indexOf(jwtDecode(user).role) !== -1){
            return <Component {...rest} {...props} />
          }
          else{
            return <Redirect to={
              {
                pathname: '/unauthorized',
                state: {
                  from: props.location
                }
              }
            } />
          }
        } else {
          return <Redirect to={
            {
              pathname: '/unauthorized',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;