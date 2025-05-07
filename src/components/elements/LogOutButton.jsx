import axios from "axios";
import { useContext } from "react";
import { appContext } from "../../App";
import { useNavigate } from "react-router-dom";

function LogOutButton() {
  let navigate = useNavigate();
  const { logInSuccess, changeLogInSuccess } = useContext(appContext);


  function redirectLogIn() {
    navigate("/", { replace: true });
  }

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
        redirectLogIn()
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
