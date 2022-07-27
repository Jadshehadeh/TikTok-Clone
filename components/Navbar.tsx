import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import Logo from "../utils/tiktik-logo.png";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authSotre";
import { IUser } from "../types";

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchValue) {
      Router.push(`/search/${searchValue}`);
    }
  };
  return (
    <>
      <div className="w-full flex justify-between items-center  xl:w-[1200px] m-auto py-2 px-4">
        <Link href="/">
          <div className="w-[100px]  md:w-[130px]">
            <Image
              src={Logo}
              className="cursor-pointer"
              alt="TOkTOk"
              layout="responsive"
            />
          </div>
        </Link>
        <div className="relative hidden md:block">
          <form
            onSubmit={handleSearch}
            className="absolute md:static top-10 -left-20 bg-transparant"
          >
            <input
              type="text"
              value={searchValue}
              onChange={(e) => {setSearchValue( e.target.value)}}
              placeholder="Search..."
              className="flex bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-80 rounded-2xl md:top-0 "
            />
            <button onClick={handleSearch} className=" absolute md:right-5 right-6 top-4 border-l-2 broder-gray-300 pl-4 text-2xl text-gray-400">
              <BiSearch />
            </button>
          </form>
        </div>
        <div>
          {userProfile ? (
            <div className="flex gap-3 md:gap-8">
              <Link href="/upload">
                <button className="flex items-center gap-2 border-2 py-1 px-5 md:px-4 text-md font-semibold rounded-xl">
                  <IoMdAdd className="text-xl text-[#F51997]" />{" "}
                  <span className="hidden md:block">Upload</span>
                </button>
              </Link>
              {userProfile.image && (
                <Link href={`/profile/${userProfile._id}`}>
                  <div className="flex self-center">
                    <Image
                      alt="profile photo"
                      width={40}
                      height={40}
                      className="rounded-full cursor-pointer"
                      src={userProfile.image}
                    />
                  </div>
                </Link>
              )}
              <button
                className="mr-1"
                type="button"
                onClick={() => {
                  googleLogout();
                  removeUser();
                }}
              >
                {" "}
                <AiOutlineLogout color="red" fontSize={21} />
              </button>
            </div>
          ) : (
            <GoogleLogin
              onSuccess={(response) => {
                createOrGetUser(response, addUser);
              }}
              onError={() => {
                console.log("error");
              }}
            />
          )}
        </div>
      </div>
      <div className="border-gray-200 border-b-2 " />
    </>
  );
};

export default Navbar;
