import { useEffect, useState } from "react";
import axios from "axios";

import LastFeedTemplate from "./LastFeedTemplate";
import AddFeedingForm from "../addFeedingForm/AddFeedingForm";
import styles from "./css/homepage.module.css";
import CatTabTemplate from "./CatTabTemplate";

function Homepage() {
  const [cats, setCats] = useState([]);
  const [lastFeedEntry, setLastFeedEntry] = useState([]);
  const [formVisibility, setFormVisibility] = useState(true);
  const [lastFeedVisibility, setLastFeedVisibility] = useState(true);
  const [catsTabVisible, setCatsTabVisible] = useState(true)

  const username = localStorage.getItem("username").replaceAll('"', "");
  const userId = localStorage.getItem("userId").replaceAll('"', "");
  const b = localStorage.getItem("storedToken").replaceAll('"', "");
  axios.defaults.headers.common["Authorization"] = `bearer ${b}`;

  const getCats = () => {
    axios
      .get(
        "http://localhost:3000/cats",
        { userId },
        { method: "cors" },
        { withCredentials: true },
      )
      .then((res) => setCats(res.data))
      .catch((error) => {
        console.error(error);
      });
  };

  const getLastFeedEntry = (catName) => {
    setLastFeedEntry([]);
    axios
      .get(
        `http://localhost:3000/feed-history/cat-name/${catName}/get/`,
        { userId },
        { method: "cors" },
        { withCredentials: true },
      )
      .then((res) => {
        const feedData = res.data;
        if (feedData.length > 0) {
          setLastFeedEntry((lastFeedEntry) => [
            ...lastFeedEntry,
            feedData[feedData.length - 1],
          ]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCats();
  }, []);

  useEffect(() => {
    cats.forEach((cat) => {
      getLastFeedEntry(cat.name);
    });
  }, [cats]);

  const handleToggleLastFeedTable = () => {
    if (lastFeedVisibility == true) {
      setLastFeedVisibility(false);
    } else {
      setFormVisibility(true);
      setLastFeedVisibility(true);
    }
  };

  const handleToggleDisplay = () => {
    if (formVisibility == true) {
      setLastFeedVisibility(false);
      setFormVisibility(false);
    } else {
      setFormVisibility(true);
    }
  };

  const handleToggleTab = () => {
    if (catsTabVisible == true) {
      setCatsTabVisible(false);
      setCatsTabVisible(false);
    } else {
      setCatsTabVisible(true);
    }
  };

 

  return (
    <div className={styles.homepageContainer}>
      <div className={styles.pageTitle}>
        <h1>Home</h1>
      </div>
      {username && (
        <p className={styles.welcomeMessage}>Welcome back {username}</p>
      )}

      <div className={styles.mainContent}>
        
      <div className={styles.userCatsTab}>
        <div  className={styles.tabMenuContainer}>
          <button onClick={handleToggleTab} className={styles.tabButton}>V</button>
        </div>
      {catsTabVisible && <div className={styles.catCardsContainer}>
        {cats.map((cat) => {
          return <CatTabTemplate cat={cat} />;
        })}
        </div>}  
      </div>

      {!formVisibility && <AddFeedingForm cats={cats} />}
      {lastFeedVisibility && (
        <table className={styles.lastFeedTable}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableRows}>
              <th className={styles.columnTitle} scope="col">
                Date
              </th>
              <th className={styles.columnTitle} scope="col">
                Time
              </th>
              <th className={styles.columnTitle} scope="col">
                Name
              </th>
              <th className={styles.columnTitle} scope="col">
                Fed By
              </th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {lastFeedEntry &&
              lastFeedEntry.map((entry) => {
                return <LastFeedTemplate entry={entry} />;
              })}
          </tbody>
        </table>
      )}
      </div>

      <div className={styles.toggleButtons}>
        <button className={styles.toggleButton} onClick={handleToggleDisplay}>
          Add Feeding
        </button>
        <button
          className={styles.toggleButton}
          onClick={handleToggleLastFeedTable}
        >
          Last Feeds
        </button>
      </div>
    </div>
  );
}

export default Homepage;
