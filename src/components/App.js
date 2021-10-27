import Home from "./Home";
import Check from "./Check";

// User Authentication stuff
import SignUp from "./Auth/SignUp";
import LogIn from "./Auth/LogIn";
// import Profile from "./Auth/Profile";
// import PasswordReset from "./Auth/PasswordReset";
// import UpdateProfile from "./Auth/UpdateProfile";
import PrivateRoute from "./Auth/PrivateRoute"; // only accessable when logged in
import { AuthProvider } from "../contexts/AuthContext"; // to access auth info

import { BrowserRouter, Switch, Route } from "react-router-dom";

function AuthApp() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className=" w-screen max-w-md">
        <AuthProvider>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />

            {/* <PrivateRoute path="/profile" component={Profile} /> */}
            {/* <PrivateRoute path="/update-profile" component={UpdateProfile} />
             <Route path="/forgot-password" component={PasswordReset} /> 
             <Route component={Check} /> */}
          </Switch>
        </AuthProvider>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/check" component={Check} />

            {/* All auth paths */}
            <Route path="/login" component={AuthApp} />
            <Route path="/signup" component={AuthApp} />
            {/* <PrivateRoute path="/profile" component={AuthApp} /> */}
            {/*<PrivateRoute path="/update-profile" component={AuthApp} />
            <Route path="/forgot-password" component={AuthApp} /> */}
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
