import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/authContext/AuthState";
import Loader from "../common/Loader";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authCxt = useContext(AuthContext);
  return  !authCxt.isLoading ? (
    <Route
      exact
      {...rest}
      render={(props) => 
        !authCxt.isAuthenticated && !authCxt.isLoading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  ):<Loader />
};

export default PrivateRoute;
