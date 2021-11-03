import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import FormGroup from "../FormGroup";
import Message from "../Message";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(event) {
    // stops the form from submitting
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords do not match");
      return; // so it doesn't execute code below
    }

    try {
      setLoading(true);
      // neccesary cuz user may try again and if different error, previous error should go away
      setError("");
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
      setLoading(false);
    }
  }

  return (
    <>
      <div className=" bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
        <h2 className=" text-center mb-4 text-2xl dark:text-white">Sign Up</h2>
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
          <FormGroup
            type="password"
            label="Confirm password"
            required={true}
            ref={passwordConfirmRef}
          />
          <div disabled={loading} onClick={handleSubmit} className="button">
            Sign Up
          </div>
        </form>
        {error && <Message type="error" message={error} />}
      </div>

      <div className="text-center mt-2 dark:text-white">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}
