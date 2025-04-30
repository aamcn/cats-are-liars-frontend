
function UserCatsDisplayTemplate({cat}){

    return(
        <>
           <p>{cat.name}</p>
           <p>{cat.meals}</p>
           <p>{cat.medication}</p>
        </>
    )
}

export default UserCatsDisplayTemplate;