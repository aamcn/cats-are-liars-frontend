import { Outlet } from "react-router";
import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { createContext, useEffect, useState } from "react";

export const appContext = createContext({
  loginSuccess: "",
  changeLogInSuccess: () => {},
});

function App() {
  const [logInSuccess, setLoginSuccess] = useState(false);

  const changeLogInSuccess = (loginStatus) => {
    setLoginSuccess(loginStatus);
  };

  useEffect(() => {}, [logInSuccess]);

  return (
    <>
      <appContext.Provider value={{ logInSuccess, changeLogInSuccess }}>
        <div>
          <NavBar />
          <Outlet />
        </div>
      </appContext.Provider>
    </>
  );
}

export default App;
