import { Outlet } from "react-router";
import "./index.css";
import Header from "./components/header/Header";
import { createContext, useEffect, useState } from "react";
import Footer from "./components/footer/Footer";

export const appContext = createContext({
  loginSuccess: "",
  changeLogInSuccess: () => {},
  householdMembers: [],
  storeHouseholdMembers: () => {},
  usersCats: [],
  storeUsersCats: () => {}

});

function App() {
  const [logInSuccess, setLoginSuccess] = useState(false);
  const [householdMembers, setHouseholdMembers] = useState([]);
  const [usersCats, setUsersCats] = useState([])

  const storeUsersCats = (cats) => {
    setUsersCats(cats)
  }

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
          storeUsersCats
        }}
      >
        <Header />
        <Outlet />
      </appContext.Provider>
    </>
  );
}

export default App;
