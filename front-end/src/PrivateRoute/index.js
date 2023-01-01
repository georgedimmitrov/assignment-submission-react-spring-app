import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ajax from "../services/fetchService";
import { useLocalStorage } from "../util/useLocalStorage";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);

  if (jwt) {
    ajax(`/api/auth/validate?token=${jwt}`, "GET", jwt).then((isValid) => {
      setIsLoading(false);
      setIsValid(isValid);
    });
  } else {
    return <Navigate to="/login" />;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : isValid ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
