import styles from "../css/feedHistoryTable.module.css"


function FeedHistoryTableRow({ entry }) {

  const extractedDate = entry.date.split("T");
  const dateArray = extractedDate[0].split("-")
  const formattedDate = (dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0].slice(2,4))
  
  return (
    <tr>
      <td className={styles.tableDataContainer}>
        <p>{formattedDate}</p>
      </td>
      <td className={styles.tableDataContainer}>
        <p>{entry.cat_name}</p>
      </td >
      <td className={styles.tableDataContainer}>
        <p>{entry.feeder_username}</p>
      </td>
      <td className={styles.tableDataContainer} >
        <p>{entry.time}</p>
      </td>
      <td className={styles.tableDataContainer} >
        <p>{entry.medication_given ? "Yes" : "No"}</p>
      </td>
      <td  className={styles.tableDataContainer}>
        <p>{entry.notes}</p>
      </td>
    </tr>
  );
}

export default FeedHistoryTableRow;
