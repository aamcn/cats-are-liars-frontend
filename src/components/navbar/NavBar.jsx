import { Link } from "react-router";
import LogOutButton from "../elements/LogOutButton";
import "./navBar.scss";
import { useContext } from "react";

import { appContext } from "../../App";
function NavBar() {
  const { logInSuccess, changeLogInSuccess } = useContext(appContext);

  return (
    <div className="navBarContainer" data-testid="navBar">
      <div className="navLinksContainer">
        {logInSuccess && (
          <Link className="navLink" to="/home">
            Home
          </Link>
        )}
        {logInSuccess && (
          <Link className="navLink" to="/my-cats">
            My Cats
          </Link>
        )}
        {logInSuccess && (
          <Link className="navLink" to="/feed-history">
            Feed History
          </Link>
        )}
        {!logInSuccess && (
          <Link className="navLink" to="/">
            Log In
          </Link>
        )}
        {logInSuccess && <LogOutButton />}
      </div>
    </div>
  );
}

export default NavBar;
