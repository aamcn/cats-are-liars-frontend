import styles from "../css/myCatsTab.module.css"
import { useState } from "react";
import CatTabTemplate from "./CatTabTemplate";
function MyCatsTab( {userCats} ) {

    const [catsTabVisible, setCatsTabVisible] = useState(true)

  const handleToggleTab = () => {
    if (catsTabVisible == true) {
      setCatsTabVisible(false);
      setCatsTabVisible(false);
    } else {
      setCatsTabVisible(true);
    }
  };


    return (

            <div className={styles.tabContainer}>
                <div className={styles.tabMenuContainer}>
                    <p>My Cats</p>
                    <button onClick={handleToggleTab} className={styles.tabButton}>{catsTabVisible? '↥'  : '↧'}</button>
                </div>
                {catsTabVisible && <div className={styles.catCardsContainer}>
                    {userCats.map((cat) => {
                        return <CatTabTemplate key={cat.id} cat={cat} />;
                    })}
                </div>}
            </div>
 
    )
}
export default MyCatsTab