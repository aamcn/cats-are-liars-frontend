import { useState } from "react";
import axios from "axios";
import "./feedHistoryPage.scss";
import FeedHistoryTable from "../feedHistoryTable/FeedHistoryTable";
import MonthFilterForm from "../dateFilterForms/MonthFilterForm";
import DateRangeFilterForm from "../dateFilterForms/DateRangeFilterForm";
import DownChevron from "../../../assets/svg/doubleDownChevron.svg?react";
import MinimiseIcon from "../../../assets/svg/minimiseIcon.svg?react";
import Footer from "../../footer/Footer";
import AddFeedingForm from "../../addFeedingForm/AddFeedingForm";
import PageTitle from "../../pageTItle/PageTItle";

function FeedHistoryPage() {
  const [feedHistoryData, setFeedHistoryData] = useState(null);
  const [isTabHidden, setIsTabHidden] = useState(true);
  const [isMonthFormHidden, setIsMonthFormHidden] = useState(true);
  const [isDateRangeHidden, setIsDateRangeHidden] = useState(false);
  const [formToDisplay, setFormToDisplay] = useState(null);

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

  const toggleFormDisplay = (event) => {
    console.log(event.target.value);
    if (formToDisplay != event.target.value) {
      setFormToDisplay(event.target.value);
    } else {
      setFormToDisplay(null);
    }
  };

  return (
    <div className="feedHistoryPageContainer">
      <PageTitle title="Feed History" />

      <div className="feedHistoryMainContainer">
        {formToDisplay == "Log a Feeding" && (
          <AddFeedingForm formToggle={toggleFormDisplay} />
        )}
        <div className="feedHistoryTabContainer">
          <h2 className="filterOptionsTabTitle">Filter Options</h2>
          <button onClick={handleToggleTab} className="feedHistoryTabButton">
            {!isTabHidden ? (
              <MinimiseIcon className="minimiseIcon" />
            ) : (
              <DownChevron className="downChevron" />
            )}
          </button>
        </div>
        {isTabHidden && (
          <div className="feedFilterFormsContainer">
            <div className="formSelector">
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

      <Footer formToggle={toggleFormDisplay} formNames={["Log a Feeding"]} />
    </div>
  );
}

export default FeedHistoryPage;
