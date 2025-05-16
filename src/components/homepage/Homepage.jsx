import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./css/homepage.module.css";
import MyCatsTab from "./myCatsTab/MyCatsTab";
import LastFeedTable from "./lastFeedTable/LastFeedTable";
import AddFeedingForm from "../addFeedingForm/AddFeedingForm";
import HouseholdTab from "./householdTab/HouseholdTab";
import PawIcon from "../../assets/svg/paw.svg?react";

function Homepage() {
  const [userCats, setUserCats] = useState([]);

  const [formVisibility, setFormVisibility] = useState(true);
  const [lastFeedVisibility, setLastFeedVisibility] = useState(true);

  const username = localStorage.getItem("username").replaceAll('"', "");
  const userId = localStorage.getItem("userId").replaceAll('"', "");
  const b = localStorage.getItem("storedToken").replaceAll('"', "");
  const householdId = localStorage.getItem("householdId").replaceAll('"', "");
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
      setLastFeedVisibility(true);
    }
  };

  const handleToggleDisplay = () => {
    if (formVisibility == true) {
      setFormVisibility(false);
    } else {
      setFormVisibility(true);
    }
  };

  return (
    <div className={styles.homepageContainer}>
      <div className={styles.pageTitle}>
        <h1>
          <PawIcon height="1em" width="1em" /> Home{" "}
          <PawIcon height="1em" width="1em" />
        </h1>
      </div>
      {username && (
        <p className={styles.welcomeMessage}>Welcome back {username}</p>
      )}

      {!formVisibility && <AddFeedingForm userCats={userCats} />}

      <div className={styles.mainContent}>
        <MyCatsTab userCats={userCats} />
        <LastFeedTable
          userCats={userCats}
          handleToggleLastFeedTable={handleToggleLastFeedTable}
          lastFeedVisibility={lastFeedVisibility}
          userId={userId}
        />
        <HouseholdTab householdId={householdId} userId={userId} />
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
