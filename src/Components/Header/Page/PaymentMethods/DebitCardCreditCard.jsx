import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const DebitCardCreditCard = () => {

    const [inputFields, setInputFields] = useState({
        cardNumber: "",
        cardHolder: "",
        expirationDate: "",
        cvv:"",
    })

    const handleInputChange = (e) => {
        const {name , value} = e.target;

        if(name === "cardNumber" && value.length > 19){
            return;
        }

        if(name === "cvv" && value.length > 3){
            return;
        }
        
        if(name === "cardHolder"){
            const cardHolderRegex = /^[a-zA-Z\s]*$/;

            if(!cardHolderRegex.test(value)){
                return;
            }
        }
        setInputFields({
            ...inputFields,
            [name] : value,
        })
    }

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(inputFields.cardNumber === ""){
            toast.error("Please fill out your card number");
        }else if(inputFields.cardHolder === ""){
            toast.error("Please fill out your Card Holder Name");
        } else if(inputFields.expirationDate === ""){
            toast.error("PLease fill Expiry Date");
        } else if(inputFields.cvv === ""){
            toast.error("Please enter your CVV");
        }else{
            toast.success("Submitted Successfully");
            setTimeout(() => {
                navigate('/successPayment');
            }, 3000);
        }
    }

return (
    <div className="mt-6 flex justify-center items-center h-screen">
    <div className="border-2 border-orange-500 w-[500px] flex flex-col justify-center items-center p-12">
    <h3 className='text-3xl border-b-2 border-orange-500 mt-6 p-2 font-semibold mb-8' ><span>*</span><span className='text-orange-500'>Debit</span> Card<span className='text-orange-500'>/ Credit</span> Card<span>*</span></h3>
    
    <form className='flex flex-col gap-6 mt-4'>
        <div  className='border-b-2 border-orange-500 '>
            <input className='outline-none' 
            type='number' 
            name='cardNumber'
            placeholder='Card Number'
            value={inputFields.cardNumber}
            onChange={handleInputChange}
            required/>
        </div>
        <div className='border-b-2 border-orange-500'>
            <input className='outline-none' 
            type="text" 
            name='cardHolder'
            placeholder='Cardholder Name' 
            value={inputFields.cardHolder}
            onChange={handleInputChange}
            required />
        </div>
        <div className='border-b-2 border-orange-500'>
            <input className='outline-none' 
            type="date" 
            name='expirationDate'
            placeholder='Expiration Date' 
            value={inputFields.expirationDate}
            onChange={handleInputChange}
            required />
        </div>
        <div className='border-b-2 border-orange-500'>
            <input className='outline-none' 
            type="number" 
            name='cvv'
            placeholder='CVV'
            value={inputFields.cvv}
            onChange={handleInputChange}
            required />
        </div>
    </form>
        <button onClick={handleSubmit} className='text-orange-500 border-2 border-sky-300 p-2 rounded-3xl mt-6 hover:bg-orange-400 hover:text-white transition-all hover:scale-110'>Submit</button>
    </div>
</div>
)
}

export default DebitCardCreditCard