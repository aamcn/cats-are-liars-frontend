import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import UpdateCatForm from "../updateCatForm/UpdateCatForm";
function IndividualCatPage() {
  const [catData, setCatData] = useState(null);
  const [feeders, setFeeders] = useState([]);
  const param = useParams();

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

  return (
    <div>
      {catData  &&  <h1>{catData.name}</h1>}

      <h3>Meals:</h3>
      <ul>
      {catData  &&  catData.meals.map(item => {
        return <li>{item}</li>
      })}
      </ul>
      
      <h3>Meds:</h3>
      <ul>
      {catData  &&  catData.medication.map(item => {
        return <li>{item}</li>
      })}
      </ul>
      
      <h3>Feeders:</h3>
      <ul>
      {catData  &&  feeders.map(item => {
        return <li>{item}</li>
      })}
      </ul>

      {catData && <UpdateCatForm catData={catData}/>}
    </div>
  );
}
export default IndividualCatPage;
