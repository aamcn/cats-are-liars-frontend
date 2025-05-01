import { useEffect, useState } from "react";
import UsersCatsDisplay from "../usersCatsDisplay/UsersCatsDisplay";
import axios from "axios";
function UserCatsControlPage(){

    const [cats, setCats] = useState([])

    const username = localStorage.getItem("username").replaceAll('"', '')
    const userId = localStorage.getItem("userId").replaceAll('"', '')
    const b = localStorage.getItem("storedToken").replaceAll('"', "");
    axios.defaults.headers.common["Authorization"] = `bearer ${b}`;
      
    const getCats = () => {
        axios.get(
            "http://localhost:3000/cats",
            { userId},
            { method: "cors" },
            { withCredentials: true },
          )
          .then((res) => setCats(res.data))
          .catch((error) => {
            console.error(error);
          });
    }

    useEffect(() => {
        getCats()
    }, [])

    return(
        <div>
            <UsersCatsDisplay cats={cats} />
        </div>
    )
}

export default UserCatsControlPage;