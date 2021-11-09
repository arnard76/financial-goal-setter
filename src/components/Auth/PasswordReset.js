import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import FormGroup from "../FormGroup2";
import Message from "../Message";

export default function PasswordReset() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    // stops the form from submitting
    event.preventDefault();

    try {
      // neccesary cuz user may try again and if different error, previous error should go away
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage(
        "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder."
      );
    } catch {
      setError("That email address is invalid");
      setLoading(false);
    }
  }

  return (
    <>
      <div className=" bg-gray-100 dark:bg-gray-900 p-4 rounded-md ">
        <h2 className=" text-center mb-4 text-2xl dark:text-white">
          Reset your password
        </h2>
        <form className="flex flex-col">
          <FormGroup label="Email">
            <input
              className="form-input"
              placeholder="Please input your email address"
              type="email"
              required
              ref={emailRef}
            />
          </FormGroup>
          <button disabled={loading} onClick={handleSubmit} className="button">
            Send password reset email
          </button>
        </form>
        {error && <Message type="error" message={error} />}
        {message && <Message message={message} />}
      </div>

      <div className="text-center mt-2 dark:text-white">
        <p>
          Remembered your password?{" "}
          <Link to="/login" className="text-blue-500">
            Log In
          </Link>
        </p>
      </div>
      <div className="text-center mt-2 dark:text-white">
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
