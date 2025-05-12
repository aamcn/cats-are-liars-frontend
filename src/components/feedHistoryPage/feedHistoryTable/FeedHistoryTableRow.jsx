function FeedHistoryTableRow({ entry }) {
  const correctDate = entry.date.split("T");
  const formattedDate = correctDate[0].split("-").reverse().join("/");

  return (
    <tr>
      <td>
        <p>{formattedDate}</p>
      </td>
      <td>
        <p>{entry.cat_name}</p>
      </td>
      <td>
        <p>{entry.feeder_username}</p>
      </td>
      <td>
        <p>{entry.time}</p>
      </td>
      <td>
        <p>{entry.medication_needed ? "Yes" : "No"}</p>
      </td>
      <td>
        <p>{entry.medication_given ? "Yes" : "No"}</p>
      </td>
      <td>
        <p>{entry.notes}</p>
      </td>
    </tr>
  );
}

export default FeedHistoryTableRow;
