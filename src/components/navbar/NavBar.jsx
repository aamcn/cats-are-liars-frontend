import { Link } from "react-router";
import LogOutButton from "../elements/LogOutButton";
import styles from "./css/navBar.module.css"
function NavBar() {
  return (
    <div className={styles.navBarContainer}>
      <div className={styles.navLinksContainer}>
        <Link className={styles.navLink} to="/home">Home</Link>
        <Link className={styles.navLink} to="/cat-control-page">My Cats</Link>
        <Link className={styles.navLink} to="/feed-history">Feed History</Link>
        <Link className={styles.navLink} to="/">Log In</Link>
      </div>
      <LogOutButton />
    </div>
  );
}

export default NavBar;
