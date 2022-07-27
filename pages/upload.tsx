import React, { useState, useEffect } from "react";
import { SanityAssetDocument } from "@sanity/client";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router";
import axios from "axios";

import useAuthStore from "../store/authSotre";
import { client } from "../utils/client";
import { topics } from "./../utils/constants";
import { API } from "../config";

const Upload = () => {
  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const uploadVideo = async (e: any) => {
    setIsLoading(true);
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);
      const post = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, post);
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-2xl font-bold">Upload Video </p>
        <p className="text-md text-gray-400 mt-1">
          Post a video to your account
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center pr-6 gap-10">
        <div className="bg-white w-full md:w-1/2  rounded-lg mb-10">
          <div>
            <div className="flex flex-col justify-center items-center w-full h-full border-dashed rounded-xl border-4 border-gray-200  outline-none mt-10 p-5 cursor-pointer hover:border-[#F51997] hover:border-solid hover:bg-gray-100">
              {isLoading ? (
                <p>Uploading</p>
              ) : (
                <div>
                  {videoAsset ? (
                    <div className="w-[200px]">
                      <video
                        src={videoAsset.url}
                        loop
                        controls
                        className="rounded-xl bg-black"
                      ></video>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center ">
                        <div className="flex flex-col items-center justify-center ">
                          <p className="font-bold text-xl">
                            <FaCloudUploadAlt className="text-gray-300 text-6xl " />
                          </p>
                          <p className="text-xl font-semibold">Upload Video</p>
                        </div>
                        <p className="text-gray-400 mt-10 text-sm leading-7 text-center">
                          MP4 or Webm or ogg <br />
                          Up to 10 minutes <br />
                          720p or higher <br />
                          Less than 2GB
                        </p>
                        <p className="text-center mt-10 rounded-xl text-white text-md font-medium p-2 w-full  bg-[#F51997]  hover:shadow-lg hover:shadow-[#F51997]">
                          {" "}
                          Select file
                        </p>
                      </div>
                      <input
                        type="file"
                        name="upload-video"
                        className="w-0 h-0"
                        onChange={uploadVideo}
                      />
                    </label>
                  )}
                </div>
              )}
              {wrongFileType && (
                <p className="text-center text-xl text-red font-semibold mt-4 w-[250px]">
                  Please upload only video{" "}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full items-center md:w-1/2 gap-5 ">
          <div className="flex flex-col gap-2 p-2  w-full h-full    ">
            <label className="text-md font-medium">caption</label>
            <input
              className="rounded-xl text md border-2 border-gray-200 p-2 outline-none focus:border-[#F51997]"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <label className="text-md font-medium">Choose a Category</label>
            <select
              className="outline-none border-2 rounded-xl capitalize bg-white text-gray-700 text-md p-2  focus:border-[#F51997]"
              name=""
              id=""
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {topics.map((topic, index) => (
                <option key={index} value={topic.name}>
                  {topic.name}
                </option>
              ))}
            </select>
            <div className="flex gap-6 mt-10">
              <button
                type="button"
                className="border-gray-300 border-2 text-md font-medium rounded-xl p-2 w-1/2 outline-none hover:shadow-md"
                onClick={() => {}}
              >
                Discrad
              </button>
              <button
                type="button"
                className="text-md font-medium text-white rounded-xl p-2 w-1/2 outline-none bg-[#F51997]  hover:shadow-md hover:shadow-[#F51997]"
                onClick={handlePost}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
