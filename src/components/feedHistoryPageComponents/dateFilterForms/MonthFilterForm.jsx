import { useEffect, useState } from "react";
import "./css/monthFilterForm.scss";
import axios from "axios";
function MonthFilterForm({ setFeedHistoryData }) {
  const [months] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  const [years, setYears] = useState([]);
  const [yearMultiplier, setYearMultiplier] = useState([]);

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber);
    return date.toLocaleString("en-EN", { month: "long" });
  }

  useEffect(() => {
    const today = new Date();
    setYearMultiplier(today.getFullYear() - 2020);
  }, []);

  useEffect(() => {
    setYears([]);
    for (let i = 0; i <= yearMultiplier; i++) {
      setYears((years) => [...years, 2020 + i]);
    }
  }, [yearMultiplier]);

  const postMonthFilterForm = (date) => {
    axios
      .post(
        "http://localhost:3000/feed-history/all/month-year",
        { date },
        { method: "cors" },
        { withCredentials: true },
      )
      .then((res) => setFeedHistoryData(res.data))
      .catch((error) => {
        console.error(error);
      });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataToJson = axios.formToJSON(formData);
    postMonthFilterForm(formDataToJson);
  };

  const myMonthformat = new Intl.NumberFormat("en-US", {
    minimumIntegerDigits: 2,
  });

  return (
    <div className="monthFormContainer">
      <form className="monthFilterForm" onSubmit={handleFormSubmit}>
        <fieldset className="monthDateFieldSet">
          <div className="monthInput">
            <label htmlFor="month">Month: </label>
            <select id="month" name="month">
              {months.map((month) => {
                return (
                  <option value={myMonthformat.format(month + 1)}>
                    {getMonthName(month)}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="yearInput">
            <label htmlFor="Year">Year: </label>
            <select id="year" name="year">
              {years.map((year) => {
                return <option>{year}</option>;
              })}
            </select>
          </div>
        </fieldset>
        <div className="monthFormButtons">
          <button className="monthFormButton" >Submit</button>
        </div>
      </form>
    </div>
  );
}

export default MonthFilterForm;
