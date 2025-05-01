import UserCatsDisplayTemplate from "./CatDisplayTemplate";


function UsersCatsDisplay({ cats }) {

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Meals</th>
                    <th>Meds</th>
                </tr>
                </thead>
                <tbody>
                {cats.map(cat => {
                    return <UserCatsDisplayTemplate cat={cat} />
                })}
                </tbody>
            </table>

        </div>
    )
}

export default UsersCatsDisplay;