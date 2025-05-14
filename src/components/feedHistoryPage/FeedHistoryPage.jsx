import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./css/feedHistoryPage.module.css";
import FeedHistoryTable from "./feedHistoryTable/FeedHistoryTable";

function FeedHistoryPage() {
  const [feedHistoryData, setFeedHistoryData] = useState([]);
  const [todaysDate, setTodaysData] = useState(null)
  const username = localStorage.getItem("username").replaceAll('"', "");
  const userId = localStorage.getItem("userId").replaceAll('"', "");
  const b = localStorage.getItem("storedToken").replaceAll('"', "");
  axios.defaults.headers.common["Authorization"] = `bearer ${b}`;

  const getFeedHistory = () => {
    axios
      .get(
        "http://localhost:3000/feed-history/all",
        { userId },
        { method: "cors" },
        { withCredentials: true },
      )
      .then((res) => setFeedHistoryData(res.data))
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getFeedHistory();
  }, []);

  const myformat = new Intl.NumberFormat('en-US', { 
    minimumIntegerDigits: 2, 
});

useEffect(() => { 
  const today = new Date()
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const day= today. getDate();
  setTodaysData( year + "-" + myformat.format(month) + "-" + myformat.format(day))
}, []);


  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageTitle}>
        <h1>Feed History</h1>
      </div>
      <div className={styles.tableOptions}>
        <label for="start">From:</label>

        <input
          type="date"
          id="start"
          name="trip-start"
          min="2025-01-01"
          max={todaysDate} 
          defaultValue={todaysDate}/>
        <label for="start">To:</label>

        <input
          type="date"
          id="start"
          name="trip-start"
          min="2025-01-01"
          max={todaysDate} 
          defaultValue={todaysDate}/>
      </div>

      <FeedHistoryTable feedHistoryData={feedHistoryData} />
      <div className={styles.pageFooter}>

      </div>
    </div>
  );
}

export default FeedHistoryPage;
