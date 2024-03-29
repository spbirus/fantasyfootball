import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, leagueId, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        leagueId ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    leagueId: state.leagueData.leagueId,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
