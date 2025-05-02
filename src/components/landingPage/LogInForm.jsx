import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { appContext } from "../../App";
import { useNavigate } from "react-router-dom";

function LogInForm() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { logInSuccess, changeLogInSuccess } = useContext(appContext);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  function redirectHome() {
    console.log("pop");
    navigate("/home", { replace: true });
  }

  const formSubmission = (event) => {
    console.log(username, password);
    event.preventDefault();
    axios
      .post(
        "http://localhost:3000/log-in",
        { username, password },
        { method: "cors" },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res);
        if (res.data === "fail") {
          changeLogInSuccess();
          return;
        }
        const token = res.data.token;
        const userId = res.data.userId;
        const username = res.data.username;
        localStorage.setItem("storedToken", JSON.stringify(token));
        localStorage.setItem("userId", JSON.stringify(userId));
        localStorage.setItem("username", JSON.stringify(username));
        changeLogInSuccess(true);
        redirectHome();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log(username);
    console.log(password);
  }, [username, password]);

  return (
    <div>
      <form method="POST" onSubmit={formSubmission}>
        <fieldset>
          <label htmlFor="username">Username:</label>
          <input
            onChange={handleUsernameChange}
            type="text"
            name="username"
            id="username"
            aria-label="username"
            required
          ></input>
          <label htmlFor="password">Password: </label>
          <input
            onChange={handlePasswordChange}
            type="password"
            id="password"
            aria-label="password"
            required
          ></input>
        </fieldset>
        <button>Submit</button>
      </form>
    </div>
  );
}
export default LogInForm;
