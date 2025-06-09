import axios from "axios";
import "./addCatForm.scss";

function AddCatForm({ toggleFormDisplay }) {

  //Remove quotation marks from token and store as the axios token bearer header ready to send to the server.
  const formattedToken = localStorage.getItem("storedToken").replaceAll('"', "");
  axios.defaults.headers.common["Authorization"] = `bearer ${formattedToken}`;


  //Create formData object when form is submitted.
  const handleNewCatFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    //convert formData to JSON
    const formToJson = axios.formToJSON(formData);
    //Pass the formData JSON as argument to the axios post function. 
    postNewCatFormData(formToJson);
  };

  //Post formData argument to the server URL.
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
    <div className="formContainer">
      <h3>Add a New Cat</h3>
      <button className="closeFormButton" onClick={toggleFormDisplay}>
        x
      </button>
      <form className="addCatForm" onSubmit={handleNewCatFormSubmit}>
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
        <div className="formButtons">
          <button>Submit</button>
          <button onClick={toggleFormDisplay}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddCatForm;
