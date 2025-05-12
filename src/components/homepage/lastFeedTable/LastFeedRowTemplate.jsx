import { Link } from "react-router";
import styles from "../css/lastFeedRowTemplate.module.css";
function LastFeedTemplate({ entry }) {
  const splitDate = entry.date.split("T");
  const formattedDate = splitDate[0].split("-").reverse().join("-");
  const catName = entry.cat_name;
  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableData}>
        <p>{formattedDate}</p>
      </td>
      <td className={styles.tableData}>
        <p>{entry.time}</p>
      </td>
      <td className={styles.tableData}>
        <Link to={`/cat-view/${catName}`}>{catName}</Link>
      </td>
      <td className={styles.tableData}>
        <p>{entry.feeder_username}</p>
      </td>
    </tr>
  );
}

export default LastFeedTemplate;
