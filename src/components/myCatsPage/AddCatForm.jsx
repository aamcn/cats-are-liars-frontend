import axios from "axios";
import { useState } from "react";
import styles from "./css/addCatForm.module.css"

function AddCatForm( { toggleAddCatForm}) {
  const username = localStorage.getItem("username").replaceAll('"', "");
  const userId = localStorage.getItem("userId").replaceAll('"', "");
  const b = localStorage.getItem("storedToken").replaceAll('"', "");
  axios.defaults.headers.common["Authorization"] = `bearer ${b}`;

  const handleNewCatFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formToJson = axios.formToJSON(formData);
    postNewCatFormData(formToJson);
  };

  const postNewCatFormData = (formData) => {
    let body = formData;
    axios
      .post(
        "http://localhost:3000/cats/add-new-cat",
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
     <h3>Add a New Cat</h3>
      <button className={styles.closeFormButton} onClick={toggleAddCatForm}>x</button>
      <form className={styles.addCatForm} onSubmit={handleNewCatFormSubmit}>
        <fieldset>
          <label htmlFor="newCatName">Name: </label>
          <input
            type="text"
            name="newCatName"
            id="newCatName"
            placeholder="Cats Name"
            aria-label="Cats Name Input"
            required
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="newCatMeals">Meals: </label>
          <textarea
            name="newCatMeals"
            id="newCatMeals"
            rows="5" 
            cols="30"
            placeholder="Cat Meals seperate each with a comma"
            aria-label="Cats Meals Input"
          ></textarea>
        </fieldset>
        <fieldset>
          <label htmlFor="newCatMedication">Medication: </label>
          <textarea
            name="newCatMedication"
            id="newCatMedication"
            rows="5" 
            cols="30"
            placeholder="Leave blank if no medication needed"
            aria-label="Cats Medication Input"
          ></textarea>
        </fieldset>
          <div className={styles.formButtons}>
          <button>Submit</button>
          <button onClick={toggleAddCatForm}>Cancel</button>
          </div>
      </form>
    </div>
  );
}

export default AddCatForm;
