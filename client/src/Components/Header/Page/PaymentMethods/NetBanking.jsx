    import React, { useState } from "react";
    import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

    const NetBanking = () => {
    const navigate = useNavigate();

    const [inputFields, setInputFields] = useState({
        name: "",
        accountNumber: "",
        ifscCode: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if(name=== "accountNumber" && value.length > 19){
            return;
        }
        
        setInputFields({
        ...inputFields,
        [name]: value,
        });
        console.log(inputFields);
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if(inputFields.name === ""){
            toast.error('Please fill out your name');
        } else if(inputFields.accountNumber === ""){
            toast.error("Please fill out your account Number");
        } else if(inputFields.ifscCode === ""){
            toast.error("Please fill out your IFSC Code");
        } else {
            toast.success("Successfully Submitted");
            setTimeout(() => {
                navigate('/successPayment');
            }, 3000);
        }
    };



    return (
        <div className="mt-6 flex justify-center items-center h-screen">
        <div className="border-2 border-orange-500 w-[400px] flex flex-col justify-center items-center p-12">
            <h3 className="text-3xl border-b-2 border-orange-500 mt-6 p-2 font-semibold mb-8">
            <span>*</span>Net <span className="text-orange-500">Banking</span>
            <span>*</span>
            </h3>

            <form className="flex flex-col gap-6 mt-4">
            <div
                className="
            border-b-2 border-orange-500 "
            >
                <input
                className="outline-none"
                type="text"
                placeholder="Your Name"
                name="name"
                onChange={handleInputChange}
                required
                />
            </div>
            <div className="border-b-2 border-orange-500">
                <input
                className="outline-none"
                type="number"
                placeholder="Your Account Number"
                name="accountNumber"
                value={inputFields.accountNumber}
                onChange={handleInputChange}
                maxLength='19'
                required
                />
            </div>
            <div className="border-b-2 border-orange-500">
                <input
                className="outline-none"
                type="text"
                placeholder="IFSC Code"
                name="ifscCode"
                onChange={handleInputChange}
                required
                />
            </div>
            </form>
            <button
            onClick={handleSubmit}
            className="text-orange-500 border-2 border-sky-300 p-2 rounded-3xl mt-6 hover:bg-orange-400 hover:text-white  transition-all hover:scale-110"
            >
            Submit
            </button>
        </div>
        </div>
    );
    };

    export default NetBanking;
