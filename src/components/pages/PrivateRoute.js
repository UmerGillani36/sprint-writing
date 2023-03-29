import React, { useContext } from "react";
import { AuthContext } from "./auth";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  //const navigate = useNavigate();
  return (
    <Route
      {...rest}
      exact
      render={(props) =>
        user ? <Component {...props} /> : <Navigate to="/"/>
      }
    />
  );
};

export default PrivateRoute;
