import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import FormGroup from "../FormGroup2";
import Message from "../Message";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(event) {
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

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      // add a new promise of updating email
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value !== currentUser.password) {
      // add a new promise of updating password
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
        setLoading(false);
      });
  }

  return (
    <>
      <div className=" bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
        <h2 className=" text-center mb-4 text-2xl dark:text-white">
          Update Profile
        </h2>
        <form className="flex flex-col">
          <FormGroup label="Email">
            <input
              className="form-input"
              type="email"
              required
              ref={emailRef}
              defaultValue={currentUser.email}
            />
          </FormGroup>
          <FormGroup label="Password">
            <input
              className="form-input"
              type="password"
              required
              ref={passwordRef}
              placeholder="Leave blank to keep the same"
            />
          </FormGroup>
          <FormGroup label="Confirm password">
            <input
              className="form-input"
              type="password"
              required
              ref={passwordConfirmRef}
              placeholder="Leave blank to keep the same"
            />
          </FormGroup>
          <button disabled={loading} onClick={handleSubmit} className="button">
            Update Profile
          </button>
        </form>
        {error && <Message type="error" message={error} />}
      </div>

      <Link to="/profile" className="block text-blue-500 text-center mt-2">
        Cancel
      </Link>
    </>
  );
}
