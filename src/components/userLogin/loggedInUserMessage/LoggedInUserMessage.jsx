import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../navbar/LogoutButton";
import "./loggedInUserMessage.scss";

function LoggedInUserMessage() {
  const { user, isLoading } = useAuth0();

  // Show loading state while authentication status is being determined
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="logged-in-user-message">
      <div className="welcome-title-container">
        <h2 className="welcome-title">Welcome Back</h2>
      </div>
      <p className="user-name">{user?.name}</p>
      <p className="not-you-message">
        Not you? <LogoutButton />
      </p>
    </div>
  );
}

export default LoggedInUserMessage;
