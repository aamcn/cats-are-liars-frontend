import { Link } from "react-router";
import styles from "./css/catDisplayCardTemplate.module.css"
function CatDisplayCardTemplate({ cat }) {
  const catName = cat.name;
  return (

    <div className={styles.displayCardContainer}>

      <div className={styles.cardHeader}>
        <img className={styles.catCardPhoto} src={null} alt="Cat Photo" />
        <h2 className={styles.catName}>{cat.name}</h2>
      </div>

      
      
      <div className={styles.catDetailsContainer}>
        <h3 className={styles.catDetailsTitle}>Meals:</h3>
        <ul className={styles.catDetailsList}>
          {cat.meals.map(item => {
            return <li>{item}</li>
          })}
        </ul>
        <h3 className={styles.catDetailsTitle}>Meds:</h3>
        <ul className={styles.catDetailsList}>
          {cat.medication.map(item => {
            return <li>{item}</li>
          })}
        </ul> 
        <h3>Feeders:</h3>
                  <ul>
                   <li>Tony</li>
                  </ul>
        </div>
    </div>
   
  );
}

export default CatDisplayCardTemplate;
