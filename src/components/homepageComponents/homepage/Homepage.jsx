import { useEffect, useState } from "react";
import axios from "axios";
import "./homepage.scss";
import MyCatsTab from "../myCatsTabComponents/myCatsTab/MyCatsTab";
import LastFeedTable from "../lastFeedTable/lastFeedTable/LastFeedTable";
import AddFeedingForm from "../../addFeedingForm/AddFeedingForm";
import HouseholdTab from "../householdTab/HouseholdTab";
import PawIcon from "../../../assets/svg/paw.svg?react";
import Footer from "../../footer/Footer";
import { useContext } from "react";
import { appContext } from "../../../App";
import PageTitle from "../../pageTItle/PageTItle";

function Homepage() {
  const { usersCats, storeUsersCats } = useContext(appContext);
  const [formVisibility, setFormVisibility] = useState(null);
  const [lastFeedVisibility, setLastFeedVisibility] = useState(true);

  const username = localStorage.getItem("username").replaceAll('"', "");
  const userId = localStorage.getItem("userId").replaceAll('"', "");
  const b = localStorage.getItem("storedToken").replaceAll('"', "");
  const householdId = localStorage.getItem("householdId").replaceAll('"', "");
  axios.defaults.headers.common["Authorization"] = `bearer ${b}`;

  const getCats = () => {
    axios
      .get(
        "http://localhost:3000/cats",
        { userId },
        { method: "cors" },
        { withCredentials: true },
      )
      .then((res) => storeUsersCats(res.data))
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCats();
  }, []);

  const handleToggleLastFeedTable = () => {
    if (lastFeedVisibility == true) {
      setLastFeedVisibility(false);
    } else {
      setLastFeedVisibility(true);
    }
  };

  const toggleAddFeedingForm = (event) => {
    if (formVisibility != event.target.value) {
      setFormVisibility(event.target.value);
    } else {
      setFormVisibility(null);
    }
  };

  return (
    <div className="homepageContainer">
     <PageTitle title="Cats Are Liars" />
      {username && <p className="welcomeMessage">Welcome back {username}</p>}

      {formVisibility == "Log a Feeding" && (
        <AddFeedingForm
          userCats={usersCats}
          formToggle={toggleAddFeedingForm}
        />
      )}

      <div className="mainContent">
        <MyCatsTab userCats={usersCats} />
        <LastFeedTable
          userCats={usersCats}
          handleToggleLastFeedTable={handleToggleLastFeedTable}
          lastFeedVisibility={lastFeedVisibility}
          userId={userId}
        />
        <HouseholdTab householdId={householdId} userId={userId} />
      </div>
      <Footer formToggle={toggleAddFeedingForm} formNames={["Log a Feeding"]} />
    </div>
  );
}

export default Homepage;
