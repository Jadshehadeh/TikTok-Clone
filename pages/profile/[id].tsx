import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { API } from "../../config";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const { user, userVideos, userLikedVideos } = data;

  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videosList, setVideosList] = useState<Video[]>([]);

  const videos = showUserVideos ? "text-[#F51997]" : "text-gray-400";
  const liked = !showUserVideos ? "text-[#F51997]" : "text-gray-400";

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [showUserVideos, userLikedVideos, userVideos]);

  return (
    <div>
      <div className="flex mt-3 gap-5 items-center">
        <div className="w-16 h-16 md:w-20 md:h-20">
          <Image
            src={user.image}
            width={100}
            height={100}
            className="rounded-full"
            alt="user profile"
            layout="responsive"
          />
        </div>
        <div className="">
          <p className="flex gap-1 items-center text-md font-bold text-primary lowercase md:text-2xl tracking-wider">
            {user.userName.replaceAll(" ", "")}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize md:text-xl text-gray-400 text-xs">
            {user.userName}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer  ${videos}`}
            onClick={() => setShowUserVideos(!showUserVideos)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer  ${liked}`}
            onClick={() => setShowUserVideos(!showUserVideos)}
          >
            Liked
          </p>
        </div>
        <div className="flex flex-col gap-5  flex-1">
          {videosList.length > 0
            ? videosList.map((video: Video, index: number) => (
                <VideoCard key={index} post={video} />
              ))
            : <NoResults icon text={`No ${showUserVideos ? "" : "Liked"} Videos Yet.`}/>}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`);
  return {
    props: { data: res.data },
  };
};

export default Profile;
