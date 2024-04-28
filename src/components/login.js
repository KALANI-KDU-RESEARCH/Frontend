import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { headers } from "./helpers/helper";
const { REACT_APP_BASE_URL } = process.env;

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const result = await axios.post(
        `${REACT_APP_BASE_URL}/login`,
        {
          email,
          password,
        },
        { headers }
      );
      await Promise.allSettled([
        localStorage.setItem("token", result.data.token),
      ]);
      setLoader(false);
      navigate("/dash-board");
    } catch (error) {
      console.log("Error", error);
      alert(error.response.data.detail);
      setLoader(false);
    }
  };

  return (
    <section class="relative bg-[url('https://i.ibb.co/sg6sD4D/login.png')] h-dvh md:h-screen bg-no-repeat bg-cover  ">
      <div class="absolute inset-0  bg-black opacity-50"></div>
      <div class="container pt-40">
        <div class="w-full  rounded-lg shadow dark:border  sm:max-w-lg xl:p-0 mx-auto bg-gray-800 dark:border-gray-700 opacity-85 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Sign in to Your Account
            </h1>
            <form class="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-white"
                >
                  Your email
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
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-white"
                >
                  Password
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
              <button
                type="submit"
                class={`w-full ${
                  loader ? "cursor-not-allowed" : "cursor-pointer"
                } text-white bg-primary outline outline-offset-2 outline-1 outline-blue-500/50 hover:bg-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                disabled={loader}
              >
                Sign in
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to={"/register"}
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
