    import React, { useRef, useState } from "react";
    import { Link } from "react-router-dom";

    const Login = () => {
    const email = useRef();
    const password = useRef();
    const [message, setMessage] = useState(null);

    

    return (
        <div className="flex justify-center items-center h-screen">
        <div className=" border-black border-4 w-[400px] flex flex-col justify-center items-center  bg-teal-500">
            {/* TITLE LOGIN */}

            <h1 className=" mt-8 border-4 py-2 px-4 rounded-3xl text-white text-2xl font-semibold ">
            Login
            </h1>

            {/* EMAIL FIELD */}

            <form className="flex flex-col items-center gap-8 mt-8 mb-8">
            <input
                ref={email}
                className="rounded-2xl font-normal py-1 px-1 outline-none"
                type="email"
                placeholder="Your Email"
                name="email"
            />

            {/* PASSWORD FIELD */}

            <input
                ref={password}
                className="rounded-2xl font-normal py-1 px-1 outline-none"
                type="password"
                placeholder="Your Password"
                name="password"
            />

            {/* <p className="text-red-700 text-xl">{message}</p> */}

            {/* LOGIN BUTTON */}

            <button
                // onClick={loginData}
                className=" bg-white hover:bg-[#4c00b4] hover:text-white transition ease-in-out delay-150 border-black border-2 py-2 px-4 rounded-3xl text-black font-semibold"
            >
                Login
            </button>

            <button >
                {" "}
                <img
                width={150}
                src="src/components/web_light_rd_SI@3x.png"
                alt=""
                />{" "}
            </button>
            </form>

            {/* NOT HAVE A ACCOUNT */}

            <p className="text-cyan-200 font-normal mb-4">
            Not have a Account?{" "}
            <Link className="hover:font-bold" to="/signup">
                Signup Here
            </Link>
            </p>
        </div>
        </div>
    );
    };

    export default Login;
