import { use, useEffect, useState } from "react";
import MyCatsDisplayCard from "./MyCatsDisplayCard";
import axios from "axios";
import AddCatForm from "./AddCatForm";
import styles from "./css/myCatsPage.module.css";

function MyCatsPage() {
  const [cats, setCats] = useState([]);
  const [isHidden, setIsHidden] = useState(true);

  const username = localStorage.getItem("username").replaceAll('"', "");
  const userId = localStorage.getItem("userId").replaceAll('"', "");
  const b = localStorage.getItem("storedToken").replaceAll('"', "");
  axios.defaults.headers.common["Authorization"] = `bearer ${b}`;

  const getCats = () => {
    axios
      .get(
        "http://localhost:3000/cats",
        { userId },
        { method: "cors" },
        { withCredentials: true },
      )
      .then((res) => setCats(res.data))
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCats();
  }, []);

  const toggleAddCatForm = () => {
    if (isHidden) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  };

  return (
    <div className={styles.myCatsPageContainer}>
      <h1 className={styles.pageTitle}>My Cats</h1>

      {!isHidden && <AddCatForm toggleAddCatForm={toggleAddCatForm} />}
      <MyCatsDisplayCard cats={cats} />

      <div className={styles.toggleButtons}>
        <button className={styles.toggleButton} onClick={toggleAddCatForm}>
          {isHidden ? "Add A Cat" : "Cancel"}
        </button>
      </div>
    </div>
  );
}

export default MyCatsPage;
