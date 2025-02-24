import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="mt-6 flex justify-center items-center h-screen">
      <div className="border-2 border-orange-500 w-[500px] flex flex-col justify-center items-center p-12">
        <h3 className="text-3xl border-b-2 border-orange-500 mt-6 p-2 font-semibold mb-8">
          Your Product has <span className="text-orange-500">Shipped</span>
        </h3>
        <div className="flex justify-around gap-6">
          <h3 className="text-6xl">🎉</h3>
          <p className="text-3xl font-semibold">
            <span className="text-orange-500">Thank</span>You!
          </p>
          <h3 className="text-6xl">🎉</h3>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
