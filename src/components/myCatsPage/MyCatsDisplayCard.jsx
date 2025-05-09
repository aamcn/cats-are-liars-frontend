import CatDisplayCardTemplate from "./CatDisplayCardTemplate";
import styles from "./css/myCatsDisplayCard.module.css";
function MyCatsDisplayCard({ cats }) {
  return (
    <div className={styles.cardsContainer}>
        
          {cats.map((cat) => {
            return <CatDisplayCardTemplate cat={cat} />;
          })}
    </div>
  );
}

export default MyCatsDisplayCard;
