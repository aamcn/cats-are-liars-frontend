import styles from "../css/catTabTemplate.module.css";
import { Link } from "react-router";
function CatTabTemplate({ cat }) {
  return (
    <div className={styles.catTabCard}>
      <img className={styles.catProfilePhoto} src={null} alt="Cat Photo"></img>
      <Link className={styles.catNameLink} to={`/cat-view/${cat.name}`}>{cat.name}</Link>
    </div>
  );
}

export default CatTabTemplate;
