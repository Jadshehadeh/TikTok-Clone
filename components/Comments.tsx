import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import useAuthStore from "./../store/authSotre";
import NoResults from "./NoResults";
import { IUser } from "../types";

interface IProps {
  comment: string;
  comments: IComment[];
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  isPostingComment: boolean;
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: {
    _ref: string;
    _id: string;
  };
}
const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();
  return (
    <div >
    <div className='border-t-2 border-gray-200 pt-4 pl-5 mt-4  border-b-2 lg:pb-0 pb-[100px] bg-gray-100'>
      <div className='overflow-y-scroll scroll-smooth lg:h-[500px] '>
        {comments?.length ? (
          comments.map((items, index) => (
            <>
              {allUsers.map(
                (user: IUser) =>
                  (user._id === items.postedBy._id || items.postedBy._ref) && (
                    <div className="p-2 items-center border-b-2 my-2" key={index}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3 ">
                          <div className="w-8 h-8">
                            <Image
                              src={user.image}
                              width={43}
                              height={43}
                              className="rounded-full"
                              alt="user profile"
                              layout="responsive"
                            />
                          </div>
                          <div className="flex items-center gap-2  ">
                            <p className="flex gap-1 items-center tracking-wider text-md font-bold text-primary lowercase">
                              {user.userName.replaceAll(" ", "")}
                              <GoVerified className="text-blue-400" />
                            </p>
                            
                          </div>
                        </div>
                      </Link>
                      <div className="my-2  ">
                        <p className="">{ items.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text=" No comments yet." icon />
        )}
      </div>
      
      </div>
      <div className=" flex-1 justify-center">
      {userProfile && (
        <form onSubmit={addComment} >
        <div className="flex items-center
        gap-2 my-8 md:mt-8 md:px-10 ">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add Comment..."
              className=" bg-primary px-6  py-2 text-md font-medium border-2 focus:outline-none focus:border-2 focus:border-[#F51997] focus:bg-white flex-1 rounded-lg"
            />
            <button
              onClick={addComment}
              className="  text-center  rounded-xl text-white text-md font-medium p-2  bg-[#F51997]  hover:shadow-lg hover: "
            >
              {" "}
              {isPostingComment ? "Commenting" : "Comment "}
              </button>
        </div>
          </form>
        )}
        </div>
      </div>
  );
};

export default Comments;
