import axios from "axios";
import "./lastFeedTable.scss";
import LastFeedTemplate from "../LastFeedRowTemplate";
import DownChevron from "../../../../assets/svg/doubleDownChevron.svg?react";
import MinimiseIcon from "../../../../assets/svg/minimiseIcon.svg?react";
import { useState, useEffect } from "react";

function LastFeedTable({
  userCats,
  userId,
  lastFeedVisibility,
  handleToggleLastFeedTable,
}) {
  const [lastFeedEntry, setLastFeedEntry] = useState([]);

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
    userCats.forEach((cat) => {
      getLastFeedEntry(cat.name);
    });
  }, [userCats]);

  return (
    <div className="tabContainer">
      <div className="lastFeedMenuContainer">
        <h3>Last Feed</h3>
        <button
          onClick={handleToggleLastFeedTable}
          className="lastFeedTabButton "
        >
          {lastFeedVisibility ? (
            <MinimiseIcon className="minimiseIcon" />
          ) : (
            <DownChevron className="downChevron" />
          )}
        </button>
      </div>
      {lastFeedVisibility && (
        <table className="lastFeedTable">
          <thead className="tableHead">
            <tr className="tableRows">
              <th className="columnTitle" scope="col">
                Date
              </th>
              <th className="columnTitle" scope="col">
                Time
              </th>
              <th className="columnTitle" scope="col">
                Name
              </th>
              <th className="columnTitle" scope="col">
                Fed By
              </th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {lastFeedEntry &&
              lastFeedEntry.map((entry) => {
                return <LastFeedTemplate entry={entry} />;
              })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LastFeedTable;
