import { useEffect, useState } from "react";
import axios from "axios";
import UsersCatsDisplay from "../usersCatsDisplay/UsersCatsDisplay";
import LastFeedTemplate from "./LastFeedTemplate";
import AddFeedingForm from "../addFeedingForm/AddFeedingForm";

function Homepage() {
  const [cats, setCats] = useState([]);
  const [lastFeedEntry, setLastFeedEntry] = useState([]);
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

  const getLastFeedEntry = (catName) => {
    setLastFeedEntry([]);
    axios
      .get(
        `http://localhost:3000/feed-history/cat-name/${catName}/get/`,
        { userId },
        { method: "cors" },
        { withCredentials: true },
      )

      .then((res) => {
        const feedData = res.data;
        if (feedData.length > 0) {
          setLastFeedEntry((lastFeedEntry) => [
            ...lastFeedEntry,
            feedData[feedData.length - 1],
          ]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCats();
  }, []);

  useEffect(() => {
    cats.forEach((cat) => {
      getLastFeedEntry(cat.name);
    });
  }, [cats]);

  const handleToggleDisplay = () => {
    if (isHidden == true) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  };

  return (
    <div>
      <h1>home</h1>
      <button onClick={handleToggleDisplay}>Add Feeding +</button>
      {username && <p>Welcome back {username}</p>}
      <UsersCatsDisplay cats={cats} />
      {!isHidden && <AddFeedingForm cats={cats} />}
      <div className="table">
        <h5>Last Feed</h5>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Time</th>
              <th>Fed By</th>
              <th>Medication Needed</th>
              <th>Medication Given</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {lastFeedEntry &&
              lastFeedEntry.map((entry) => {
                return <LastFeedTemplate entry={entry} />;
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Homepage;
