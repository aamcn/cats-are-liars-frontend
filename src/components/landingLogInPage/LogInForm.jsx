import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { appContext } from "../../App";
import { useNavigate } from "react-router-dom";
import styles from "./css/logInForm.module.css";

function LogInForm() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessage] = useState("");
  const { logInSuccess, changeLogInSuccess } = useContext(appContext);

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
    <div className={styles.formContainer}>
      {errorMessages && <p>{errorMessages}</p>}
      <form
        className={styles.logInForm}
        method="POST"
        onSubmit={formSubmission}
      >
        <fieldset className={styles.fieldset}>
          <label className={styles.inputLabel} htmlFor="username">
            Username:
          </label>
          <input
            className={styles.textInput}
            onChange={handleUsernameChange}
            type="text"
            name="username"
            id="username"
            minLength={2}
            aria-label="username"
            required
          ></input>
          <br></br>
          <label className={styles.inputLabel} htmlFor="password">
            Password:{" "}
          </label>
          <input
            className={styles.textInput}
            onChange={handlePasswordChange}
            type="password"
            id="password"
            aria-label="password"
            required
          ></input>
        </fieldset>
        <button className={styles.submitButton}>Log In</button>
      </form>
    </div>
  );
}
export default LogInForm;
