import { useEffect, useState } from "react";
import axios from "axios";
import UsersCatsDisplay from "../usersCatsDisplay/UsersCatsDisplay";
import LastFeedTemplate from "./LastFeedTemplate";
import AddFeedingForm from "../addFeedingForm/AddFeedingForm";
import styles from "./homepage.module.css"

function Homepage() {
  const [cats, setCats] = useState([]);
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
      setLastFeedVisibility(false)
      setFormVisibility(false);
    } else {
      setFormVisibility(true);
    }
  };

  return (
    <div className={styles.homepageContainer}>
      <h1 className={styles.pageTitle}>home</h1>
      {username && <p className={styles.welcomeMessage} >Welcome back {username}</p>}
      
      {!formVisibility && <div className={styles.addFeedFormContainer}><AddFeedingForm cats={cats} /></div>}
       {lastFeedVisibility && <table className={styles.lastFeedTable}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableRows}>
              <th>Date</th>
              <th>Time</th>
              <th>Name</th>
              <th>Fed By</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {lastFeedEntry &&
              lastFeedEntry.map((entry) => {
                return <LastFeedTemplate entry={entry} />;
              })}
          </tbody>
        </table> } 
        
        <div className={styles.toggleButtons}>
          <button className={styles.toggleButton} onClick={handleToggleDisplay}>Add Feeding +</button>
          <button className={styles.toggleButton} onClick={handleToggleLastFeedTable}>Last Fed</button>
      </div>
    </div>
  );
}

export default Homepage;
