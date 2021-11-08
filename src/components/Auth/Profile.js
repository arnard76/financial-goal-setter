import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Message from "../Message";

export default function Profile() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      setLoading(true);
      setError("");
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
      setLoading(false);
    }
  }

  return (
    <>
      <div className=" bg-gray-100 dark:bg-gray-900 dark:text-white p-4 rounded-md ">
        <h2 className=" text-center mb-4 text-2xl">Profile</h2>
        <strong>Email: </strong>
        {currentUser.email}
        <Link to="/update-profile/" className="block mt-2 button">
          Update Profile
        </Link>
        {error && <Message type="error" message={error} />}
      </div>
      <div className=" text-blue-500 text-center mt-2">
        <Link disabled={loading} onClick={handleLogout} to="">
          Log Out
        </Link>
      </div>
    </>
  );
}
