
function FeedHistoryDisplayTemplate({entry}){
    const date = entry.date
    const correctDate = date.split('T')
    const finalDate = correctDate[0].split('-').reverse().join('-')
   
    return(
        <div>
            <p>{finalDate}</p>
            <p>{entry.time}</p>
            <p>{entry.cat_name}</p>
            <p>{entry.feeder_username}</p>
            <p>{entry.notes}</p>
        </div>
    )
}

export default FeedHistoryDisplayTemplate;