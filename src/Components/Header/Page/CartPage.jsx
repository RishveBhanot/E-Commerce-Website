import React from 'react'
<<<<<<< HEAD

const CartPage = () => {
  return (
    <div>CartPage</div>
=======
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, deleteItem } from '../../../redux/cartSlice';

const CartPage = ({ product }) => {

  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch();


  const calculateTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <div className='p-8'>

      <h1 className='text-3xl font-semibold text-center mb-8'>Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your Cart is Empty</p>
      ) :
        (
          <div className="flex flex-col items-center">
            {cart.map(item => (

              <div key={item.id} 
              className="flex justify-between items-center w-[800px] border p-4 rounded-lg shadow-md mb-4">
                <img className='w-32 h-32' src={item.image} alt="" />
                <p className='text-lg' >{item.title.slice(0,14)}...</p>
                <p>${item.price}</p>
                <div className="flex items-center gap-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={()=> dispatch(addToCart(item))}>+</button>
                  <span>{item.quantity}</span>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => dispatch(removeFromCart(item))}>-</button>
                </div>
                <button className='bg-gray-400 p-2 rounded' onClick={() => dispatch(deleteItem(item))}>Delete</button>
              </div>
            ))}

          <p className="text-lg font-medium mt-4">
            Total Price: <span className="text-blue-600">${calculateTotalPrice()}</span>
            </p>
          </div>
        )}

    </div>
>>>>>>> 770f52f (third commit)
  )
}

export default CartPage