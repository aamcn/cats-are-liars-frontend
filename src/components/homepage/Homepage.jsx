import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./css/homepage.module.css";
import MyCatsTab from "./myCatsTab/MyCatsTab";
import LastFeedTable from "./lastFeedTable/LastFeedTable";

function Homepage() {
  const [userCats, setUserCats] = useState([]);

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

  

  useEffect(() => {
    getCats();
  }, []);



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
      <LastFeedTable userCats={userCats} userId={userId}/>
   
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
