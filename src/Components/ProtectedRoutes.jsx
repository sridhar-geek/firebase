/** This component use to protect user routes
 it redirects to login page if user is not exists */

import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
// Imports from anthor files
import {appContext} from '../App'

const ProtectedRoute = () => {
  const { userDetails } = useContext(appContext);
  return userDetails?.accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
