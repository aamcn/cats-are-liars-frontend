import CatDisplayCardTemplate from "./CatDisplayCardTemplate";
import "./myCatsDisplayCard.scss";
function MyCatsDisplayCard({ cats }) {
  return (
    <div className="catCardsContainer">
      {cats.map((cat) => {
        return <CatDisplayCardTemplate cat={cat} />;
      })}
    </div>
  );
}

export default MyCatsDisplayCard;
