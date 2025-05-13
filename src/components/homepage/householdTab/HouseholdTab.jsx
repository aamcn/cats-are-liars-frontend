import styles from "./css/householdTab.module.css"
import { useEffect, useState, useContext } from "react"
import { appContext } from "../../../App";
import axios from "axios";

function HouseholdTab({ userId, householdId }) {

    const [isTabHidden, setIsTabHidden] = useState(true)
    const { householdMembers, storeHouseholdMembers } = useContext(appContext);

    const getHouseholdMembers = () => {
        axios
            .get(
                `http://localhost:3000/users/household/all-users`,
                { method: "cors" },
                { withCredentials: true },
            )
            .then((res) => {
                const userData = res.data;
                console.log(userData)
                storeHouseholdMembers(userData)
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
                <p>{householdMembers[0] ? householdMembers[0].household_name : 'Loading'} Household Users</p>
                <button onClick={handleToggleTab} className={styles.tabButton}>V</button>
            </div>

            {!isTabHidden && <div>
                {householdMembers.map(user => {
                    return <div>
                        <p>{user.username}</p>
                        <img alt="User Photo"></img>
                    </div>
                })}
            </div>}

        </div>
    )
}

export default HouseholdTab