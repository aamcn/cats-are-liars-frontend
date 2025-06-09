import { use, useEffect, useState } from "react";
import MyCatsDisplayCard from "../catDisplayCard/MyCatsDisplayCard";
import axios from "axios";
import "./myCatsPage.scss";
import PawIcon from "../../../assets/svg/paw.svg?react";

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

  

  return (
    <div className="myCatsPageContainer">
      <div className="pageTitle">
        <h1>
          <PawIcon height="1em" width="1em" /> My Cats{" "}
          <PawIcon height="1em" width="1em" />
        </h1>
      </div>
      
      <MyCatsDisplayCard cats={cats} />
    </div>
  );
}

export default MyCatsPage;
