import { Link } from "react-router";
import LogOutButton from "./LogoutButton";
import "./navBar.scss";
import { useAuth0 } from "@auth0/auth0-react";

// import { useContext } from "react";

// import { appContext } from "../../App";
function NavBar() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="navBarContainer" data-testid="navBar">
      {isAuthenticated && (
        <div className="navLinksContainer">
          <Link
            className="navLink"
            to="/cats-are-liars-frontend/home"
            data-testid="home-link"
          >
            Home
          </Link>

          <Link
            className="navLink"
            to="/cats-are-liars-frontend/my-cats"
            data-testid="my-cats-link"
          >
            My Cats
          </Link>

          <Link
            className="navLink"
            to="/cats-are-liars-frontend/feed-history"
            data-testid="feed-history-link"
          >
            Feed History
          </Link>
          <LogOutButton />
        </div>
      )}
    </div>
  );
}

export default NavBar;
