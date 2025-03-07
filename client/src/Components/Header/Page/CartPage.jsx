import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCartDb } from "../../../redux/cartSliceDb";

const CartPage = () => {
  console.log("CartPage component mounted!"); // ✅ Ensure component is loading

  const cart = useSelector(state => {
    console.log("Redux state:", state); // ✅ Ensure Redux store is connected
    return state.cartDb.cart || [];
  });

  const [productsDetails, setProductsDetails] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProductData = async () => {
    try {
      console.log("Attempting API Call..."); // ✅ Log before API call
      const response = await fetch("http://localhost:7001/api/cart", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data); // ✅ Log API response
      setProductsDetails(data);
    } catch (error) {
      console.error("API Error:", error); // ✅ Log errors
    }
  };

  useEffect(() => {
    getProductData();
  }, []); // ✅ Run only once on mount

  const navigateToShipping = () => {
    navigate("/personalDetails");
  };

  const calculateTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your Cart is Empty</p>
      ) : (
        <div className="flex flex-col items-center">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-[800px] border p-4 rounded-lg shadow-xl mb-4"
            >
              <img className="w-32 h-32" src={item.image} alt="" />
              <p className="text-lg">{item.title.slice(0, 14)}...</p>
              <p>${item.price}</p>
              <div className="flex items-center gap-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => dispatch(addToCartDb(item))}
                >
                  +
                </button>
                <p>{item.quantity} </p>
                <button className="bg-red-500 text-white px-2 py-1 rounded">
                  -
                </button>
              </div>
              <button className="bg-gray-400 p-2 rounded">Delete</button>
            </div>
          ))}
          <div className="flex gap-6">
            <p className="text-lg font-medium mt-4">
              Total Price:{" "}
              <span className="text-blue-600">${calculateTotalPrice()}</span>
            </p>
            <button
              onClick={navigateToShipping}
              className="bg-2 bg-orange-500 p-2 rounded-3xl"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
