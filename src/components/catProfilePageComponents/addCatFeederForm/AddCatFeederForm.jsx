import { useEffect } from "react";
import "./addCatFeederForm.scss";
function UpdateCatFeederForm({ catData, householdMembers, formToggle }) {
  useEffect(() => {
    console.log(catData);
  }, []);

  return (
    <div className="formContainer">
      <form className="addCatFeederForm">
        <fieldset className="formFieldSet">
          <label className="formLabel" htmlFor="catId">
            Cat
          </label>
          <input
            type="text"
            id="catId"
            value={catData.name}
            readOnly
            required
          ></input>
        </fieldset>
        <fieldset className="optionsFieldSet}">
          <label className="formLabel" htmlFor="feederUsername">
            Choose the new feeder.
          </label>
          <select name="feederUsername" id="feederUsername">
            {householdMembers.map((feeder) => {
              return <option>{feeder.username}</option>;
            })}
          </select>
        </fieldset>
        <div className="formButtonsContainer">
          <button type="submit">Submit</button>
          <button onClick={formToggle} type="button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCatFeederForm;
