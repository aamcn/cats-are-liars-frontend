import axios from "axios";
import styles from "../css/lastFeedTable.module.css";
import LastFeedTemplate from "./LastFeedRowTemplate";
import { useState, useEffect } from "react";


function LastFeedTable({ userCats, userId, lastFeedVisibility, handleToggleLastFeedTable}) {

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
        <div className={styles.tabContainer}>
                <div className={styles.tabMenuContainer}>
                                    <p>Last Feed</p>
                                    <button onClick={handleToggleLastFeedTable} className={styles.tabButton}>{lastFeedVisibility ? '↥'  : '↧'}</button>
                                </div>
              {lastFeedVisibility && <table className={styles.lastFeedTable}>
                    <thead className={styles.tableHead}>
                        <tr className={styles.tableRows}>
                            <th className={styles.columnTitle} scope="col">
                                Date
                            </th>
                            <th className={styles.columnTitle} scope="col">
                                Time
                            </th>
                            <th className={styles.columnTitle} scope="col">
                                Name
                            </th>
                            <th className={styles.columnTitle} scope="col">
                                Fed By
                            </th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {lastFeedEntry &&
                            lastFeedEntry.map((entry) => {
                                return <LastFeedTemplate entry={entry} />;
                            })}
                    </tbody>
                </table>}  

            </div>

    )
}

export default LastFeedTable;