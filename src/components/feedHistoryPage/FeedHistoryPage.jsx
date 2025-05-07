import { useEffect, useState } from "react";
import axios from "axios";
import FeedHistoryTableRow from "./FeedHistoryTableRow";
import styles from "./css/feedHistoryPage.module.css";

function FeedHistoryPage() {
  const [feedHistoryData, setFeedHistoryData] = useState([]);

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

  useEffect(() => {}, [feedHistoryData]);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Feed History</h1>
      <div className={styles.tableOptions}>
        <button>option</button>
        <button>option</button>
        <button>option</button>
        <button>option</button>
      </div>
      <div className={styles.feedHistoryTable}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Cat Name</th>
              <th>Fed By</th>
              <th>Time</th>
              <th>Meds Needed</th>
              <th>Meds Given</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {feedHistoryData &&
              feedHistoryData.map((entry) => {
                return <FeedHistoryTableRow entry={entry} />;
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FeedHistoryPage;
