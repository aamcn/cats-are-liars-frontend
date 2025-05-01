import { Link } from "react-router";

function UserCatsDisplayTemplate({cat}){

    const catName = cat.name
    return(
        <>
           <Link to={`/cat-view/${catName}`}>{catName}</Link>
           <p>{cat.meals}</p>
           <p>{cat.medication}</p>
        </>
    )
}

export default UserCatsDisplayTemplate;