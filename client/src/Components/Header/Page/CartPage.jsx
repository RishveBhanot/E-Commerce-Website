import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../../redux/cartSliceDb";
import { addToCartDb } from "../../../redux/cartSliceDb";

const CartPage = () => {
  const dispatch = useDispatch();

  // ✅ Get user and cart from Redux
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cartDb.cart);
  const userId = useSelector((state) => state.auth.user._id)
  console.log(userId,"uuuuuuuuuu");
  const loading = useSelector((state) => state.cartDb.loading);
  const error = useSelector((state) => state.cartDb.error);
  

  // ✅ Fetch cart when user is available
  useEffect(() => {
    if (user) {
      dispatch(fetchCart(userId));
    }
    
  }, [user, dispatch]);
  console.log("lllllllll", user._Id)

  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please log in to add items to the cart.");
      return;
    }

    dispatch(addToCartDb({ userId: user.userId, product }));
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-32">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.productId._id}>
              {item.title} - Quantity: {item.quantity}
              <button onClick={() => handleAddToCart(item.productId)}>+</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
