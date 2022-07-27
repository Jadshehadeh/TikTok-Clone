import type { NextPage } from "next";
import axios from "axios";
import { Video } from "../types";
import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import { API } from "../config";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex justify-center flex-col h-full">
      {videos.length ? (
        videos.map((video: Video, ) => <VideoCard post={video} key={video._id} /> )
      ) : (
          <div className="h-[80vh] my-auto ">
            <NoResults text={"No Videos"} icon={false} />
            </div>
      )}
    </div>
  );
};
export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null;
  if (!topic) {
    response = await axios.get(`${API}/api/post`);
  } else {
    response = await axios.get(`${API}/api/discover/${topic}`);
  }

  return {
    props: {
      videos: response.data,
    },
  };
};
export default Home;
