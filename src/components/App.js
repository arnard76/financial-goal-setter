import Home from "./Home";
import Check from "./Check";
import { PaymentsProvider } from "../contexts/PaymentsContext";
import { ModalsProvider } from "../contexts/ModalsContext";

// User Authentication stuff
import SignUp from "./Auth/SignUp";
import LogIn from "./Auth/LogIn";
import Profile from "./Auth/Profile";
import PasswordReset from "./Auth/PasswordReset";
import UpdateProfile from "./Auth/UpdateProfile";
import PrivateRoute from "./Auth/PrivateRoute"; // only accessable when logged in
import { AuthProvider } from "../contexts/AuthContext"; // to access auth info

import { BrowserRouter, Switch, Route } from "react-router-dom";

function AuthApp() {
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-800">
      <div className=" w-screen sm:max-w-md">
        <AuthProvider>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/forgot-password" component={PasswordReset} />

            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
          </Switch>
        </AuthProvider>
      </div>
    </div>
  );
}

function PaymentApp() {
  return (
    <PaymentsProvider>
      <ModalsProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/check" component={Check} />
        </Switch>
      </ModalsProvider>
    </PaymentsProvider>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            {/* All payment paths */}
            <PrivateRoute exact path="/" component={PaymentApp} />

            {/* All auth paths - logged out */}
            <Route path="/signup" component={AuthApp} />
            <Route path="/login" component={AuthApp} />
            <Route path="/forgot-password" component={AuthApp} />

            {/* All auth paths - logged in */}
            <PrivateRoute path="/profile" component={AuthApp} />
            <PrivateRoute path="/update-profile" component={AuthApp} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
