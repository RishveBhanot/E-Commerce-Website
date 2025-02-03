import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectPaymentMethod = () => {

const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
const navigate = useNavigate();

const handlePaymentMethod = (e) => {
  setSelectedPaymentMethod(e.target.value)

}
  const handleSubmit = (e) => {
    e.preventDefault();
    if(selectedPaymentMethod === "Net Banking"){
      navigate('/netBanking')
    }
    if(selectedPaymentMethod === "COD"){
      navigate('/cod');
    }
    if(selectedPaymentMethod === "Debit Card / Credit Card"){
      navigate('/debitCardCreditCard')
    }

  }

  return (
    <div className="flex justify-center items-center h-screen">
        <div className=" border-orange-500 border-2 w-[400px] flex flex-col justify-center items-center p-8">
      <h1 className="text-2xl">
        <span>*</span>
        Select <span className="text-orange-500">Payment</span> Method
        <span>*</span>
      </h1>
      <form onSubmit={handleSubmit} className="flex justify-center flex-col gap-6 mt-4">
        <label>
          <input 
          type="radio" 
          name="PaymentMethod"
          value="Net Banking"
          checked={selectedPaymentMethod === "Net Banking"}
          onChange={handlePaymentMethod}
          />
          Net Banking
        </label>

        <label>
          <input
          type="radio" 
          name="PaymentMethod"
          value="COD"
          checked={selectedPaymentMethod === "COD"}
          onChange={handlePaymentMethod}
          />
          COD
        </label>

        <label>
          <input 
          type="radio" 
          name="PaymentMethod"
          value="Debit Card / Credit Card"
          checked={selectedPaymentMethod === "Debit Card / Credit Card"}
          onChange={handlePaymentMethod}
          />
          Debit Card/Credit Card
        </label>
        <button className="text-orange-500 border-2 border-sky-300 p-2 rounded-3xl mt-6 hover:bg-orange-400 hover:text-white  transition-all hover:scale-110 w-44" type="submit">Proceed</button>
      </form>
    </div>
    </div>
  );
};

export default SelectPaymentMethod;
