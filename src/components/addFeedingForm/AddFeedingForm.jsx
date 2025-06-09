import { useEffect, useState } from "react";
import axios from "axios";
import "./addFeedingForm.scss";
import { useContext } from "react";
import { appContext } from "../../App";

function AddFeedingForm({ formToggle }) {
  const [selectedCat, setSelectedCat] = useState(null);
  const [medsNeeded, setMedsNeeded] = useState(false);
  const { usersCats, storeUsersCats } = useContext(appContext);


  const username = localStorage.getItem("username").replaceAll('"', "");
  const formattedToken = localStorage.getItem("storedToken").replaceAll('"', "");
  axios.defaults.headers.common["Authorization"] = `bearer ${formattedToken}`;

  /*
    When a selection option is chosen the value is used to filter the correct cat from 'usersCats' by name.
    If the correct catObject is found its stored in 'selectedCat' state.
    */
  const handleCatSelectChange = (event) => {
    event.preventDefault();
    if (event.target.value != "Choose Your Cat") {
      const findCat = usersCats.filter((cat) => {
        return cat.name === event.target.value;
      });
      setSelectedCat(findCat[0]);
    }
  };

  /*
  If the selectedCat medication equals "none" medsNeeded is set to false, this hides the 'Medication Given?'
  section of the form. If selectedCat.medication contains medication medsNeeded is set to true and the 
  selectedCat.medication array is mapped and rendered as form inputs.
  */
  useEffect(() => {
    selectedCat && selectedCat.medication == "none" ? setMedsNeeded(false) : setMedsNeeded(true);
  }, [selectedCat]);

  //On render the selected cat is set to the first entry in the array which is 'Choose Your Cat' prompt.
  useEffect(() => {
    setSelectedCat(usersCats[0]);
  }, []);

  //Creates a formData object from the submitted forms data. 
  const handleFeedingFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    //Appends the form with arguments needed for database identification.
    formData.append("catid", `${selectedCat.catid}`);
    formData.append("authorised_feeders", `${selectedCat.feeder_userid}`);
    formData.append("medication_needed", `${medsNeeded}`);
    if (medsNeeded == false) {
      formData.append("medication_given", "false");
    }
    //Converts the formData to JSON and passes it to the 'postFeedingForm' axios post function.
    const formDataToJson = axios.formToJSON(formData);
    console.log(formDataToJson);
    postFeedingForm(formDataToJson);
  };

  //Posts passed in formData to server URL and responds with server response or error message. 
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
    <div className="feedingformBackDrop">
      <div className="feedingFormContainer">
        <button onClick={formToggle} className="closeFeedingFormButton">
          X
        </button>
        <h3 className="feedingFormTitle">Feeding Form</h3>
        <form className="addFeedingForm" onSubmit={handleFeedingFormSubmit}>
          <fieldset className="formFieldSet">
            <label htmlFor="cat_name">Cat: </label>
            <select
              onChange={handleCatSelectChange}
              name="cat_name"
              id="cat_name"
              aria-label="Cat name selector"
              required
            >
              <option value={null}>Choose Your Cat</option>
              {usersCats &&
                usersCats.map((cat) => {
                  return <option>{cat.name}</option>;
                })}
            </select>
          </fieldset>
          <fieldset className="formFieldSet">
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
          <fieldset className="formFieldSet">
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
            <fieldset className="radioFieldSet">
              <p>Medication Given? </p>
              <p>
                {selectedCat.name} needs: {selectedCat.medication}
              </p>
              <div className="radioButtons">
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
              </div>
            </fieldset>
          )}

          <fieldset className="textAreaFieldSet">
            <label htmlFor="notes">Notes: </label>
            <textarea
              name="notes"
              id="notes"
              cols="26"
              rows="8"
              placeholder="Include things like 'Medication ran out' or 'Did not eat meal'"
              aria-label="Notes text input"
            ></textarea>
          </fieldset>
          <fieldset className="addFeedingFormButtons">
            <button className="addFeedingFormButton" type="submit">
              Submit
            </button>
            <button
              onClick={formToggle}
              className="addFeedingFormButton"
              type="button"
            >
              Cancel
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default AddFeedingForm;
