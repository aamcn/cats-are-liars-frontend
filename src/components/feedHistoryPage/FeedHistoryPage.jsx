import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./css/feedHistoryPage.module.css";
import FeedHistoryTable from "./feedHistoryTable/FeedHistoryTable";

function FeedHistoryPage() {
  const [feedHistoryData, setFeedHistoryData] = useState([]);
  const [todaysDate, setTodaysDate] = useState(null)
  const [defaultStartDate, setDefaultStartDate] = useState(null)

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
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const day = today.getDate();
    setTodaysDate(year + "-" + myformat.format(month) + "-" + myformat.format(day))
    setDefaultStartDate(year + "-" + myformat.format(month) + "-" + '01')
  }, []);


  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageTitle}>
        <h1>Feed History</h1>
      </div>
      <div className={styles.tableOptions}>
        
        <form>
          <fieldset>
            <label htmlFor="fromDate">From:</label>

            <input
              type="date"
              id="fromDate"
              name="trip-start"
              min="2025-01-01"
              max={todaysDate}
              defaultValue={defaultStartDate} />

            <label htmlFor="start">To:</label>
            <input
              type="date"
              id="toDate"
              name="trip-start"
              min="2025-01-01"
              max={todaysDate}
              defaultValue={todaysDate} />
          </fieldset>
          <div className={styles.formButtons}>
            <button className={styles.submitButtons}>Search</button>
          </div>
        </form>
      </div>

      <FeedHistoryTable feedHistoryData={feedHistoryData} />
      <div className={styles.pageFooter}>

      </div>
    </div>
  );
}

export default FeedHistoryPage;
