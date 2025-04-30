
function FeedHistoryDisplayTemplate({entry}){

    return(
        <div>
            <p>{entry.date}</p>
            <p>{entry.time}</p>
            <p>{entry.cat_name}</p>
            <p>{entry.feeder_username}</p>
            <p>{entry.notes}</p>
        </div>
    )
}

export default FeedHistoryDisplayTemplate;