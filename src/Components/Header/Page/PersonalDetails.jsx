import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const PersonalDetails = () => {
    const navigate = useNavigate();

    const [inputFields, setInputFields] = useState({
        username: "",
        email: "",
        address: "",
        state: "",
        pinCode: "",
    })


    const handleInputChange = (e) => {
        const{name, value} = e.target;
        setInputFields({
            ...inputFields,
            [name] : value,
        })
        console.log(inputFields)
    }
    
    const handleSubmit = (e) =>{

        e.preventDefault();

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(inputFields.username === ""){
            toast.error("Please fill out your name");
        } else if(inputFields.email === ""){
            toast.error('Please fill out your email');
        } else if(!emailRegex.test(inputFields.email)){
            toast.error("Please enter valid Email");
        } else if(inputFields.address === ""){
            toast.error('Please fill out your address');
        } else if(inputFields.state === ""){
            toast.error('Please fill out your State');
        } else if(inputFields.pinCode === ""){
            toast.error("Please fill out your Pin Code");
        } else{
            toast.success("Successfully Submitted");
            setTimeout(() => {
                navigate('/selectPaymentMethod');
            }, 3000);
        
        }
    }



  return (
    <div className="mt-6 flex justify-center items-center h-screen">
        <div className="border-2 border-orange-500 w-[400px] flex flex-col justify-center items-center p-4">
        <h3 className='text-2xl border-b-2 border-orange-500 mt-6 p-2 font-semibold' >Delivery Address</h3>
        
        <form className='flex flex-col gap-6 mt-4'>
            <div  className='border-b-2 border-orange-500 '>
                <input className='outline-none' 
                type='text' 
                placeholder='Your Name'
                name='username'
                value={inputFields.username}
                onChange={handleInputChange}
                required
                />
                
            </div>
            <div className='border-b-2 border-orange-500 '>
                <input className='outline-none' 
                type="email"
                placeholder='Your Email' 
                name='email'
                value={inputFields.email}
                onChange={handleInputChange}
                required
                />
                
            </div>
            <div className='border-b-2 border-orange-500 '>
                <input className='outline-none' 
                type="text" 
                placeholder='Your Address' 
                name='address'
                value={inputFields.address}
                onChange={handleInputChange}
                required
                /> 
                
            </div>
            <div className='border-b-2 border-orange-500 '>
                <input className='outline-none' 
                type="text" 
                placeholder='Your State'
                name='state' 
                value={inputFields.state}
                onChange={handleInputChange}
                required
                />
                
            </div>
            <div className='border-b-2 border-orange-500'>
                <input className='outline-none' 
                type="number" 
                placeholder='Your City Pincode' 
                name='pinCode'
                value={inputFields.pinCode}
                onChange={handleInputChange}
                required
                />
                
            </div>
        </form>
        <div>
                <button onClick={handleSubmit} className='flex justify-center mt-6 border-2 px-4 py-2 rounded-2xl border-gray-400 font-semibold text-xl'>Next</button>
            </div>
        </div>
    </div>
  )
}

export default PersonalDetails