import { useEffect, useState } from "react";
import axios from "axios";


function LogInForm(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const formSubmission = (event) => {
        console.log(username, password)
        event.preventDefault();
        axios
      .post(
        "http://localhost:3000/log-in",
        { username, password },
        { method: "cors" },
        { withCredentials: true },
    )
        .then((res) => {
            console.log(res)
            const token = res.data.token;
            const userId = res.data.userId
            const username = res.data.username
            localStorage.setItem("storedToken", JSON.stringify(token));
            localStorage.setItem("userId", JSON.stringify(userId));
            localStorage.setItem("username", JSON.stringify(username));
        })
        .catch((error) => {
        console.error(error);
      });
    }

    useEffect(() => {
        console.log(username)
        console.log(password)
        
    }, [username, password])


    return(
        <div>
            <form method="POST" onSubmit={formSubmission}>
                <fieldset >
                    <label htmlFor="username">Username:</label>
                    <input onChange={handleUsernameChange} type="text" name="username" id="username" aria-label="username" required ></input>
                    <label htmlFor="password">Password: </label>
                    <input onChange={handlePasswordChange} type="password" id="password" aria-label="password" required></input>
                </fieldset>
                <button>Submit</button>
            </form>
        </div>
    )
}
export default LogInForm;