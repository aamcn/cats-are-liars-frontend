import { useEffect, useState, useContext } from "react";
import { appContext } from "../../../App.jsx";
import axios from "axios";
import { useParams } from "react-router";
import UpdateCatForm from "../updateCatForm/UpdateCatForm.jsx";
import "./catProfilePage.scss";
import AddCatFeederForm from "../addCatFeederForm/AddCatFeederForm.jsx";
import Footer from "../../footer/Footer.jsx";

function CatProfilePage() {
  const [catData, setCatData] = useState();
  const [feeders, setFeeders] = useState([]);
  const param = useParams();
  const [formToDisplay, setFormToDisplay] = useState(null);
  const { householdMembers} = useContext(appContext);

  const userId = localStorage.getItem("userId").replaceAll('"', "");
  const formattedToken = localStorage.getItem("storedToken").replaceAll('"', "");
  axios.defaults.headers.common["Authorization"] = `bearer ${formattedToken}`;

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
        if (res.data[0].username === undefined) {
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

  const toggleFormDisplay = (event) => {
    if (formToDisplay != event.target.value) {
      setFormToDisplay(event.target.value);
    } else {
      setFormToDisplay(null);
    }
  };

  return (
    <div>
      {catData &&
        formToDisplay == `Update ${catData ? catData.name : null}'s Info` && (
          <UpdateCatForm catData={catData} formToggle={toggleFormDisplay} />
        )}
      {catData && formToDisplay == `Add a Feeder` && (
        <AddCatFeederForm
          catData={catData}
          householdMembers={householdMembers}
          formToggle={toggleFormDisplay}
        />
      )}
      {catData && (
        <div className="catProfilePageContainer">
          {catData && (
            <div className="catProfilePageTitle">
              <h1>{catData.name}</h1>
            </div>
          )}

          <div className="catProfileHeaderContainer">
            <img className="catProfilePhoto" src={null} alt="Cat Photo" />
            <hr />
          </div>

          <div className="catProfileInfoContainer">
            {catData && (
              <div className="catProfileInfoTitle">
                <h2>{catData.name}'s Info</h2>
              </div>
            )}
            <hr />
            <div className="catProfileInfoSection">
              <h3 className="catProfileSectionTitle">Household:</h3>
              <p className="catProfileHouseholdName">
                {householdMembers[0]
                  ? householdMembers[0].household_name
                  : "Loading"}
              </p>
            </div>
            <hr />
            <div className="catProfileInfoSection">
              <h3 className="catProfileSectionTitle">Meals:</h3>
              <ul className="catProfileDetailsList">
                {catData.meals.map((item) => {
                  return <li className="catProfileListEntry">{item}</li>;
                })}
              </ul>
            </div>
            <hr />
            <div className="catProfileInfoSection">
              <h3 className="catProfileSectionTitle">Medication:</h3>
              <ul className="catProfileDetailsList">
                {catData.medication.map((item) => {
                  return <li className="catProfileListEntry">{item}</li>;
                })}
              </ul>
            </div>

            <hr />
            <div className="catProfileInfoSection">
              <h3 className="catProfileSectionTitle">Feeders:</h3>
              <ul className="catProfileDetailsList">
                {feeders.map((item) => {
                  return <li className="catProfileListEntry">{item}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
      {catData && (
        <Footer
          formToggle={toggleFormDisplay}
          formNames={["Add a Feeder", `Update ${catData.name}'s Info`]}
        />
      )}{" "}
    </div>
  );
}

export default CatProfilePage;
