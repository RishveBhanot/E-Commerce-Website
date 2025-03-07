import React from "react";
import { useNavigate } from "react-router-dom";


const ProductsCard = ({product, addToCart}) => {
  // console.log("📦 Product Data:", product);

    const navigate = useNavigate();

    const handleShowMore = () =>navigate(`/productInfo`, {state: {category :product }})
    // console.log("product",product)

  return (
    <div className="">
      <div
        className="w-[250px] h-[350px] rounded flex flex-col items-center my-10 pt-6 ml-6 mr-6 border-[1px] border-gray-400 hover:scale-110 transition-all"
      >
        <img className="w-[220px] h-[220px]" src={product.image} />
        <p className="text-[14px] text-center h-6  ">{product.title.slice(0,30)}</p>
        <button onClick={handleShowMore} className="text-[12px] hover:scale-110 transition-all hover:text-blue-800 mt-2 mb-[2px]">Show More</button>
        <p className="text-[14px] text-center h-6 text-blue-800" >${product.price}</p>
        <button onClick={() =>{
          console.log("🛒 Add to Cart Clicked. Product ID:", product.id);
          addToCart(product.id)}} className="border-[1px] transition-all border-yellow-600 pl-2 pr-2 pb-[2px] pt-[2px] rounded-3xl bg-yellow-500 hover:bg-gray-100 text-[12px]">Add to cart</button>
      </div>
    </div>
  );
};

export default ProductsCard;
