import { Link } from "react-router";
import LogOutButton from "../elements/LogOutButton";
import styles from "./css/navBar.module.css";
import { useContext } from "react";

import { appContext } from "../../App";
function NavBar() {
  const { logInSuccess, changeLogInSuccess } = useContext(appContext);

  return (
    <div className={styles.navBarContainer}>
      <div className={styles.navLinksContainer}>
        {logInSuccess && (
          <Link className={styles.navLink} to="/home">
            Home
          </Link>
        )}
        {logInSuccess && (
          <Link className={styles.navLink} to="/cat-control-page">
            My Cats
          </Link>
        )}
        {logInSuccess && (
          <Link className={styles.navLink} to="/feed-history">
            Feed History
          </Link>
        )}
        {!logInSuccess && (
          <Link className={styles.navLink} to="/">
            Log In
          </Link>
        )}
        {logInSuccess && <LogOutButton />}
      </div>
    </div>
  );
}

export default NavBar;
