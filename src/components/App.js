import Home from "./Home";
import Check from "./Check";

// User Authentication stuff
import SignUp from "./Auth/SignUp";
import LogIn from "./Auth/LogIn";
import Profile from "./Auth/Profile";
import PasswordReset from "./Auth/PasswordReset";
import UpdateProfile from "./Auth/UpdateProfile";
import PrivateRoute from "./Auth/PrivateRoute"; // only accessable when logged in
import { AuthProvider } from "../contexts/AuthContext"; // to access auth info

import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function AuthApp() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
      }}
    >
      <div
        className="w-100"
        style={{
          maxWidth: "400px",
        }}
      >
        <AuthProvider>
          <Switch>
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/forgot-password" component={PasswordReset} />
            {/* <Route component={Check} /> */}
          </Switch>
        </AuthProvider>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />

          {/* All auth paths */}
          <PrivateRoute path="/profile" component={AuthApp} />
          <PrivateRoute path="/update-profile" component={AuthApp} />
          <Route path="/signup" component={AuthApp} />
          <Route path="/login" component={AuthApp} />
          <Route path="/forgot-password" component={AuthApp} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
