import { useEffect, useState } from "react";
import axios from "axios";
function Homepage(){

    const [cats, setCats] = useState([])
    const [lastFeedEntry, setLastFeedEntry] = useState([])
    
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

    const getLastFeedEntry = (catName) => {
        axios.get(
            `http://localhost:3000/feed-history/cat-name/${catName}/get/`,
            { userId},
            { method: "cors" },
            { withCredentials: true },
          )
          .then((res) => setLastFeedEntry(lastFeedEntry => ([...lastFeedEntry, ...res.data])))
          .catch((error) => {
            console.error(error);
          });
    }

    useEffect(() => {
        getCats()
    }, [])

    useEffect(() => {
        cats.forEach(cat => {
            getLastFeedEntry(cat.name)
        })  
        console.log(lastFeedEntry)  
    }, [cats])

    return(
        <div>
            <h1>home</h1>
            {username && <p>Welcome back {username}</p>}
            {cats && cats.map(cat => {
                return <p key={cat.catid} >{cat.name}</p>
            })}
            <div>
                {lastFeedEntry && lastFeedEntry.map(entry => {
                    return <p>{entry.cat_name}{entry.date}</p>
                })}
            </div>
        </div>
    )
}

export default Homepage;