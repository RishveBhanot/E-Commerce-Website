import React, { useState } from "react";
import { useEffect } from "react";
import { productsApi } from "./ProductsApi.jsx";
import ProductsCard from "./ProductsCard.jsx";
import Error from "./Error.jsx";
import { useNavigate } from "react-router-dom";
import BodyNavbar from "../Body/BodyNavbar/BodyNavbar.jsx";

const MainBody = () => {
  const navigate=useNavigate();
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchedProducts = async () => { 
      try{
        const productsData = await productsApi();
        setProducts(productsData);
        setFilteredProducts(productsData)

      } catch(err) {
        console.error('Error shows:', err)
        setError(true)
      }
    }
    fetchedProducts();
  
  }, []);
  console.log('product', products)

  

  if(products==null){
    return <Error/>
  }

  const filterCategoryProducts = (category) => {
    if(category === "All"){
      setFilteredProducts(products)
    } else{
      const filtered = products.filter((product) => product.category === category );
      setFilteredProducts(filtered);
    }
  }
  

  return (
    <div className="mt-14 flex flex-col">
      <div className="text-center">
        <p className="text-4xl border-t-[1px] border-b-[1px] border-gray-400 p-6">
          Best <span className="text-orange-500 font-medium">Categories</span> to Choose from
        </p>
        <BodyNavbar onFilter= {filterCategoryProducts}/>
      </div>
      <div className="grid grid-cols-4 ">
        {filteredProducts &&
          filteredProducts.map((product, index) => (
            <ProductsCard key={index} product={product}/>
          ))}
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default MainBody;
