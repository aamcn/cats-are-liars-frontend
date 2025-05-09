import { Link } from "react-router";

function CatDisplayCardTemplate({ cat }) {
  const catName = cat.name;
  return (
    <tr>
      <td>
        <Link to={`/cat-view/${catName}`}>{catName}</Link>
      </td>
      <td>
        {cat.meals.map((meal) => {
          return <p>{meal}</p>;
        })}
      </td>
      <td>
        <p>{cat.medication}</p>
      </td>
    </tr>
  );
}

export default CatDisplayCardTemplate;
