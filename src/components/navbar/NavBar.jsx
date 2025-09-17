import { Link } from "react-router";
import LogOutButton from "./LogoutButton";
import "./navBar.scss";
import LoginButton from "../logInForm/logInButton";
// import { useContext } from "react";

// import { appContext } from "../../App";
function NavBar({logInSuccess, changeLogInSuccess}) {

  return (
    <div className="navBarContainer" data-testid="navBar">
      <div className="navLinksContainer">
       
        {logInSuccess && (
          <Link className="navLink" to="/cats-are-liars-frontend/home" data-testid="home-link">
            Home
          </Link>
        )}
        {logInSuccess && (
          <Link className="navLink" to="/cats-are-liars-frontend/my-cats" data-testid="my-cats-link">
            My Cats
          </Link>
        )}
        {logInSuccess && (
          <Link className="navLink" to="/cats-are-liars-frontend/feed-history" data-testid="feed-history-link">
            Feed History
          </Link>
        )}
         <LogOutButton />
          <LoginButton />
          {/* <Link className="navLink" to="/cats-are-liars-frontend/" data-testid="log-in-link" onClick={() => changeLogInSuccess(false)}>
            Log In
          </Link> */}
        
        {/* {logInSuccess && <LogOutButton />} */}
      </div>
    </div>
  );
}

export default NavBar;
