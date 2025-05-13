import styles from "./css/householdTab.module.css"
import { useState } from "react"
function HouseholdTab({ }) {

    const [isTabHidden, setIsTabHidden] = useState(true)

    const handleToggleTab = () => {

        if (isTabHidden == true) {
            setIsTabHidden(false);
            setIsTabHidden(false);
        } else {
            setIsTabHidden(true);
        }
    };

    return (
        <div>
            <div className={styles.tabMenuContainer}>
                <p>HouseholdTab</p>
                <button onClick={handleToggleTab} className={styles.tabButton}>V</button>
            </div>

            {!isTabHidden && <div>
                <p>Hi</p>
            </div>}
            
        </div>
    )
}

export default HouseholdTab