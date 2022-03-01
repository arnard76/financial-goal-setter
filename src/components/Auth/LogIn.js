import React, { createRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Message from "../Message";
// import FormGroup from "../FormGroup";
import FormGroup from "../FormGroup2";

export default function LogIn() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(event, email, pass) {
    try {
      // neccesary cuz user may try again and if different error, previous error should go away
      setLoading(true);
      setError("");
      await login(email, pass);
      history.push("/");
    } catch {
      setError("Username or password is incorrect");
      setLoading(false);
    }
  }

  return (
    <>
      <div className=" bg-gray-100 dark:bg-gray-900 p-4 rounded-md ">
        <h2 className=" text-center mb-4 text-2xl dark:text-white">Log In</h2>
        <form className="flex flex-col">
          <FormGroup label="Email">
            <input
              type="email"
              ref={emailRef}
              required
              placeholder="Please input your email address"
              className="form-input"
            />
          </FormGroup>
          <FormGroup label="Password">
            <input
              type="password"
              ref={passwordRef}
              required
              placeholder="Please input your password"
              className="form-input"
            />
          </FormGroup>
          <button
            disabled={loading}
            onClick={(e) => {
              // stops the form from submitting
              e.preventDefault();
              handleSubmit(
                e,
                emailRef.current.value,
                passwordRef.current.value
              );
            }}
            className="button"
          >
            Log In
          </button>
          <button
            disabled={loading}
            className="button"
            onClick={(e) => {
              handleSubmit(e, "guest@email.com", "youtdskjdfiu3333");
            }}
          >
            Login as guest
          </button>
        </form>
        {error && <Message type="error" message={error} />}
      </div>

      <p className="text-center mt-2 dark:text-white">
        Forgot your password?{" "}
        <Link to="/forgot-password" className="text-blue-500">
          Reset Password
        </Link>
      </p>
      <p className="text-center mt-2 dark:text-white">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </>
  );
}
