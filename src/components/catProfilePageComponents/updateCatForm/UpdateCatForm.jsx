import axios from "axios";
import "./updateCatForm.scss";

function UpdateCatForm({ catData }) {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const formDataToJson = axios.formToJSON(formData);
    console.log(formDataToJson);
    postFeedingForm(formDataToJson);
  };

  const postFeedingForm = (formData) => {
    let body = formData;
    axios
      .post(
        `http://localhost:3000/cats/cat-id/${catData.catid}/update`,
        { formData },
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
      <button className="closeFormButton">X</button>
      <form className="updateCatForm" onSubmit={handleFormSubmit}>
        <fieldset className="formFieldSet">
          <label className="formLabel" htmlFor="newName">
            Cat Name:
          </label>
          <input
            defaultValue={catData.name}
            type="text"
            name="newName"
            id="newName"
            aria-label="Cat name Input"
            required
          ></input>
        </fieldset>
        <fieldset className="textAreaFieldSet">
          <label className="formLabel" htmlFor="newMeals">
            Meals:
          </label>
          <textarea
            defaultValue={catData.meals}
            name="newMeals"
            id="newMeals"
            aria-label="New cat meals input."
            required
          ></textarea>
        </fieldset>
        <fieldset className="textAreaFieldSet">
          <label className="formLabel" htmlFor="newMedication">
            Medication
          </label>
          <textarea
            defaultValue={catData.medication}
            name="newMedication"
            id="newMedication"
            aria-label="New cat medication input."
          ></textarea>
        </fieldset>
        <div className="formButtonsContainer">
          <button type="Submit">Submit</button>
          <button type="Submit">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCatForm;
