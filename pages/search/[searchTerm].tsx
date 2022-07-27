import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import useAuthStore from "../../store/authSotre";
import { IUser, Video } from "../../types";
import { API } from "../../config";

interface IProps {
  videos: Video[];
}
const Search = ({ videos }: IProps) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const accounts = isAccounts ? "text-[#F51997]" : "text-gray-400";
  const isVideos = !isAccounts ? "text-[#F51997]" : "text-gray-400";
 

  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //   useEffect(() => {
  //     if (showUserVideos) {
  //       setVideosList(userVideos);
  //     } else {
  //       setVideosList(userLikedVideos);
  //     }
  //   }, [showUserVideos, userLikedVideos, userVideos]);
  return (
    <div className="w-full ">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer  ${accounts}`}
          onClick={() => setIsAccounts(!isAccounts)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer  ${isVideos}`}
          onClick={() => setIsAccounts(!isAccounts)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, index: number) => (
              <div className="p-2 cursor-pointer items-center my-2 hover:bg-gray-100 rounded-lg flex-1 mx-5" key={index}>
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
              </div>
            ))
          ) : (
            <NoResults icon={false} text={`No match for "${searchTerm}"`} />
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-5  flex-1">
          {videos.length > 0 ? (
            videos.map((video: Video, index: number) => (
              <VideoCard key={index} post={video} />
            ))
          ) : (
            <NoResults icon text={`No match for "${searchTerm}"`} />
          )}
        </div>
      )}
    </div>
  );
};
export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${searchTerm}`);
  return {
    props: { videos: res.data },
  };
};
export default Search;
