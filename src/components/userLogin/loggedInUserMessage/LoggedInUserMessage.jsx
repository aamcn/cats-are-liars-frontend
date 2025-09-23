import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../navbar/LogoutButton";
import "./loggedInUserMessage.scss";
import { useEffect } from "react";

function LoggedInUserMessage() {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

useEffect(() => {
   fetchProtectedRoute();
}, [isAuthenticated, getAccessTokenSilently, user]);


 const fetchProtectedRoute = async () => {

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `http://localhost:3000/`,
        },
      });

      const protectedMessageRoute = `http://localhost:3000/api/messages/protected`;
      const protectedResponse = await fetch(protectedMessageRoute, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      }); 

      const protectedMessage = await protectedResponse.json();
      console.log(protectedMessage.text);
    } catch (e) {
      console.log(e.message);
    }
  };

  // Show loading state while authentication status is being determined
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="logged-in-user-message">
     { isAuthenticated && 
      <div>
        <h2>{user.nickname}</h2>
        <p>{user.email}</p>
      </div> }
        <h2 className="welcome-title">Welcome Back</h2>
      <p className="users-name">{user.nickname}</p>
      <p className="not-you-message">
        Not you? <LogoutButton />
      </p>
    </div>
  );
}

export default LoggedInUserMessage;
