import { useEffect } from "react";
import styles from "./css/addCatFeederForm.module.css";
function UpdateCatFeederForm({ catData }) {
  useEffect(() => {
    console.log(catData);
  }, []);

  return (
    <div className={styles.formContainer}>
      <form className={styles.addCatFeederForm}>
        <fieldset className={styles.formFieldSet}>
          <label className={styles.formLabel} htmlFor="catId">
            Cat
          </label>
          <input type="text" value={catData.name} readOnly required></input>
        </fieldset>
        <fieldset className={styles.optionsFieldSet}>
          <label className={styles.formLabel} htmlFor="feederUsername">
            Choose the new feeder.
          </label>
          <select name="feederUsername">
            <option>option 1</option>
          </select>
        </fieldset>
        <div className={styles.formButtonsContainer}>
          <button type="submit">Submit</button>
          <button type="submit">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCatFeederForm;
