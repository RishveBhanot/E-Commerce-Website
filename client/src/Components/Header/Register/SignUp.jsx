import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    contact: "",
    password: "",
    confirmpassword: "",
  });

  const navigate = useNavigate();

  //It is used for eye toggle in password

  const toggle = () => {
    setOpen(!open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z\s]*$/;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const contactRegex = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    if (formValues.username === "") {
      toast.error("Name is Required");
    } else if (!nameRegex.test(formValues.username)) {
      toast.error("Name is Invalid");
    } else if (formValues.email === "") {
      toast.error("Email is Required");
    } else if (!emailRegex.test(formValues.email)) {
      toast.error("Email format is Invalid");
    } else if (formValues.contact === "") {
      toast.error("Contact is Required");
    } else if (!contactRegex.test(formValues.contact)) {
      toast.error("Contact format is Invalid");
    } else if (formValues.password === "") {
      toast.error("Password is Required");
    } else if (!passwordRegex.test(formValues.password)) {
      toast.error("Password is Invalid");
    } else if (formValues.confirmpassword === "") {
      toast.error("Confirm Password is Required");
    } else if (formValues.password !== formValues.confirmpassword) {
      toast.error("Password not Matched");
    } else {
      axios.post("http://localhost:7001/api/signup", formValues, {
        withCredentials: true
    })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
    

      setFormValues({
        username: "",
        email: "",
        contact: "",
        password: "",
        confirmpassword: "",
      });

      setIsDisabled(true);

      toast.success("Registered Successfully");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" border-black border-4 w-[400px] flex flex-col justify-center items-center ">
        {/* TITLE */}

        <h1 className=" mt-8 border-2 py-2 px-4 rounded-3xl text-black text-2xl font-semibold">
          Signup
        </h1>

        {/* FORM */}

        <form
          onSubmit={handleSubmit} action="/signup" method="post"
          className="flex flex-col items-center gap-8 mt-8 mb-8 relative"
        >
          {/* NAME FIELD */}

          <input
            className=" rounded-2xl font-normal py-1 px-1 outline-none border-b-2 border-orange-500"
            type="text"
            placeholder="Your Name"
            name="username"
            maxLength={30}
            value={formValues.username}
            onChange={(e) =>
              setFormValues({ ...formValues, [e.target.name]: e.target.value })
            }
          />

          {/* EMAIL FIELD */}

          <input
            className="rounded-2xl font-normal py-1 px-1 outline-none border-b-2 border-orange-500"
            type="email"
            placeholder="Your Email"
            name="email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, [e.target.name]: e.target.value })
            }
            // onChange={}
          />

          {/* CONTACT FIELD */}

          <input
            className="rounded-2xl font-normal py-1 px-1 outline-none border-b-2 border-orange-500"
            type="tel"
            placeholder="Your Contact"
            name="contact"
            maxLength={12}
            value={formValues.contact}
            onChange={(e) =>
              setFormValues({ ...formValues, [e.target.name]: e.target.value })
            }
          />

          {/* PASSWORD FIELD */}

          <input
            className="rounded-2xl font-normal py-1 px-1 outline-none border-b-2 border-orange-500"
            type={open === false ? "password" : "text"}
            placeholder="Your Password"
            name="password"
            value={formValues.password}
            onChange={(e) =>
              setFormValues({ ...formValues, [e.target.name]: e.target.value })
            }
          />
          <div className="text-xl absolute top-[196px] right-4">
            {open === false ? (
              <AiFillEye onClick={toggle} />
            ) : (
              <AiFillEyeInvisible onClick={toggle} />
            )}
            {/* <AiFillEye onClick={toggle}/>
          <AiFillEyeInvisible onClick={toggle}/> */}
          </div>

          {/* CONFIRM PASSWORD FIELD */}

          <input
            className="rounded-2xl font-normal py-1 px-1 outline-none border-b-2 border-orange-500"
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            value={formValues.confirmpassword}
            onChange={(e) =>
              setFormValues({ ...formValues, [e.target.name]: e.target.value })
            }
          />

          {/* SUBMIT/REGISTER FIELD */}

          <button
            name="register"
            className={` bg-white ${
              !isDisabled
                ? " hover:bg-[#4c00b4] hover:text-white transition ease-in-out delay-150"
                : "cursor-not-allowed opacity-50"
            } border-black border-2 py-2 px-4 rounded-3xl text-black font-semibold`}
          >
            Register
          </button>
        </form>

        {/* ALREADY ACCOUNT THING */}

        <p className="font-normal mb-4">
          Already have a Account?{" "}
          <Link className="hover:font-bold text-orange-600" to="/login">
            Login Here
          </Link>
        </p>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default SignUp;
