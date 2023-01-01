import { Routes, Route } from "react-router-dom";
import "./App.css";
import AssignmentView from "./AssignmentView/AssignmentView";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import { useLocalStorage } from "./util/useLocalStorage";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import CodeReviewerDashboard from "./CodeReviewerDashboard";

function App() {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [roles, setRoles] = useState(getRolesFromJWT());

  function getRolesFromJWT() {
    if (jwt) {
      const decodedJwt = jwt_decode(jwt);
      return decodedJwt.authorities;
    }
    return [];
  }

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
          <PrivateRoute>
            <AssignmentView />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
