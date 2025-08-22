import { Link } from "react-router";
import LogOutButton from "../elements/LogOutButton";
import "./navBar.scss";
// import { useContext } from "react";

// import { appContext } from "../../App";
function NavBar({logInSuccess, changeLogInSuccess}) {

  return (
    <div className="navBarContainer" data-testid="navBar">
      <div className="navLinksContainer">
        {logInSuccess && (
          <Link className="navLink" to="/home" data-testid="home-link">
            Home
          </Link>
        )}
        {logInSuccess && (
          <Link className="navLink" to="/my-cats" data-testid="my-cats-link">
            My Cats
          </Link>
        )}
        {logInSuccess && (
          <Link className="navLink" to="/feed-history" data-testid="feed-history-link">
            Feed History
          </Link>
        )}
        
          <Link className="navLink" to="/" data-testid="log-in-link" onClick={() => changeLogInSuccess(false)}>
            Log In
          </Link>
        
        {/* {logInSuccess && <LogOutButton />} */}
      </div>
    </div>
  );
}

export default NavBar;
