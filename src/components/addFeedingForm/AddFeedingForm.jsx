import { useEffect, useState } from "react";
import axios from "axios";
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
    console.log(selectedCat);
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
    <div>
      <form onSubmit={handleFeedingFormSubmit}>
        <label>Feeding Form</label>
        <fieldset>
          <label htmlFor="cat_name">Cat </label>
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
        <fieldset>
          <label htmlFor="feeder_username">Feeder Username </label>
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
        {medsNeeded && (
          <fieldset>
            <p>Medication Given?</p>
            <p>
              {selectedCat.name} needs: {selectedCat.medication}
            </p>
            <input
              type="radio"
              name="medication_given"
              id="medication_given"
              aria-label="Medication Given 'Yes' button"
              required
            ></input>
            <label>Yes</label>
            <input
              type="radio"
              name="medication_given"
              id="medication_given"
              aria-label="Medication Given 'No' button"
              required
            ></input>
            <label>No</label>
          </fieldset>
        )}
        <fieldset>
          <label htmlFor="time">Feed Time </label>
          <input
            type="time"
            name="time"
            id="time"
            aria-label="Feeding Time Input"
            required
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="notes">Notes </label>
          <textarea
            name="notes"
            id="notes"
            aria-label="Notes text input"
          ></textarea>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddFeedingForm;
