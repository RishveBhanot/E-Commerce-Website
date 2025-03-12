import React, { useState } from "react";
import { useEffect } from "react";
import { productsApi } from "./ProductsApi.jsx";
import ProductsCard from "./ProductsCard.jsx";
import Error from "./Error.jsx";
import { useNavigate } from "react-router-dom";
import BodyNavbar from "../Body/BodyNavbar/BodyNavbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addToCartDb } from "../../redux/cartSliceDb.js";

const MainBody = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user?._id); // ✅ Fix userId reference

  console.log("🆔 Fetched userId from Redux:", userId);

  const [filteredProducts, setFilteredProducts] = useState(products);

  if (products == null) {
    return <Error />;
  }

  const filterCategoryProducts = (category) => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = (product) => {
    console.log("🛒 Adding to Cart: ", product);
    
    if (!userId) {
      console.error("❌ Cannot add to cart: userId is undefined");
      navigate("/login"); // Redirect if user is not logged in
      return;
    }

    dispatch(addToCartDb({ userId, product }));
  };

  return (
    <div className="mt-14 flex flex-col">
      <div className="text-center">
        <p className="text-4xl border-t-[1px] border-b-[1px] border-gray-400 p-6">
          Best <span className="text-orange-500 font-medium">Categories</span> to Choose from
        </p>
        <BodyNavbar onFilter={filterCategoryProducts} />
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredProducts &&
          filteredProducts.map((product, index) => (
            <ProductsCard 
              key={index} 
              product={product} 
              userId={userId} 
              addToCart={handleAddToCart} 
            />
          ))}
      </div>
    </div>
  );
};




export default MainBody;
