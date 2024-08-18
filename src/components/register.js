import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { headers } from "./helpers/helper";
import { notification } from "antd";
import {
  HeartOutlined,
  KeyOutlined,
  MailOutlined,
  ProfileOutlined,
  ReconciliationOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
const { REACT_APP_BASE_URL } = process.env;

const Register = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [rePassword, setRePassword] = useState(null);
  const [age, setAge] = useState(null);
  const [experience, setExperience] = useState(null);
  const [interests, setInterests] = useState("");
  const [type, setType] = useState("Entrepreneur");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      if (password !== rePassword) {
        notification.info({
          message: "Passwords did not match",
          placement: "topRight",
        });
        setLoader(false);
        return;
      }

      await axios.post(
        `${REACT_APP_BASE_URL}/register`,
        {
          email,
          password,
          age,
          experience,
          interests: interests.split(",").map((val) => val.trim()),
          type,
        },
        { headers }
      );
      notification.info({
        message: "Registration Successfull",
        placement: "topRight",
      });
      setEmail("");
      setPassword("");
      setRePassword("");
      setAge(null);
      setExperience(null);
      setInterests("");
      setType("Entrepreneur");
      setLoader(false);
      navigate("/");
    } catch (error) {
      console.log("Error", error);
      notification.error({
        message: error.response.data.detail,
        placement: "topRight",
      });
      setLoader(false);
    }
  };

  return (
    <section class="relative bg-[url('https://i.ibb.co/jr4Grt6/cb947f9c-4b8f-420f-92a7-3b71d3d7e235.jpg')] h-dvh md:h-screen bg-no-repeat bg-cover  ">
      <div class="absolute inset-0  bg-black opacity-50"></div>
      <div class="container py-20 pb-12">
        <div class="w-full  rounded-lg shadow dark:border  sm:max-w-lg xl:p-0 mx-auto bg-gray-800 dark:border-gray-700 opacity-85 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div class=" items-center ">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                class=" h-6 sm:h-9 mx-auto"
                alt="Flowbite Logo"
              /><br/>
              <p class="self-center md:text-xl text-[9px] font-semibold whitespace-nowrap text-white " style={{ fontFamily: "Montserrat Alternates" }}>
                Micro Entrepreneur Management System
              </p>
            </div>
            <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Create Your Account
            </h1>
            <form class="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-white"
                >
                  <MailOutlined /> Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    <KeyOutlined /> Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="confirmPassword"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    <KeyOutlined /> Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setRePassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div>
                  <label
                    for="age"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    <ProfileOutlined /> Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setAge(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label
                    for="experience"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    <HeartOutlined /> Experience
                  </label>
                  <input
                    type="number"
                    name="experience"
                    id="experience"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setExperience(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div>
                  <label
                    for="interest"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    <ReconciliationOutlined /> Interests
                  </label>
                  <input
                    type="text"
                    name="interest"
                    id="interest"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="Enter ',' separated Interests"
                  />
                </div>
                <div>
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    <UserSwitchOutlined /> User Type
                  </label>
                  <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setType(e.target.value)}
                    defaultValue={"Entrepreneur"}
                  >
                    <option value={"Entrepreneur"}>Entrepreneur</option>
                    <option value={"Invester"}>Investor</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                class={`w-full ${
                  loader ? "cursor-not-allowed" : "cursor-pointer"
                }  text-white bg-primary outline outline-offset-2 outline-1 outline-blue-500/50 hover:bg-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                disabled={loader}
              >
                Sign up
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to={"/"}
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
