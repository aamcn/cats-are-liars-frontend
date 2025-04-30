

function UsersCatsDisplay({ cats }){
    return(
        <div>
            {cats.map(cat => {
                return <p>{cat.name}</p>
            })}
        </div>
    )
}

export default UsersCatsDisplay;