import { Outlet } from "react-router";
import "./index.css";
import Header from "./components/header/Header";
import { createContext, useEffect, useState } from "react";
import { Auth0Provider } from "@auth0/auth0-react";

export const appContext = createContext({
  loginSuccess: "",
  changeLogInSuccess: () => {},
  householdMembers: [],
  storeHouseholdMembers: () => {},
  usersCats: [],
  storeUsersCats: () => {},
});

function App() {
  const [logInSuccess, setLoginSuccess] = useState(false);
  const [householdMembers, setHouseholdMembers] = useState([]);
  const [usersCats, setUsersCats] = useState([]);

  const storeUsersCats = (cats) => {
    setUsersCats(cats);
  };

  const changeLogInSuccess = (loginStatus) => {
    setLoginSuccess(loginStatus);
  };

  const storeHouseholdMembers = (members) => {
    setHouseholdMembers(members);
  };

  useEffect(() => {}, [logInSuccess]);

  return (
    <>
      <appContext.Provider
        value={{
          logInSuccess,
          changeLogInSuccess,
          householdMembers,
          storeHouseholdMembers,
          usersCats,
          storeUsersCats,
        }}
      >
       
    <Auth0Provider
    domain="https://dev-eg3mr7qabo77ds86.us.auth0.com"
    clientId="1muBuHjfePBSE70PfAKRrMi7iUwAYrKN"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <Header />
        <Outlet />
          </Auth0Provider>

      </appContext.Provider>
    </>
  );
}

export default App;
