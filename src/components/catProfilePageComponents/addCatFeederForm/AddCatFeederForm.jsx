import "./addCatFeederForm.scss";

function AddCatFeederForm({ catData, householdMembers, formToggle }) {
 
  return (
    <div className="formContainer" data-testid="add-feeder-form-container">
      <form className="addCatFeederForm">
        <fieldset className="formFieldSet">
          <label className="formLabel" htmlFor="catId">
            Cat
          </label>
          <input
            type="text"
            id="catId"
            value={catData.name}
            data-testid="cat-name-input"
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
              return <option key={feeder.id}>{feeder.username}</option>;
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

export default AddCatFeederForm;
