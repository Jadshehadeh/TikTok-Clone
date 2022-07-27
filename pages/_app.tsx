import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { NEXT_PUBLIC_GOOGLE_API_TOKEN } from "../config";

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <div className=" overflow-hidden ">
        {router.route !== "/detail/[id]" && (
          <div className=" fixed w-full z-50 backdrop-blur-xl bg-white-30">
            <Navbar />
          </div>
        )}
        <div className="flex flex-row w-full xl:w-3/4  py-16 xl:px-10 z-30  mx-auto ">
          {router.route !== "/detail/[id]" && (
            <div className=" basis-1/4 xl:flex-1  ">
              <div className="fixed sm:left-0 md:left-auto h-full overflow-hidden xl:hover:overflow-scroll  ">
                <Sidebar />
              </div>
            </div>
          )}
            <div className="flex flex-col gap-10 overflow-auto mt-2 h-full videos flex-1 ">
              <Component {...pageProps} />
            </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
