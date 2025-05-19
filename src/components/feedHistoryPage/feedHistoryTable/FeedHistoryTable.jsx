import styles from "../css/feedHistoryTable.module.css";
import FeedHistoryTableRow from "./FeedHistoryTableRow";
function FeedHistoryTable({ feedHistoryData }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.feedHistoryTable}>
        <thead className={styles.columnTitleRow}>
          <tr >
            <th className={styles.columnTitle}>Date</th>
            <th className={styles.columnTitle}>Cat</th>
            <th className={styles.columnTitle}>Fed By</th>
            <th className={styles.columnTitle}>Time</th>
            <th className={styles.columnTitle}>Meds Given</th>
            <th className={styles.columnTitle}>Notes</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          <tr>
            <td className={styles.gapMan} colSpan='6'></td>
          </tr>
          {feedHistoryData &&
            feedHistoryData.map((entry) => {
              return <FeedHistoryTableRow entry={entry} />;
            })}
        </tbody>
      </table>
    </div>
  );
}

export default FeedHistoryTable;
