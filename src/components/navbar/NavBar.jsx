import { Link } from "react-router";
import LogOutButton from "../elements/LogOutButton";

function NavBar() {
  return (
    <div>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/cat-control-page">My Cats</Link>
        <Link to="/feed-history">Feed History</Link>
      </div>
      <LogOutButton />
    </div>
  );
}

export default NavBar;
