import { use, useEffect, useState } from "react";
import MyCatsDisplayCard from "../catDisplayCard/MyCatsDisplayCard";
import AddCatForm from "../../addCatForm/AddCatForm";
import Footer from "../../footer/Footer";
import axios from "axios";
import "./myCatsPage.scss";
import PawIcon from "../../../assets/svg/paw.svg?react";

function MyCatsPage() {
  const [cats, setCats] = useState([]);
  const [formToDisplay, setFormToDisplay] = useState(null);


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

  const toggleFormDisplay = (event) => {
    if (formToDisplay != event.target.value) {
      setFormToDisplay(event.target.value);
    } else {
      setFormToDisplay(null);
    }
  };

  return (
    <div className="myCatsPageContainer">
      <div className="pageTitle">
        <h1>
          <PawIcon height="1em" width="1em" /> My Cats{" "}
          <PawIcon height="1em" width="1em" />
        </h1>
      </div>
      {formToDisplay == 'Add a Cat' && <AddCatForm  toggleFormDisplay={toggleFormDisplay}/>}

      <MyCatsDisplayCard cats={cats} />
      <Footer formToggle={toggleFormDisplay}  formNames={['Add a Cat']}/>
    </div>
  );
}

export default MyCatsPage;
