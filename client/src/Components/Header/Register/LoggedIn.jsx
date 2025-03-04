import React, { useEffect, useState } from "react";
import axios from "axios";

const LoggedIn = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async() =>{
    await axios
    .get("http://localhost:7001/api/loggedIn", { withCredentials: true })
    .then((response) => {
        console.log("response", response);
      setUser(response.data);
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

  const handleLogoutUser = async() => {
    await axios.get("http://localhost:7001/api/logout", { withCredentials: true})
    .then((response) => {
        console.log(response.data);
        setUser(null);
    })
    .catch(err => {

        console.log("SOmething went wrong", err)
    }
    )
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      {user ? (
        <div className="border p-6 rounded-md shadow-md mt-32">
          <h2 className="text-2xl font-bold">Welcome, {user.username}!</h2>
          <p className="mt-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Contact:</strong> {user.contact}
          </p>
          <button onClick={handleLogoutUser} className="p-2 rounded border-2 border-black">Logged Out</button>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default LoggedIn;
