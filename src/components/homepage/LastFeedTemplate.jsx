
function LastFeedTemplate({entry}){

    return(
        <div>
             <p key={entry.id}>{entry.cat_name}{entry.date}</p>

        </div>
    )
}

export default LastFeedTemplate