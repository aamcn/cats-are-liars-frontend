import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./css/feedHistoryPage.module.css";
import FeedHistoryTable from "./feedHistoryTable/FeedHistoryTable";
import MonthFilterForm from "./dateFilterForms/MonthFilterForm";
import DateRangeFilterForm from "./dateFilterForms/DateRangeFilterForm";
import DownChevron from "../../assets/svg/doubleDownChevron.svg?react";
import MinimiseIcon from "../../assets/svg/minimiseIcon.svg?react";

function FeedHistoryPage() {
  const [feedHistoryData, setFeedHistoryData] = useState(null);
  const [isTabHidden, setIsTabHidden] = useState(true);
  const [isMonthFormHidden, setIsMonthFormHidden] = useState(true);
  const [isDateRangeHidden, setIsDateRangeHidden] = useState(false);
  const [todaysDate, setTodaysDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const username = localStorage.getItem("username").replaceAll('"', "");
  const userId = localStorage.getItem("userId").replaceAll('"', "");
  const b = localStorage.getItem("storedToken").replaceAll('"', "");
  axios.defaults.headers.common["Authorization"] = `bearer ${b}`;

  const toggleFormVisibility = (event) => {
    if (event.target.value === "By Month") {
      setIsMonthFormHidden(false);
      setIsDateRangeHidden(true);
    }
    if (event.target.value === "Between Dates") {
      setIsMonthFormHidden(true);
      setIsDateRangeHidden(false);
    }
  };

  const handleToggleTab = () => {
    if (isTabHidden == true) {
      setIsTabHidden(false);
      setIsTabHidden(false);
    } else {
      setIsTabHidden(true);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageTitle}>
        <h1>Feed History</h1>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.tabMenuContainer}>
          <h2 className={styles.filterTitle}>Filter Options</h2>
          <button onClick={handleToggleTab} className={styles.tabButton}>
            {!isTabHidden ? (
              <MinimiseIcon className={styles.minimiseIcon} />
            ) : (
              <DownChevron className={styles.downChevron} />
            )}
          </button>
        </div>
        {isTabHidden && (
          <div className={styles.filterFormsContainer}>
            <div className={styles.filterSelector}>
              <label>Filter results </label>
              <select onChange={toggleFormVisibility}>
                <option>Between Dates</option>
                <option>By Month</option>
              </select>
            </div>

            <hr />
            {!isMonthFormHidden && (
              <MonthFilterForm setFeedHistoryData={setFeedHistoryData} />
            )}
            {!isDateRangeHidden && (
              <DateRangeFilterForm setFeedHistoryData={setFeedHistoryData} />
            )}
            <hr />
          </div>
        )}

        <FeedHistoryTable feedHistoryData={feedHistoryData} />
      </div>
      <div className={styles.pageFooter}></div>
    </div>
  );
}

export default FeedHistoryPage;
