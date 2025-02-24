import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import User_icon from "../../assets/user.png";
import Trolley_icon from "../../assets/trolley.png";
import Phone_icon from "../../assets/phone.png";
import Search_icon from "../../assets/searchsymbol.png";
import { Link, useNavigate } from "react-router-dom";
import { productsApi } from "../Body/ProductsApi";
import SignUp from "./Register/SignUp";
import Login from "./Register/Login";

const Navbar = ({products}) => {
  // console.log(products)

  const [inputValue, setInputValue] = useState('');
  const navigate=useNavigate();
  

  const searchButton = () =>{
    const inputText = inputValue.toLowerCase();
  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(inputText))
  navigate('./searchItem', {state: {category :filteredProducts }})
  setInputValue('');
  }

  const backToHomePage = () => {
    navigate('/')
  }

  const cartPage = () => {
    navigate('/cartPage')
  }



  return (
    <div className="flex justify-evenly  border-b-[1px] border-gray-400 bg-white pb-2 fixed top-0 left-0 right-0 z-10">
      <div className="">
        <img onClick={backToHomePage} className="w-16 h-14" src={Logo} />
      </div>
      <div className="flex justify-center mt-2">
        
        <img onClick={searchButton}
          className="w-8 h-[32px] rounded border-[1px] border-gray-400 p-2"
          src={Search_icon}
        /> 
        <input onChange={(e) => setInputValue(e.target.value)}
          className="w-60 h-8 border-[1px] border-gray-400 rounded outline-none placeholder: pl-10 placeholder: text-[14px]"
          type="text"
          placeholder="Search & Try Products"
        />
      </div>
      <div className="">
        <ul className="flex justify-center items-center gap-6 mr-6 ml-8 sm:text-[12px] text-gray-600">
          <li className="flex items-center border-r-2 border-gray-400 pr-6  cursor-pointer hover:text-red-500 transition-all hover:scale-110  ">
            <img className="w-6 h-6" src={Phone_icon} alt="" />
            Download App
          </li>

          <li className="border-r-2 border-gray-400 pr-6 pt-[4px] cursor-pointer hover:text-red-500 transition-all hover:scale-110 ">
            Become a Supplier
          </li>

          <li className="border-r-2 border-gray-400 pr-6 pt-[4px] cursor-pointer hover:text-red-500 transition-all hover:scale-110 ">
            Newsroom
          </li>
          <Link to={"/signup"}>
          <li className="flex flex-col ml-6 cursor-pointer hover:text-red-500">
          
            Login/SignUp
          </li>
          </Link>

          <li onClick={cartPage} className="ml-6 cursor-pointer hover:text-red-500">
            <img className="w-6 h-6 ml-[2px]" src={Trolley_icon} alt="" />
            Cart
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
