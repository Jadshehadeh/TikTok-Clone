import React from "react";
import Link from "next/link";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { topics } from "../utils/constants";

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle =
    "xl:border-2 hover:bg-primary xl:border-[#F51997] p-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]";
  const topicStyle =
    "xl:border-2 hover:bg-primary xl:border-gray-300 p-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";
    const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";
  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
     
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">For you</span>
              </div>
            </Link>
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>

      <div className="flex gap-5 md:gap-2 my-1 flex-wrap justify-center">
        {topics.map((item, index) => (
          <Link href={`/?topic=${item.name}`} key={index}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className="font-bold text-xl xl:text-md">{item.icon}</span>
              <span className="font-medium text-md hidden xl:block capitalize">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
