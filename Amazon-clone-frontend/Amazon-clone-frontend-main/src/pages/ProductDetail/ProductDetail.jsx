

import React, { useEffect, useState } from "react";
import LayOut from "./../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

const ProductDetail = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  

  useEffect(() => {
    setLoading(true); 
    axios
      .get(`${productUrl}/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch product.");
        setLoading(false); 
      });
  }, [productId]);

  return (
    <LayOut>
      {loading ? (
        <Loader />
      ) : ( <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
      
    </LayOut>
  );
};


export default ProductDetail;



