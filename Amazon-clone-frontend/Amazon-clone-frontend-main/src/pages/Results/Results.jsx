import React, { useEffect, useState } from "react";
import classes from "./Results.module.css";
import LayOut from "./../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "./../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

const Results = () => {
  const { categoryName } = useParams();
  const [loading, setLoading] = useState(true); //initial state
  const [results, setResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${productUrl}/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category /{categoryName}</p>
        <hr/>
        {loading ? (
          <Loader />
        ) : (
          <div className={classes.products_container}>
            {results.map((product) => (
              <ProductCard
                key={product.id}
                renderAdd={true}
                renderDesc={false}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
};

export default Results;
