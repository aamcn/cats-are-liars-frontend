import { Outlet } from "react-router";
import "./App.css";
import Header from "./components/header/Header";
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
          <Header />
          <Outlet />
        </div>
      </appContext.Provider>
    </>
  );
}

export default App;
