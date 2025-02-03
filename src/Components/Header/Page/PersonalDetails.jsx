import React from 'react'
import { useNavigate } from 'react-router-dom'

const PersonalDetails = () => {
    const navigate = useNavigate();

const GoToSelectPaymentSection =() =>{
        navigate('/selectPaymentMethod');
}

  return (
    <div className="mt-6 flex justify-center items-center h-screen">
        <div className="border-2 border-orange-500 w-[400px] flex flex-col justify-center items-center p-4">
        <h3 className='text-2xl border-b-2 border-orange-500 mt-6 p-2 font-semibold' >Delivery Address</h3>
        
        <form className='flex flex-col gap-6 mt-4'>
            <div  className='border-b-2 border-orange-500 '>
                <input className='outline-none' type='text' placeholder='Your Name'/>
            </div>
            <div className='border-b-2 border-orange-500 '>
                <input className='outline-none' type="email" placeholder='Your Email' />
            </div>
            <div className='border-b-2 border-orange-500 '>
                <input className='outline-none' type="text" placeholder='Your Address' /> 
            </div>
            <div className='border-b-2 border-orange-500 '>
                <input className='outline-none' type="text" placeholder='Your State' />
            </div>
            <div className='border-b-2 border-orange-500'>
                <input className='outline-none' type="number" placeholder='Your City Pincode' />
            </div>
        </form>
        <div>
                <button onClick={GoToSelectPaymentSection} className='flex justify-center mt-6 border-2 px-4 py-2 rounded-2xl border-gray-400 font-semibold text-xl'>Next</button>
            </div>
        </div>
    </div>
  )
}

export default PersonalDetails