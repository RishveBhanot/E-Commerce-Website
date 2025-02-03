import React from 'react'
import { useNavigate } from 'react-router-dom';

const NetBanking = () => {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/successPayment');
        
    }
  return (
    <div className="mt-6 flex justify-center items-center h-screen">
    <div className="border-2 border-orange-500 w-[400px] flex flex-col justify-center items-center p-12">
    <h3 className='text-3xl border-b-2 border-orange-500 mt-6 p-2 font-semibold mb-8' ><span>*</span>Net <span className='text-orange-500'>Banking</span><span>*</span></h3>
    
    <form className='flex flex-col gap-6 mt-4'>
        <div  className='border-b-2 border-orange-500 '>
            <input className='outline-none' type='text' placeholder='Your Name'/>
        </div>
        <div className='border-b-2 border-orange-500'>
            <input className='outline-none' type="number" placeholder='Your Account Number' />
        </div>
        <div className='border-b-2 border-orange-500'>
            <input className='outline-none' type="text" placeholder='IFSC Code' />
        </div>
    </form>
    <button onClick={handleSubmit} className='text-orange-500 border-2 border-sky-300 p-2 rounded-3xl mt-6 hover:bg-orange-400 hover:text-white  transition-all hover:scale-110'>Submit</button>
    </div>
</div>
  )
}

export default NetBanking