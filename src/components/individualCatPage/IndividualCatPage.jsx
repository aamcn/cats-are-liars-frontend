import { useEffect, useState, useContext } from "react";
import { appContext } from "../../App";
import axios from "axios";
import { useParams } from "react-router";
import UpdateCatForm from "./UpdateCatForm";
import styles from "./css/individualCatPage.module.css";
import AddCatFeederForm from "./AddCatFeederForm";
function IndividualCatPage() {
  const [catData, setCatData] = useState();
  const [feeders, setFeeders] = useState([]);
  const param = useParams();
  const [updateFormHidden, setUpdateFormHidden] = useState(true);
  const [addFeederFormHidden, setAddFeederFormHidden] = useState(true);
  const { householdMembers, storeHouseholdMembers } = useContext(appContext);

  const username = localStorage.getItem("username").replaceAll('"', "");
  const userId = localStorage.getItem("userId").replaceAll('"', "");
  const b = localStorage.getItem("storedToken").replaceAll('"', "");
  axios.defaults.headers.common["Authorization"] = `bearer ${b}`;

  const getCatByName = (catName) => {
    axios
      .get(
        `http://localhost:3000/cats/cat-name/${catName}`,
        { userId },
        { method: "cors" },
        { withCredentials: true },
      )
      .then((res) => {
        const data = res.data;
        setCatData(data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCatByName(param.catName);
  }, []);

  const getFeederById = (feederId) => {
    axios
      .get(
        `http://localhost:3000/users/user-by-id/${feederId}`,
        { userId },
        { method: "cors" },
        { withCredentials: true },
      )
      .then((res) => {
        if (!res.data[0].username == "undefined") {
          return;
        }
        const data = res.data;
        setFeeders((feeders) => [...feeders, data[0].username]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (catData != null) {
      catData.feeder_userid.forEach((id) => {
        getFeederById(id);
      });
    }
  }, [catData]);

  const toggleUpdateForm = () => {
    if (updateFormHidden == true) {
      setUpdateFormHidden(false);
    } else {
      setUpdateFormHidden(true);
    }
  };

  const toggleAddFeederForm = () => {
    if (addFeederFormHidden == true) {
      setAddFeederFormHidden(false);
    } else {
      setAddFeederFormHidden(true);
    }
  };

  return (
    <div>
      {!updateFormHidden && <UpdateCatForm catData={catData} />}
      {!addFeederFormHidden && (
        <AddCatFeederForm
          catData={catData}
          householdMembers={householdMembers}
        />
      )}

      {catData && (
        <div className={styles.catPageContainer}>
          {catData && (
            <div className={styles.pageTitle}>
              <h1>{catData.name}</h1>
            </div>
          )}

          <div className={styles.catHeaderContainer}>
            <img
              className={styles.catProfilePhoto}
              src={null}
              alt="Cat Photo"
            />
            <hr />
          </div>

          <div className={styles.catInfoContainer}>
            {catData && (
              <div className={styles.catInfoTitle}>
                <h2>{catData.name}'s Info</h2>
              </div>
            )}
            <hr />
            <div className={styles.catInfoSection}>
              <h3 className={styles.sectionTitle}>Household:</h3>
              <p className={styles.householdName}>
                {householdMembers[0]
                  ? householdMembers[0].household_name
                  : "Loading"}
              </p>
            </div>
            <hr />
            <div className={styles.catInfoSection}>
              <h3 className={styles.sectionTitle}>Meals:</h3>
              <ul className={styles.catDetailsList}>
                {catData.meals.map((item) => {
                  return <li className={styles.listEntry}>{item}</li>;
                })}
              </ul>
            </div>
            <hr />
            <div className={styles.catInfoSection}>
              <h3 className={styles.sectionTitle}>Medication:</h3>
              <ul className={styles.catDetailsList}>
                {catData.medication.map((item) => {
                  return <li className={styles.listEntry}>{item}</li>;
                })}
              </ul>
            </div>

            <hr />
            <div className={styles.catInfoSection}>
              <h3 className={styles.sectionTitle}>Feeders:</h3>
              <ul className={styles.catDetailsList}>
                {feeders.map((item) => {
                  return <li className={styles.listEntry}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default IndividualCatPage;
