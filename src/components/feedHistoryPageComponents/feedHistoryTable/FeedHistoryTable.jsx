import "./feedHistoryTable.scss";
import FeedHistoryTableRow from "./FeedHistoryTableRow";
function FeedHistoryTable({ feedHistoryData }) {
  return (
    <div className="tableContainer">
      <table className="feedHistoryTable">
        <thead className="columnTitleRow">
          <tr>
            <th className="columnTitle">Date</th>
            <th className="columnTitle">Cat</th>
            <th className="columnTitle">Fed By</th>
            <th className="columnTitle">Time</th>
            <th className="columnTitle">Meds Given</th>
            <th className="columnTitle">Notes</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          <tr>
            <td className="gapMan" colSpan="6"></td>
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
