import React, { useEffect, useRef, useState } from "react";
import { Image, Menu, Select, Spin } from "antd";
import axios from "axios";
import GoogleTrends from "./helpers/GoogleTrends";
import { countries } from "./helpers/helper";
import { Hearts, InfinitySpin } from "react-loader-spinner";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useLocation, useNavigate } from "react-router";
import Header from "./Header";
import {
  BulbOutlined,
  DashboardFilled,
  DashboardOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import VideoSearch from "./VideoSearch";

const { REACT_APP_BASE_URL } = process.env;

const EDashBoard = ({ setIsDeleted }) => {
  const local = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(
    local?.interests.map((el) => ({ text: el, geo: "LK" }))
  );
  const [isLoading, setIsLoading] = useState(false);
  const predictions = useRef([]);
  const [dataPredicted, setDataPredicted] = useState([]);
  const [loading, setLoading] = useState(false);
  const [impressionRate, setImpressionRate] = useState(0);
  const [current, setCurrent] = useState("dashboard");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const geo = queryParams.get("geo");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (local.type === "Entrepreneur")
        await axios
          .post(`${REACT_APP_BASE_URL}/impressionRate/${local._id}`, {
            interests_count: local.interests?.length,
            age: local.age,
            experience: local.experience,
          })
          .then((res) => {
            setImpressionRate(res.data?.["impression-rate"]);
            localStorage.setItem(
              "impressionRate",
              res.data?.["impression-rate"]
            );
          });
      for await (const { text } of user) {
        setLoading(true);
        const result = await axios.post(`${REACT_APP_BASE_URL}/predict`, {
          name: `Request: "I'm seeking micro-entrepreneur business ideas tailored to ${text}. It is mandatory to include tables for given element."`,
        });
        predictions.current.push(result.data);
        setDataPredicted([...predictions.current]);
        setLoading(false);
      }
    })();
  }, []);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <Header setIsDeleted={setIsDeleted} />
      <div className="bg-[#F5F9CD] min-h-screen flex">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="vertical"
          className="w-64 text-white"
          defaultSelectedKeys={["dashboard"]}
        >
          <Menu.Item key="dashboard" className="text-lg">
            <DashboardOutlined /> Dashboard
          </Menu.Item>
          <Menu.Item key="trends" className="text-lg">
            <LineChartOutlined /> Trends Section
          </Menu.Item>
          <Menu.Item key="ideas" className="text-lg">
            <BulbOutlined /> Recommended Ideas
          </Menu.Item>
        </Menu>

        <div className="container p-10 flex-1">
          {current === "trends" && (
            <>
              <h5
                className="text-[#650D26] text-2xl font-semibold mt-10"
                style={{ fontFamily: "Montserrat Alternates" }}
              >
                Current Trends Related Your Interests 📈{" "}
                <Select
                  defaultValue="Select a Country"
                  value={
                    geo
                      ? countries.find((el) => el.value === geo)?.label
                      : "Select a Country"
                  }
                  className="w-40"
                  options={countries.map((el) => ({ ...el, value: el.label }))}
                  showSearch
                  onSelect={(e) => {
                    setIsLoading(true);
                    navigate(
                      "?geo=" + countries.find((el) => el.label === e)?.value
                    );
                    setUser((prevArray) =>
                      prevArray.map((obj) => ({
                        ...obj,
                        geo: countries.find((el) => el.label === e)?.value,
                      }))
                    );
                    setTimeout(() => {
                      setIsLoading(false);
                    }, 3000);
                  }}
                />
              </h5>

              {!isLoading ? (
                <div id="widget" className="flex gap-1 overflow-x-scroll mt-2">
                  {[...user].map((val) => (
                    <>
                      <GoogleTrends
                        type="TIMESERIES"
                        keyword={val.text}
                        url="https://ssl.gstatic.com/trends_nrtr/3700_RC01/embed_loader.js"
                        geo={val.geo}
                      />
                      <GoogleTrends
                        type="GEO_MAP"
                        keyword={val.text}
                        url="https://ssl.gstatic.com/trends_nrtr/3700_RC01/embed_loader.js"
                        geo={val.geo}
                      />
                    </>
                  ))}
                </div>
              ) : (
                <center>
                  <Spin />
                </center>
              )}
            </>
          )}

          {current === "ideas" && (
            <>
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
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {element}
                    </Markdown>
                    <div className="inline-flex items-center justify-center w-full mt-10">
                      <hr className="w-full h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                      <div className="absolute px-4 -translate-x-1/2 bg-[#F5F9CD] left-1/2 dark:bg-gray-900">
                        <svg
                          className="w-4 h-4 text-gray-700 dark:text-gray-300"
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
              <>
                {loading && (
                  <div className="flex justify-center">
                    <InfinitySpin
                      height="200"
                      width="200"
                      radius="9"
                      color="green"
                      ariaLabel="loading"
                      wrapperStyle
                      wrapperClass
                    />
                  </div>
                )}
              </>
            </>
          )}
          {current === "dashboard" && (
            <>
              <Image
                preview={false}
                src="https://i.ibb.co/jr4Grt6/cb947f9c-4b8f-420f-92a7-3b71d3d7e235.jpg"
              />
              <div className=" bg-black"></div>
              <div className="grid grid-cols-2 gap-x-5 gap-y-5 overflow-x-scroll mt-10">
                {user.map(({ text }) => (
                  <VideoSearch keyword={text} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EDashBoard;
