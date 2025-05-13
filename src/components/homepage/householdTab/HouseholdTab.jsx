import styles from "./css/householdTab.module.css"
import { useEffect, useState } from "react"
import axios from "axios";

function HouseholdTab({ userId, householdId}) {

    const [isTabHidden, setIsTabHidden] = useState(true)


    const getHouseholdMembers = () => {
        axios
            .get(
                `http://localhost:3000/users/household/all-users`,
                { method: "cors" },
                { withCredentials: true },
            )
            .then((res) => {
                const feedData = res.data;
                console.log(feedData)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleToggleTab = () => {

        if (isTabHidden == true) {
            setIsTabHidden(false);
            setIsTabHidden(false);
        } else {
            setIsTabHidden(true);
        }
    };

    useEffect(() => {

      console.log(userId, householdId)
        getHouseholdMembers()
    }, [])

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