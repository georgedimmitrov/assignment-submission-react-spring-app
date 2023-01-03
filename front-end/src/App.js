import { Routes, Route } from "react-router-dom";
import "./App.css";
import AssignmentView from "./AssignmentView/AssignmentView";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import CodeReviewerDashboard from "./CodeReviewerDashboard";
import CodeReviewAssignmentView from "./CodeReviewAssignmentView";
import { useUser } from "./UserProvider";

function App() {
  const [roles, setRoles] = useState([]);
  const user = useUser();

  function getRolesFromJWT() {
    if (user.jwt) {
      const decodedJwt = jwt_decode(user.jwt);
      return decodedJwt.authorities;
    }
    return [];
  }

  useEffect(() => {
    setRoles(getRolesFromJWT());
  }, [user.jwt]);

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          roles.includes("ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewerDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
        }
      />
      <Route
        path="assignments/:id"
        element={
          roles.includes("ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewAssignmentView />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
