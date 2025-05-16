import styles from "./css/householdTab.module.css";
import { useEffect, useState, useContext } from "react";
import { appContext } from "../../../App";
import DownChevron from "../../../assets/svg/doubleDownChevron.svg?react";
import MinimiseIcon from "../../../assets/svg/minimiseIcon.svg?react";
import axios from "axios";

function HouseholdTab() {
  const [isTabHidden, setIsTabHidden] = useState(false);
  const { householdMembers, storeHouseholdMembers } = useContext(appContext);

  const getHouseholdMembers = () => {
    axios
      .get(
        `http://localhost:3000/users/household/all-users`,
        { method: "cors" },
        { withCredentials: true },
      )
      .then((res) => {
        const userData = res.data;
        storeHouseholdMembers(userData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleToggleTab = () => {
    if (isTabHidden == true) {
      setIsTabHidden(false);
      setIsTabHidden(false);
    } else {
      setIsTabHidden(true);
    }
  };

  useEffect(() => {
    getHouseholdMembers();
  }, []);

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabMenuContainer}>
        <p>
          {householdMembers[0] ? householdMembers[0].household_name : "Loading"}{" "}
          Household Users
        </p>
        <button onClick={handleToggleTab} className={styles.tabButton}>
          {!isTabHidden ? (
            <MinimiseIcon className={styles.minimiseIcon} />
          ) : (
            <DownChevron className={styles.downChevron} />
          )}
        </button>
      </div>

      {!isTabHidden && (
        <div className={styles.usersContainer}>
          {householdMembers.map((user) => {
            return (
              <div>
                <p>{user.username}</p>
                <img alt="User Photo"></img>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HouseholdTab;
