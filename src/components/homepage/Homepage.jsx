import { useEffect, useState } from "react";
import axios from "axios";

import LastFeedTemplate from "./LastFeedTemplate";
import AddFeedingForm from "../addFeedingForm/AddFeedingForm";
import styles from "./css/homepage.module.css";
import CatTabTemplate from "./myCatsTab/CatTabTemplate";
import MyCatsTab from "./myCatsTab/MyCatsTab";

function Homepage() {
  const [userCats, setUserCats] = useState([]);
  const [lastFeedEntry, setLastFeedEntry] = useState([]);
  const [formVisibility, setFormVisibility] = useState(true);
  const [lastFeedVisibility, setLastFeedVisibility] = useState(true);


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
      .then((res) => setUserCats(res.data))
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
    userCats.forEach((cat) => {
      getLastFeedEntry(cat.name);
    });
  }, [userCats]);

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


 

  return (
    <div className={styles.homepageContainer}>
      <div className={styles.pageTitle}>
        <h1>Home</h1>
      </div>
      {username && (
        <p className={styles.welcomeMessage}>Welcome back {username}</p>
      )}

      <div className={styles.mainContent}>
        
     
      <MyCatsTab userCats={userCats}/>

      {!formVisibility && <AddFeedingForm userCats={userCats} />}
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
