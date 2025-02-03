import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Cod = () => {
    const navigate = useNavigate();

    const [inputFields, setInputFields] = useState({
        name: '',
        address: "",
    })


    const handleInputChange =(e)=> {
        const{name, value} = e.target;
        setInputFields({
            ...inputFields,
            [name] : value,
        })
        console.log(inputFields)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const addressRegex = /^[a-zA-Z0-9\s,'-\/]*$/;

        if(inputFields.name === ""){
            alert('Please fill out your Name');
        } else if(inputFields.address === ""){
            alert("Please fill out your address")
        } else if(!addressRegex.test(inputFields.address)){
            alert("Please fill a valid Address")
        } else{
            alert("Form Submitted Successfully");
            navigate('/successPayment');
        }
    }

  return (
    <div className="mt-6 flex justify-center items-center h-screen">
    <div className="border-2 border-orange-500 w-[400px] flex flex-col justify-center items-center p-12">
    <h3 className='text-3xl border-b-2 border-orange-500 mt-6 p-2 font-semibold mb-8' ><span>*</span>Cash On <span className='text-orange-500'>Delivery</span><span>*</span></h3>
    
    <form  className='flex flex-col gap-6 mt-4'>
        <div  className='border-b-2 border-orange-500 '>
            
            <input onChange={handleInputChange} 
            value={inputFields.name}
            name='name'
            className='outline-none' type='text' placeholder='Your Name' required/>

        </div>
        <div className='border-b-2 border-orange-500'>
            
            <input onChange={handleInputChange} 
            value={inputFields.address}
            name='address' className='outline-none' type="text" placeholder='Your Address' required />
        
        </div>
    </form>
    <button onClick={handleSubmit} type='submit' className='text-orange-500 border-2 border-sky-300 p-2 rounded-3xl mt-6 hover:bg-orange-400 hover:text-white  transition-all hover:scale-110'>Submit</button>
    </div>
</div>
)
}

export default Cod