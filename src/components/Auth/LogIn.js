import React, { createRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../Button";
import Message from "../Message";
import FormGroup from "../FormGroup";

export default function LogIn() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(event) {
    // stops the form from submitting
    event.preventDefault();

    try {
      // neccesary cuz user may try again and if different error, previous error should go away
      setLoading(true);
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Username or password is incorrect");
      setLoading(false);
    }
  }

  return (
    <>
      <div className=" bg-gray-100 p-4 rounded-md ">
        <h2 className=" text-center mb-4 text-2xl">Log In</h2>
        <form className="flex flex-col">
          <FormGroup
            type="email"
            label="Email"
            required={true}
            ref={emailRef}
          />
          <FormGroup
            type="password"
            label="Password"
            required={true}
            ref={passwordRef}
          />
          <button disabled={loading} onClick={handleSubmit}>
            <Button>Log In</Button>
          </button>
        </form>
        {error && <Message type="error" message={error} />}
      </div>

      <div className="text-center mt-2">
        <p>
          Forgot your password?{" "}
          <Link to="/forgot-password" className="text-blue-500">
            Reset Password
          </Link>
        </p>
      </div>
      <div className="text-center mt-2">
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}
