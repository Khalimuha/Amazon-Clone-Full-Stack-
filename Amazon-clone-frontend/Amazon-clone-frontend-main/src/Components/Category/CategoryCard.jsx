import classes from "./Category.module.css";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  console.log(data);
  return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h3>{data?.title}</h3>
        </span>
        <img src={data?.imgLink} alt="Product image" />
        <p> Shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
