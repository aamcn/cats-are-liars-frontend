import UserCatsDisplayTemplate from "./CatDisplayTemplate";


function UsersCatsDisplay({ cats }){
   
    return(
        <div> 
            {cats.map(cat => {
                return  <UserCatsDisplayTemplate cat={cat} />
            })}
        </div>
    )
}

export default UsersCatsDisplay;