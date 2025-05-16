import { Link } from "react-router";
import { useState } from "react";
import DownChevron from "../../assets/svg/doubleDownChevron.svg?react";
import MinimiseIcon from "../../assets/svg/minimiseIcon.svg?react";
import PawIcon from "../../assets/svg/paw.svg?react";
import styles from "./css/catDisplayCardTemplate.module.css";

function CatDisplayCardTemplate({ cat }) {
  const [isCardHidden, setIsCardHidden] = useState(false);

  const handleToggleCard = () => {
    if (isCardHidden == true) {
      setIsCardHidden(false);
      setIsCardHidden(false);
    } else {
      setIsCardHidden(true);
    }
  };

  return (
    <div className={styles.displayCardContainer}>
      {isCardHidden && (
        <div className={styles.cardHeader}>
          <img className={styles.catCardPhoto} src={null} alt="Cat Photo" />
        </div>
      )}

      <div className={styles.tabMenuContainer}>
        <h2 className={styles.catName}>
          {cat.name} <PawIcon height="1em" width="1em" />
        </h2>
        <button onClick={handleToggleCard} className={styles.tabButton}>
          {isCardHidden ? (
            <MinimiseIcon className={styles.minimiseIcon} />
          ) : (
            <DownChevron className={styles.downChevron} />
          )}
        </button>
      </div>

      {isCardHidden && (
        <div>
          <div className={styles.catDetailsContainer}>
            <h3 className={styles.catDetailsTitle}>Meals:</h3>
            <ul className={styles.catDetailsList}>
              {cat.meals.map((item) => {
                return <li>{item}</li>;
              })}
            </ul>
            <h3 className={styles.catDetailsTitle}>Meds:</h3>
            <ul className={styles.catDetailsList}>
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
