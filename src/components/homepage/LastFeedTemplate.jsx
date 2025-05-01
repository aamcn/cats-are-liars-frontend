import { Link } from "react-router"

function LastFeedTemplate({ entry }) {

    const splitDate = entry.date.split('T')
    const formattedDate = splitDate[0].split('-').reverse().join('-')
    const catName = entry.cat_name
    return (

        <tr>
            <td><p>{formattedDate}</p></td>
            <td>
                <p>{entry.time}</p>
            </td>
            <td>
                <Link to={`/cat-view/${catName}`}>{catName}</Link>
            </td>
            <td>
                <p>{entry.feeder_username}</p>
            </td>
            <td>
                <p>{entry.medication_needed ? 'Yes' : 'No'}</p>
            </td>
            <td>
                <p>{entry.medication_needed ? 'Yes' : 'No'}</p>
            </td>
            <td>
                <p>{entry.notes}</p>
            </td>
        </tr>
    )
}

export default LastFeedTemplate