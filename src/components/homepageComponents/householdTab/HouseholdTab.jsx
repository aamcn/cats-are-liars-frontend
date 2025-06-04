import "./css/householdTab.scss";
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
    <div className="HouseHoldTabContainer">
      <div className="houseHoldTabMenuContainer">
        <h3>
          {householdMembers[0] ? householdMembers[0].household_name : "Loading"}{" "}
          Members
        </h3>
        <button onClick={handleToggleTab} className="householdTabButton">
          {!isTabHidden ? (
            <MinimiseIcon className="minimiseIcon" />
          ) : (
            <DownChevron className="downChevron" />
          )}
        </button>
      </div>

      {!isTabHidden && (
        <div className="usersContainer">
          {householdMembers.map((user) => {
            return (
              <div className="userContainer">
                <img className="userPhoto" alt="User Photo"></img>
                <p className="username">{user.username}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HouseholdTab;
