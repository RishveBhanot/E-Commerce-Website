import React, { useState } from "react";
import { Menu } from "lucide-react"; // Icon for the menu button

const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-center pt-4 pb-4 border-b-[1px] border-gray-400 bg-white shadow-2xl fixed top-[65px] right-0 left-0 z-10">
        {[
          "Women Ethnic",
          "Women Western",
          "Mens",
          "Kids",
          "Home & Kitchen",
          "Beauty & Health",
          "Jewellery & Accessories",
          "Bags & Footwear",
          "Electronics",
          "Sports & Fitness",
        ].map((item, index) => (
          <div
            key={index}
            className="text-[12px] text-gray-600 cursor-pointer hover:text-red-500 transition-all hover:scale-110 px-4"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex justify-between items-center bg-white px-4 py-3 fixed top-[65px] right-0 left-0 z-10 border-b border-gray-400">
        <span className="text-lg font-semibold">Menu</span>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu size={28} className="text-gray-600" />
        </button>
      </div>

      {/* Mobile Navbar (Vertical) */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-white fixed top-[110px] right-0 left-0 shadow-lg border-t border-gray-300 z-10">
          {[
            "Women Ethnic",
            "Women Western",
            "Mens",
            "Kids",
            "Home & Kitchen",
            "Beauty & Health",
            "Jewellery & Accessories",
            "Bags & Footwear",
            "Electronics",
            "Sports & Fitness",
          ].map((item, index) => (
            <div
              key={index}
              className="text-[14px] text-gray-600 cursor-pointer hover:bg-gray-100 py-3 px-6 border-b border-gray-200"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainNavbar;
