import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./css/feedHistoryPage.module.css";
import FeedHistoryTable from "./feedHistoryTable/FeedHistoryTable";

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
     
     <FeedHistoryTable feedHistoryData={feedHistoryData} />
    </div>
  );
}

export default FeedHistoryPage;
