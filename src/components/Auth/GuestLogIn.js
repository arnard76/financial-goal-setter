import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function GuestLogIn() {
  const history = useHistory();
  const { login } = useAuth();

  async function handleSubmit() {
    await login("guest@email.com", "youtdskjdfiu3333");
    history.push("/");
  }

  handleSubmit();
  return <></>;
}
