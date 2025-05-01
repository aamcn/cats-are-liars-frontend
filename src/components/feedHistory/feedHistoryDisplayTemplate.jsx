
function FeedHistoryDisplayTemplate({entry}){
    const date = entry.date
    const correctDate = date.split('T')
    const finalDate = correctDate[0].split('-').reverse().join('-')
  
    return(
        <tr>
            <td><p>{finalDate}</p></td>
            <td><p>{entry.cat_name}</p></td>
            <td><p>{entry.feeder_username}</p></td>
            <td><p>{entry.time}</p></td>
            <td><p>{entry.notes}</p></td>
            <td><p>{entry.medication_needed}</p></td>
        </tr>
    )
}

export default FeedHistoryDisplayTemplate;