import React, { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

import { Video } from "../types";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const VideoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (isPlaying) {
      VideoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      VideoRef?.current?.play();
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    if (VideoRef?.current) {
      VideoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">

      <div className="flex items-center gap-2">
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded-xl">
          <div className="md:w-16 md:h-16 h-10 w-10">
            <Link href={`/profile/${post.postedBy._id}`}>
              <div>
                <Image
                  alt="profile photo"
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  layout="responsive"
                />
              </div>
            </Link>
          </div>
        </div>
        <div>
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className="flex items-center gap-2">
              <p className="flex gap-2 items-center md:text-md font-bold text-primary cursor-pointer">
                {post.postedBy.userName}{" "}
                <GoVerified className="text-blue-400 text-md" />
              </p>
              <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                {post.postedBy.userName}
              </p>
            </div>
          </Link>
        </div>
      </div>
      <p className="pl-6 py-3 text-md font-semibold text-gray-600">{post.caption }</p>
      <div className=" flex gap-4 pr-5 ">
        <div
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          className="rounded-3xl overflow-hidden relative"
        >
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              ref={VideoRef}
              src={post.video.asset.url}
              className="flex max-w-md  rounded-3xl cursor-pointer bg-gray-100  "
            ></video>
          </Link>
          {isHover && (
            <div className="absolute bg-gradient-to-t from-black to-transparent bottom-0 h-1/4 cursor-pointer left-0  flex  justify-around w-full ">
              {isPlaying ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-white text-xl lg:text-4xl shadow-xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-white text-xl lg:text-4xl" />
                </button>
              )}
              {isVideoMuted ? (
                <button
                  onClick={() => {
                    setIsVideoMuted(false);
                  }}
                >
                  <HiVolumeOff className="text-white text-xl lg:text-4xl" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsVideoMuted(true);
                  }}
                >
                  <HiVolumeUp className="text-white text-xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default VideoCard;
