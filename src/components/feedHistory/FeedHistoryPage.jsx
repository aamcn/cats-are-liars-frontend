import { useEffect, useState } from "react";
import axios from "axios";
import FeedHistoryDisplayTemplate from "./feedHistoryDisplayTemplate";
function FeedHistoryPage(){

    const [feedHistoryData, setFeedHistoryData] = useState([])

    const username = localStorage.getItem("username").replaceAll('"', '')
    const userId = localStorage.getItem("userId").replaceAll('"', '')
    const b = localStorage.getItem("storedToken").replaceAll('"', "");
    axios.defaults.headers.common["Authorization"] = `bearer ${b}`;

    const getFeedHistory = () => {
        axios.get(
            "http://localhost:3000/feed-history/all",
            { userId},
            { method: "cors" },
            { withCredentials: true },
          )
          .then((res) => setFeedHistoryData(res.data))
          .catch((error) => {
            console.error(error);
          });
    }

    useEffect(() => {
        getFeedHistory()

    }, [])

    useEffect(() => {
        console.log(feedHistoryData)
    }, [feedHistoryData])


    return(
        <div>
           <div>
            <h1>Feed History</h1>
           </div>
           <div>
            <table>
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Feeder</th>
                    <th>Time</th>
                    <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
           {feedHistoryData && feedHistoryData.map(entry => {
                return <FeedHistoryDisplayTemplate entry={entry}/>
            })}
           </tbody>
            </table>
           
           </div>
        </div>
    )
}

export default FeedHistoryPage;