import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../../redux/cartSliceDb";
import { addToCartDb } from "../../../redux/cartSliceDb";

const CartPage = () => {
  const dispatch = useDispatch();

  // ✅ Get user and cart from Redux
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cartDb.cart);
  const userEmail = useSelector((state) => state.auth.user?.email);
  console.log(userEmail, "getting email from redux auth");
  const loading = useSelector((state) => state.cartDb.loading);
  const error = useSelector((state) => state.cartDb.error);

  //  Fetch cart when user is available
  useEffect(() => {
    if (user) {
      dispatch(fetchCart(userEmail));
    }
  }, [user, dispatch]);

  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please log in to add items to the cart.");
      return;
    }

    dispatch(addToCartDb({ email: user.email, product }));
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto mt-20 p-6 max-w-2xl">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Your <span className="text-orange-500">Shopping</span> Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col space-y-6 ">
          {cart.map((item, index) => (
            <div
              key={index}
              className="border-2 border-orange-500 bg-white shadow-lg rounded-xl p-5 border border-gray-200 flex items-center gap-4"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 rounded-md"
              />

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-700">
                  {item.title.length > 50
                    ? `${item.title.slice(0, 50)}...`
                    : item.title}
                </h3>
                <p className="text-blue-500 text-sm mt-1 font-medium">
                  ${item.price}
                </p>

                {/* Quantity & Buttons */}
                <div className="flex items-center justify-end space-x-4 mt-4">
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                    -
                  </button>
                  <span className="text-lg font-semibold text-gray-700">
                    {item.quantity}
                  </span>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* Total Price Section */}
          <div className="bg-gray-100 p-5 rounded-xl shadow-md mt-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Total Price: <span className="text-green-500">$</span>
            </h3>
          </div>

          {/* Checkout Button */}
          <button className="bg-green-500 text-white w-full py-3 text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
