function FeedHistoryTableRow({ entry }) {

  const extractedDate = entry.date.split("T");
  const dateArray = extractedDate[0].split("-")
  const formattedDate = (dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0].slice(2,4))
  
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
        <p>{entry.medication_given ? "Yes" : "No"}</p>
      </td>
      <td>
        <p>{entry.notes}</p>
      </td>
    </tr>
  );
}

export default FeedHistoryTableRow;
