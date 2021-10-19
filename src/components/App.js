import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <BrowserRouter>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
          </BrowserRouter>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
