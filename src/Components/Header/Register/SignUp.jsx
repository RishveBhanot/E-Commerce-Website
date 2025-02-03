    import React, { useState } from "react";

    import { ToastContainer, toast, Bounce } from "react-toastify";
    import { Link } from "react-router-dom";
    // import { AiFillEye } from "react-icons/ai";
    // import { AiFillEyeInvisible } from "react-icons/ai";

    const SignUp = () => {
    const [open, setOpen] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false);
    const [message, setMessage] = useState(null)
    const [formValues, setFormValues] = useState({
        username: "",
        email: "",
        contact: "",
        password: "",
        confirmpassword: "",
    });

    //It is used for eye toggle in password 

    const toggle = () => {
        setOpen(!open)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);

        setIsDisabled(false);
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
        

        setFormValues({
            username: "",
            email: "",
            contact: "",
            password: "",
            confirmpassword: "",
        });
        setIsDisabled(true);

        
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
        <div className=" border-black border-4 w-[400px] flex flex-col justify-center items-center bg-teal-500">
            {/* TITLE */}

            <h1 className=" mt-8 border-4 py-2 px-4 rounded-3xl text-white text-2xl font-semibold ">
            Signup
            </h1>

            {/* FORM */}

            <form className="flex flex-col items-center gap-8 mt-8 mb-8 relative">
            {/* NAME FIELD */}

            <input
                className="rounded-2xl font-normal py-1 px-1 outline-none"
                type="text"
                placeholder="Your Name"
                name="username"
                maxLength={30}
                value={formValues.username}
                onChange={handleChange}
            />

            {/* EMAIL FIELD */}

            <input
                className="rounded-2xl font-normal py-1 px-1 outline-none"
                type="email"
                placeholder="Your Email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                // onChange={}
            />

            {/* CONTACT FIELD */}

            <input
                className="rounded-2xl font-normal py-1 px-1 outline-none"
                type="tel"
                placeholder="Your Contact"
                name="contact"
                maxLength={12}
                value={formValues.contact}
                onChange={handleChange}
            />

            {/* PASSWORD FIELD */}

            <input
                className="rounded-2xl font-normal py-1 px-1 outline-none"
                type={(open === false ? 'password': 'text')}
                placeholder="Your Password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
            />
            {/* <div className="text-xl absolute top-[196px] right-4">
                {
                (open === false) ?  <AiFillEye onClick={toggle}/> :  <AiFillEyeInvisible onClick={toggle}/>
                }
            <AiFillEye onClick={toggle}/>
            <AiFillEyeInvisible onClick={toggle}/>
            </div> */}
            

            {/* CONFIRM PASSWORD FIELD */}

            <input
                className="rounded-2xl font-normal py-1 px-1 outline-none"
                type="password"
                placeholder="Confirm Password"
                name="confirmpassword"
                value={formValues.confirmpassword}
                onChange={handleChange}
            />
            <p className="text-red-700 text-xl">{message}</p>

            {/* SUBMIT/REGISTER FIELD */}

            <button
                name="register"
                className={` bg-white ${
                !isDisabled
                    ? " hover:bg-[#4c00b4] hover:text-white transition ease-in-out delay-150"
                    : "cursor-not-allowed opacity-50"
                } border-black border-2 py-2 px-4 rounded-3xl text-black font-semibold`}
                onClick={handleSubmit}
            >
                Register
            </button>
            </form>

            {/* ALREADY ACCOUNT THING */}

            <p className="text-cyan-200 font-normal mb-4">
            Already have a Account?{" "}
            <Link className="hover:font-bold" to="/login">
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
