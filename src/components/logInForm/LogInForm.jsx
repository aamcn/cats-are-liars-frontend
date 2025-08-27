import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { appContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./logInForm.scss";

function LogInForm() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessage] = useState("");
  const {changeLogInSuccess } = useContext(appContext);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  function redirectHome() {
    navigate("/home", { replace: true });
  }

  const formSubmission = (event) => {
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
          setErrorMessage("Username or password not recognised");
          return;
        }
        localStorage.setItem("storedToken", JSON.stringify(res.data.token));
        localStorage.setItem("userId", JSON.stringify(res.data.userId));
        localStorage.setItem("username", JSON.stringify(res.data.username));
        localStorage.setItem("userRole", JSON.stringify(res.data.role));
        localStorage.setItem(
          "householdId",
          JSON.stringify(res.data.householdId),
        );
        changeLogInSuccess(true);
        redirectHome();
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.error(error);
      });
    event.target.reset();
  };

  return (
    <div className="logInFormContainer" data-testid="log-in-form-container">
      {errorMessages && <p>{errorMessages}</p>}
      <form className="logInForm" method="POST" onSubmit={formSubmission}>
        <fieldset className="fieldset">
          <label className="inputLabel" htmlFor="username">
            Username:
          </label>
          <input
            className="textInput"
            onChange={handleUsernameChange}
            type="text"
            name="username"
            id="username"
            minLength={2}
            aria-label="username"
            required
          ></input>
          <br></br>
          <label className="inputLabel" htmlFor="password">
            Password:{" "}
          </label>
          <input
            className="textInput"
            onChange={handlePasswordChange}
            type="password"
            id="password"
            aria-label="password"
            required
          ></input>
        </fieldset>
        <div className="formButtonsContainer">
          <button className="formButton">Log In</button>
          <button className="formButton">Clear</button>
        </div>
      </form>
    </div>
  );
}
export default LogInForm;
