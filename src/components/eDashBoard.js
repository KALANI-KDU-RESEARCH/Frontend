import React, { useEffect, useRef, useState } from "react";
import GoogleTrends from "./helpers/GoogleTrends";
import Header from "./Header";
import axios from "axios";
import { headers } from "./helpers/helper";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Audio, Hearts, InfinitySpin } from "react-loader-spinner";
const { REACT_APP_BASE_URL } = process.env;

const EDashBoard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const predictions = useRef([]);
  const [dataPredicted, setDataPredicted] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      for await (const element of user.interests) {
        setLoading(true);
        const result = await axios.post(
          `${REACT_APP_BASE_URL}/predict`,
          {
            name: `Request: "I'm seeking micro-entrepreneur business ideas tailored to ${element}. It is mandatory to include tables for given element."

            Suggested Optimization:
            
            Understanding ${element}: Provide a brief overview of ${element}, its significance, and its relevance to micro-enterprises.
            Micro-Entrepreneur Business Ideas: Present a range of innovative business ideas relevant to ${element}, each accompanied by a detailed description, including potential target markets, revenue streams, startup costs, and scalability.
            Visual Aids: Incorporate tables where necessary to illustrate concepts such as market analysis, cost breakdowns, or revenue projections, enhancing clarity and comprehension.`,
          },
          { headers }
        );
        predictions.current.push(result.data);
        setDataPredicted([...predictions.current]);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="bg-[#F5F9CD]">
      <Header />
      <div className="container">
        <h5
          className="text-[#650D26] text-2xl font-semibold mt-10"
          style={{ fontFamily: "Montserrat Alternates" }}
        >
          Current Trends Related Your Interests 📈
        </h5>
        <div id="widget" className="grid md:grid-cols-2 gap-10 ">
          {user.interests.map((val) => (
            <>
              <GoogleTrends
                type="TIMESERIES"
                keyword={val}
                url="https://ssl.gstatic.com/trends_nrtr/2051_RC11/embed_loader.js"
              />
              <GoogleTrends
                type="GEO_MAP"
                keyword={val}
                url="https://ssl.gstatic.com/trends_nrtr/2051_RC11/embed_loader.js"
              />
            </>
          ))}
        </div>
        <h5
          className="text-[#650D26] text-2xl font-semibold mt-10"
          style={{ fontFamily: "Montserrat Alternates" }}
        >
          Recommended Ideas💡
        </h5>
        {loading && (
          <div className="  flex justify-center">
            <span
              className=" mt-7"
              style={{ fontFamily: "Montserrat Alternates" }}
            >
              Still Generating &nbsp;&nbsp;
            </span>
            <Hearts width="50" color="red" />
          </div>
        )}
        <div className="">
          {[...dataPredicted].map((element) => (
            <div
              className="my-10"
              style={{ fontFamily: "Montserrat Alternates" }}
            >
              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {element}
              </Markdown>
              <div class="inline-flex items-center justify-center w-full mt-10">
                <hr class="w-full h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                <div class="absolute px-4 -translate-x-1/2 bg-[#F5F9CD] left-1/2 dark:bg-gray-900">
                  <svg
                    class="w-4 h-4 text-gray-700 dark:text-gray-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 14"
                  >
                    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="">
          {loading && (
            <InfinitySpin
              height="200"
              width="200"
              radius="9"
              color="green"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EDashBoard;
