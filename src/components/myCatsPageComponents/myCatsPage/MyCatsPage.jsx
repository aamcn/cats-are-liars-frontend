import { useEffect, useState } from "react";
import MyCatsDisplayCard from "../catDisplayCard/myCatsDisplayCard/MyCatsDisplayCard";
import AddCatForm from "../../addCatForm/AddCatForm";
import Footer from "../../footer/Footer";
import axios from "axios";
import "./myCatsPage.scss";
import PawIcon from "../../../assets/svg/paw.svg?react";
import PageTitle from "../../pageTItle/PageTItle";

function MyCatsPage() {
  const [cats, setCats] = useState([]);
  const [formToDisplay, setFormToDisplay] = useState(null);

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
      <PageTitle title="My Cats" />
      {formToDisplay == "Add a Cat" && (
        <AddCatForm toggleFormDisplay={toggleFormDisplay} />
      )}

      <MyCatsDisplayCard cats={cats} />
      <Footer formToggle={toggleFormDisplay} formNames={["Add a Cat"]} />
    </div>
  );
}

export default MyCatsPage;
