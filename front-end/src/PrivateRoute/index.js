import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ajax from "../services/fetchService";
import { useUser } from "../UserProvider";

const PrivateRoute = ({ children }) => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);

  if (user.jwt) {
    ajax(`/api/auth/validate?token=${user.jwt}`, "GET", user.jwt).then(
      (isValid) => {
        setIsLoading(false);
        setIsValid(isValid);
      }
    );
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
