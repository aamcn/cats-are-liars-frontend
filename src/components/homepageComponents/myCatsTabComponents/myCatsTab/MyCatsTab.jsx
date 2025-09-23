import "./myCatsTab.scss";
import { useState } from "react";
import CatTabTemplate from "../catTabTemplate/CatTabTemplate.jsx";
import DownChevron from "../../../../assets/svg/doubleDownChevron.svg";
import MinimiseIcon from "../../../../assets/svg/minimiseIcon.svg";
import { useContext } from "react";
import { appContext } from "../../../../App.jsx";

function MyCatsTab() {
  const [catsTabVisible, setCatsTabVisible] = useState(true);
  const { usersCats } = useContext(appContext);

  const handleToggleTab = () => {
    if (catsTabVisible == true) {
      setCatsTabVisible(false);
      setCatsTabVisible(false);
    } else {
      setCatsTabVisible(true);
    }
  };

  if(usersCats.length === 0) {
    return (
     <div className="homeCatsTabContainer">
      <div className="homeCatsTab">
        <h3>My Cats</h3>
        <button onClick={handleToggleTab} className="homeCatsTabButton">
          {catsTabVisible ? (
            <img src={MinimiseIcon} className="minimiseIcon" />
          ) : (
            <img src={DownChevron} className="downChevron" />
          )}
        </button>
      </div>
      {catsTabVisible && (
        <div className="homeCatCardsContainer">
            <p>No Cats Found :/</p>
        </div>
      )}
    </div>
    )
  }

  return (
    <div className="homeCatsTabContainer">
      <div className="homeCatsTab">
        <h3>My Cats</h3>
        <button onClick={handleToggleTab} className="homeCatsTabButton">
          {catsTabVisible ? (
            <MinimiseIcon className="minimiseIcon" />
          ) : (
            <DownChevron className="downChevron" />
          )}
        </button>
      </div>
      {catsTabVisible && (
        <div className="homeCatCardsContainer">
          {usersCats.map((cat) => {
            return <CatTabTemplate key={cat.id} cat={cat} />;
          })}
        </div>
      )}
    </div>
  );
}
export default MyCatsTab;
