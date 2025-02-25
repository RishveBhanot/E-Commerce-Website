import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    if (formValues.email === "") {
      toast.error("Email is Required");
    } else if (!emailRegex.test(formValues.email)) {
      toast.error("Email format is Invalid");
    } else if (formValues.password === "") {
      toast.error("Password is Required");
    } else if (!passwordRegex.test(formValues.password)) {
      toast.error("Password is Invalid");
    } else {
      axios.post('http://localhost:3001/api/login',formValues)
      .then(result => console.log(result))
      .catch(err => console.log(err))
      
    }
    
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" border-black border-4 w-[400px] flex flex-col justify-center items-center  ">
        {/* TITLE LOGIN */}

        <h1 className=" mt-8 border-2 py-2 px-4 rounded-3xl text-black text-2xl font-semibold ">
          Login
        </h1>

        {/* EMAIL FIELD */}

        <form className="flex flex-col items-center gap-8 mt-8 mb-8">
          <input
            className="rounded-2xl font-normal py-1 px-1 outline-none border-b-2 border-orange-500"
            type="email"
            placeholder="Your Email"
            name="email"
            onChange={handleChange}
            value={formValues.email}
          />

          {/* PASSWORD FIELD */}

          <input
            className="rounded-2xl font-normal py-1 px-1 outline-none border-b-2 border-orange-500"
            type="password"
            placeholder="Your Password"
            name="password"
            onChange={handleChange}
            value={formValues.password}
          />

        </form>
        <button
            onClick={handleSubmitLogin}
            className=" bg-white hover:bg-[#4c00b4] hover:text-white transition ease-in-out delay-150 border-black border-2 py-2 px-4 rounded-3xl text-black font-semibold"
          >
            Login
          </button>
          <p className="mb-6">Not have a Account? <Link to='/signup'><span className="text-orange-500 border-b-2 border-orange-500 p-[2px]">SignUp</span></Link> Here</p>
      </div>
    </div>
  );
};

export default Login;
