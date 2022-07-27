import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import GoogleLogin from "react-google-login";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div>
      {/* <div
        className="flex justify-center  cursor-pointer xl:hidden m-2  mt-3 text-xl"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div> */}
      {showSidebar && (
        <div className="flex flex-col justify-between h-full items-center w-20 p-3 mb-10 border-r-2 border-gray-100 xl:w-400 xl:border-0">
          
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
