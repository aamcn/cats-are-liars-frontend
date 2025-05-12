import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./addFeedingForm.module.css";

function AddFeedingForm({ cats }) {
  const [selectedCat, setSelectedCat] = useState(cats[0]);
  const [medsNeeded, setMedsNeeded] = useState(false);

  const username = localStorage.getItem("username").replaceAll('"', "");
  const userId = localStorage.getItem("userId").replaceAll('"', "");
  const b = localStorage.getItem("storedToken").replaceAll('"', "");
  axios.defaults.headers.common["Authorization"] = `bearer ${b}`;

  const handleCatSelectChange = (event) => {
    event.preventDefault();
    const findCat = cats.filter((cat) => {
      return cat.name === event.target.value;
    });
    setSelectedCat(findCat[0]);
  };

  useEffect(() => {
    if (selectedCat && selectedCat.medication == "none") {
      setMedsNeeded(false);
    } else {
      setMedsNeeded(true);
    }
  }, [selectedCat]);

  const handleFeedingFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("catid", `${selectedCat.catid}`);
    formData.append("authorised_feeders", `${selectedCat.feeder_userid}`);
    formData.append("medication_needed", `${medsNeeded}`);
    if (medsNeeded == false) {
      formData.append("medication_given", "false");
    }
    const formDataToJson = axios.formToJSON(formData);
    console.log(formDataToJson);
    postFeedingForm(formDataToJson);
  };

  const postFeedingForm = (formData) => {
    let body = formData;
    axios
      .post(
        "http://localhost:3000/feed-history/submit-feeding",
        { body },
        { method: "cors" },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.formContainer}>
      <button className={styles.closeFormButton}>X</button>
      <form
        className={styles.addFeedingForm}
        onSubmit={handleFeedingFormSubmit}
      >
        <label>Feeding Form</label>
        <fieldset className={styles.formFieldSet}>
          <label htmlFor="cat_name">Cat: </label>
          <select
            onChange={handleCatSelectChange}
            name="cat_name"
            id="cat_name"
            aria-label="Cat name selector"
            required
          >
            <option value={""}>Choose Your Cat</option>
            {cats &&
              cats.map((cat) => {
                return <option>{cat.name}</option>;
              })}
          </select>
        </fieldset>
        <fieldset className={styles.formFieldSet}>
          <label htmlFor="feeder_username">Feeder Username: </label>
          <input
            type="text"
            name="feeder_username"
            id="feeder_username"
            value={username}
            aria-label="Feeder Username, Read Only"
            readOnly
            required
          ></input>
        </fieldset>
        <fieldset className={styles.formFieldSet}>
          <label htmlFor="time">Fed at: </label>
          <input
            type="time"
            name="time"
            id="time"
            aria-label="Feeding Time Input"
            required
          ></input>
        </fieldset>

        {medsNeeded && (
          <fieldset className={styles.radioFieldSet}>
            <p>Medication Given? </p>
            <p>
              {selectedCat.name} needs: {selectedCat.medication}
            </p>
            <label>Yes: </label>
            <input
              type="radio"
              name="medication_given"
              id="medication_given"
              aria-label="Medication Given 'Yes' button"
              required
            ></input>
            <> </>
            <label>No: </label>
            <input
              type="radio"
              name="medication_given"
              id="medication_given"
              aria-label="Medication Given 'No' button"
              required
            ></input>
          </fieldset>
        )}

        <fieldset className={styles.textAreaFieldSet}>
          <label htmlFor="notes">Notes: </label>
          <textarea
            name="notes"
            id="notes"
            cols="30"
            rows="10"
            placeholder="Include things like 'Medication ran out' or 'Did not eat meal'"
            aria-label="Notes text input"
          ></textarea>
        </fieldset>
        <fieldset className={styles.formButtonsContainer}>
          <button className={styles.submitButton} type="submit">
            Submit
          </button>
          <button className={styles.cancelButton} type="submit">
            Cancel
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default AddFeedingForm;
