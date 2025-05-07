import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import UpdateCatForm from "./UpdateCatForm";
import styles from "./css/individualCatPage.module.css"
import UpdateCatFeederForm from "./UpdateCatFeederForm";
function IndividualCatPage() {
  const [catData, setCatData] = useState();
  const [feeders, setFeeders] = useState([]);
  const param = useParams();
  const [updateFormHidden, setUpdateFormHidden] = useState(true)

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
        const data = res.data
        setCatData(data[0])
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

      setUpdateFormHidden(false)
    } else {
      setUpdateFormHidden(true)
    }
  }


  return (

    <div>
      {catData &&
        <div className={styles.catPageContainer}>
          <h1 className={styles.pageTitle}>{catData.name}</h1>

          <div className={styles.toggleButtonsContainer}>
            <button onClick={toggleUpdateForm}>Update {catData.name}'s Details</button>
            <button>Update {catData.name}'s Feeders</button>
          </div>

          <div className={styles.catPhotoContainer}>
            <img src={null} alt="Cat Photo"/>
          </div>

          <div className={styles.catDetailsContainer}>
            <h3>Meals:</h3>
            <ul>
              {catData.meals.map(item => {
                return <li>{item}</li>
              })}
            </ul>

            <h3>Meds:</h3>
            <ul>
              {catData.medication.map(item => {
                return <li>{item}</li>
              })}
            </ul>
            
            <h3>Feeders:</h3>
            <ul>
              {feeders.map(item => {
                return <li>{item}</li>
              })}
            </ul>
          </div>
          {!updateFormHidden && <UpdateCatForm catData={catData} />}
          {/* { catData && <UpdateCatFeederForm catData={catData}/>} */}
        </div>}
        
    </div>
  );
}

export default IndividualCatPage;
