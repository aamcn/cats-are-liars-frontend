import UserCatsDisplayTemplate from "./CatDisplayTemplate";
import styles from "./css/userCatsDisplay.module.css"
function UsersCatsDisplay({ cats }) {
  return (
    <div className={styles.userCatsTable}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Meals</th>
            <th>Meds</th>
          </tr>
        </thead>
        <tbody>
          {cats.map((cat) => {
            return <UserCatsDisplayTemplate cat={cat} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UsersCatsDisplay;
