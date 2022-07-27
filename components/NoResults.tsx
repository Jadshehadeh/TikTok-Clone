import React from "react";
import { NextPage } from "next";
import { BiCommentX } from "react-icons/bi";
import { MdOutlineVideocamOff } from "react-icons/md";

interface IProps {
  text: string;
  icon: boolean
}

const NoResults: NextPage<IProps> = ({ text,icon }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-6xl">
        {icon ? <MdOutlineVideocamOff /> : <BiCommentX/>}
      </p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  );
};

export default NoResults;
