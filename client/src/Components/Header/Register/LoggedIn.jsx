import React, { useEffect, useState} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/authSlice";

const LoggedIn = () => {
  // const [user, setUser] = useState(null);
  const user = useSelector((state) => state.auth.user)
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getUserData = async() =>{
    await axios
    .get("http://localhost:7001/api/loggedIn", { withCredentials: true })
    .then((response) => {
        console.log("response", response);
      dispatch(setUser(response.data));
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    
      setLoading(false);
    });
  }

  useEffect(() => {
    getUserData();
    //   console.log("my user", user)
  }, []);

  console.log("my user", user)

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 flex justify-center border-2 border-black mt-20 w-screen">
      {user ? (
        <div className="border p-6 rounded-md shadow-md mt-32">
          <h2 className="text-2xl font-bold">Welcome, {user.username}!</h2>
          <p className="mt-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Contact:</strong> {user.contact}
          </p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default LoggedIn;
