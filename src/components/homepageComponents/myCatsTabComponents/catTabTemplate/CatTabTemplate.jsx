import "./catTabTemplate.scss";
import { Link } from "react-router";
function CatTabTemplate({ cat }) {
  return (
    <div className="catTabCard">
      <img className="catTabProfilePhoto" src={null} alt="Cat Photo"></img>
      <Link className="catTabNameLink" to={`/cat-view/${cat.name}`}>
        {cat.name}
      </Link>
    </div>
  );
}

export default CatTabTemplate;
