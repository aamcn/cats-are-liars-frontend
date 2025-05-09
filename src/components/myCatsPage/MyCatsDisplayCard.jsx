import CatDisplayCardTemplate from "./CatDisplayCardTemplate";
import styles from "./css/MyCatsDisplayCard.module.css";
function MyCatsDisplayCard({ cats }) {
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
            return <CatDisplayCardTemplate cat={cat} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MyCatsDisplayCard;
