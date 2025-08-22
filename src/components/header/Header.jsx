import NavBar from "../navbar/NavBar";
import { useContext } from "react";

import { appContext } from "../../App";

function Header() {
    const { logInSuccess, changeLogInSuccess } = useContext(appContext);

  return (
    <div data-testid="header">
      <NavBar logInSuccess={logInSuccess} changeLogInSuccess={changeLogInSuccess} />
    </div>
  )
}

export default Header;