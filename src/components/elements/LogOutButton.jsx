import axios from "axios";
import { useContext } from "react";
import { appContext } from "../../App";

function LogOutButton() {
  const { logInSuccess, changeLogInSuccess } = useContext(appContext);

  const handleLogOutClick = (event) => {
    event.preventDefault();
    axios
      .get(
        "http://localhost:3000/log-out",
        { method: "cors" },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res);
        localStorage.clear("storedToken");
        localStorage.clear("userId");
        localStorage.clear("username");
        changeLogInSuccess(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {logInSuccess && (
        <button href="/" onClick={handleLogOutClick} type="submit">
          Log Out
        </button>
      )}
    </div>
  );
}

export default LogOutButton;
