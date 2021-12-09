import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import FormGroup from "../FormGroup2";
import Message from "../Message";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, createUserDetails } = useAuth();
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

    if (passwordRef.current.value.length < 6) {
      setError("Password needs to be 6 characters or longer");
      return;
    }

    try {
      setLoading(true);
      // neccesary cuz user may try again and if different error, previous error should go away
      setError("");
      await signup(emailRef.current.value, passwordRef.current.value);
      try {
        await createUserDetails();
      } catch (error) {
        console.log(error);
      }
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
          <FormGroup label="Email">
            <input
              className="form-input"
              type="email"
              required
              placeholder="Please input an email address"
              ref={emailRef}
            />
          </FormGroup>
          <FormGroup label="Password">
            <input
              className="form-input"
              type="password"
              required
              ref={passwordRef}
              placeholder="Please input an password"
            />
          </FormGroup>
          <FormGroup label="Confirm password">
            <input
              className="form-input"
              type="password"
              required
              ref={passwordConfirmRef}
              placeholder="Please confirm password"
            />
          </FormGroup>
          <button disabled={loading} onClick={handleSubmit} className="button">
            Sign Up
          </button>
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
