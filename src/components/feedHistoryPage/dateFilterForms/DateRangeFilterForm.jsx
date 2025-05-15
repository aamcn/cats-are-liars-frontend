import { useEffect, useState } from "react"
import axios from "axios";
import styles from "./css/monthFilterForm.module.css"

function DateRangeFilterForm({setFeedHistoryData}) {

    const [todaysDate, setTodaysDate] = useState(null)
    const [fromDate, setFromDate] = useState(null)
    const [toDate, setToDate] = useState(null)

    const postBetweenDates = (dates) => {
        axios
          .post(
            "http://localhost:3000/feed-history/between-dates",
            { dates },
            { method: "cors" },
            { withCredentials: true },
          )
          .then((res) => setFeedHistoryData(res.data))
          .catch((error) => {
            console.error(error); 
          });
      };
    
      useEffect(() => {
        if(fromDate){
        const dates = {fromDate, toDate}
        postBetweenDates(dates)
        }
      }, [fromDate]);
    
      const myformat = new Intl.NumberFormat('en-US', {
        minimumIntegerDigits: 2,
      });
    
      useEffect(() => {
        const today = new Date()
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const day = today.getDate();
        setTodaysDate(year + "-" + myformat.format(month) + "-" + myformat.format(day))
        setToDate(year + "-" + myformat.format(month) + "-" + myformat.format(day))
        setFromDate(year + "-" + myformat.format(month) + "-" + '01')
      }, []);

      const handleDateFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataToJson = axios.formToJSON(formData);
        postBetweenDates(formDataToJson);
      };

    return(
        <div className={styles.filterFormContainer}>
        <form onSubmit={handleDateFormSubmit}>
          <fieldset>
            <label htmlFor="fromDate">From:</label>

            <input
              type="date"
              id="fromDate"
              name="fromDate"
              min="2025-01-01"
              max={todaysDate}
              defaultValue={fromDate} />

            <label htmlFor="start">To:</label>
            <input
              type="date"
              id="toDate"
              name="toDate"
              min="2025-01-01"
              max={todaysDate}
              defaultValue={todaysDate} />
          </fieldset>
          <div className={styles.formButtons}>
            <button className={styles.submitButtons}>Search</button>
          </div>
        </form>
      </div >  
    )

}

export default DateRangeFilterForm
