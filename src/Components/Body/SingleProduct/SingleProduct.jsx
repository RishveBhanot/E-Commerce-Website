import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CrossMark from './x-mark.png'

const SingleProduct = () => {

  const navigate = useNavigate();

    const location=useLocation();
    const {category}= location;
    // console.log(location)

    const backToHome = () => {
      navigate('/')
    }

  return (
    <div className='w-[100%] flex justify-center mt-40 '>
    <div className='flex border-2 border-blue-600 h-[500px] rounded w-[80%] relative pb-6 '>
        <img className='w-[300px] h-34 ml-12 mt-8' src={location.state.category.image} />

        <div className='flex flex-col ml-20 mt-8'>
        <img onClick={backToHome} className='w-8 absolute right-2 top-2 cursor-pointer' src={CrossMark} alt="" />
        <p className='w-[90%] text-[20px] font-medium border-b-2 border-gray-400 h-20 '>{location.state.category.title}</p>
        <p className='w-[90%] text-[14px] mt-6 border-b-2 border-gray-400 h-[180px]'>{location.state.category.description}</p>

        <div className='w-[90%] mt-6 text-xl flex items-center flex-col'>
        <p className='w-[28%] text-center border-[1px] border-yellow-400 '>Rating: {location.state.category.rating.rate}/5</p>
        <p className=' w-[30%] text-center text-blue-600 mt-2 '>Viewers: {location.state.category.rating.count}</p>
        </div>

        <button className='border-[1px] transition-all border-yellow-600 absolute bottom-2 right-64 p-2 rounded-2xl bg-yellow-500 hover:bg-gray-100'>Add To Cart</button>
        </div>        
    </div>
    </div>
  )
}

export default SingleProduct