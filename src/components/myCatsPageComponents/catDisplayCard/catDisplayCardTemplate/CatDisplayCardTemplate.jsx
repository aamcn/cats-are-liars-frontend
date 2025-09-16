import { useState } from "react";
import DownChevron from "../../../../assets/svg/doubleDownChevron.svg";
import MinimiseIcon from "../../../../assets/svg/minimiseIcon.svg"
import PawIcon from "../../../../assets/svg/paw.svg";
import "./catDisplayCardTemplate.scss";

function CatDisplayCardTemplate({ cat }) {
  const [isCardHidden, setIsCardHidden] = useState(true);

  const handleToggleCard = () => {
    if (isCardHidden == true) {
      setIsCardHidden(false);
      setIsCardHidden(false);
    } else {
      setIsCardHidden(true);
    }
  };

  return (
    <div className="displayCardContainer">
      {isCardHidden && (
        <div className="cardHeader">
          <img className="catCardPhoto" src={null} alt="Cat Photo" />
        </div>
      )}

      <div className="cardTabContainer">
        <h2 className="cardCatName">
          {cat.name} <PawIcon height="1em" width="1em" />
        </h2>
        <button onClick={handleToggleCard} className="cardToggleButton">
          {isCardHidden ? (
            <MinimiseIcon className="cardTabUpChevron" />
          ) : (
            <DownChevron className="cardTabDownChevron" />
          )}
        </button>
      </div>

      {isCardHidden && (
        <div>
          <div className="catCardDetailsContainer">
            <h3 className="catCardDetailsTitle">Meals:</h3>
            <ul className="catCardDetailsList">
              {cat.meals.map((item) => {
                return <li>{item}</li>;
              })}
            </ul>
            <h3 className="catCardDetailsTitle">Meds:</h3>
            <ul className="catCardDetailsList">
              {cat.medication.map((item) => {
                return <li>{item}</li>;
              })}
            </ul>
            <h3>Feeders:</h3>
            <ul>
              <li>Tony</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default CatDisplayCardTemplate;
