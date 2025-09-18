
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserDisplay = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="user-display" data-testid="user-display">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default UserDisplay;