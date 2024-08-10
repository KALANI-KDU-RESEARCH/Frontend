import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  SettingFilled,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Modal, Popover, notification } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { headers } from "./helpers/helper";
const { REACT_APP_BASE_URL } = process.env;

const Header = ({ setIsDeleted }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openChatsModal, setOpenChatsModal] = useState(false);
  const [openInterestsModal, setOpenInterestsModal] = useState(false);
  const [isChangedFields, setIsChangedFields] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [interests, setInterests] = useState({ ...user }.interests);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`${REACT_APP_BASE_URL}/chat/${user._id}`, {
        headers,
      });
      setIsDeleted(true);
      notification.success({
        message: "Chat Threads Deleted Successfully",
        placement: "topRight",
      });
      setOpenChatsModal(false);
    } catch (error) {
      notification.error({
        message: error.response.data.detail,
        placement: "topRight",
      });
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `${REACT_APP_BASE_URL}/profile/${user._id}`,
        {
          interests: interests.split(",").map((val) => val.trim()),
        },
        { headers }
      );
      notification.info({
        message: "Interests Update Successfull",
        placement: "topRight",
      });
      localStorage.clear();
      navigate("/");
    } catch (error) {
      notification.error({
        message: error.response.data.detail,
        placement: "topRight",
      });
    }
  };
  return (
    <header>
      <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to={"/dash-board"}>
            <div class="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                class="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span class="self-center md:text-xl text-[9px] font-semibold whitespace-nowrap dark:text-white">
                Micro Entrepreneur Management System
              </span>
            </div>
          </Link>
          <div class="flex items-center lg:order-2">
            <a
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
              class="cursor-pointer text-gray-800 focus:ring-4 font-medium rounded-lg md:text-sm text-[8px] px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-primary outline outline-offset-2 outline-1 outline-blue-500/50 hover:bg-blue-500/50"
            >
              Log out
            </a>
            {/* <a href="#" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Get started</a> */}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                class="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:text-gray-700 md:p-0 md:hover:text-blue-700"
                  aria-current="page"
                >
                  News
                </a>
              </li>
              <li>
                <Link
                  to={"/dash-board/create-post"}
                  class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Create a Post
                </Link>
              </li>
              <li>
                <Link
                  to={"/dash-board/my-posts"}
                  class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  My Posts
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Knowledge Repository
                </a>
              </li>
              <li>
                <a class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                  <Popover
                    content={
                      <>
                        <p>
                          <Button
                            className=" bg-green-500 text-white w-full"
                            onClick={() => {
                              hide();
                              setOpenInterestsModal(true);
                            }}
                          >
                            <EditOutlined /> Update My Interests
                          </Button>
                        </p>
                        <p className=" mt-1 ">
                          <Button
                            className=" bg-red-500 text-white w-full"
                            onClick={() => {
                              hide();
                              setOpenChatsModal(true);
                            }}
                          >
                            <DeleteOutlined /> Delete Chats
                          </Button>
                        </p>
                      </>
                    }
                    title="My Account Settings"
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                  >
                    <Button
                      type="primary"
                      className="bg-black grid content-center"
                    >
                      <SettingFilled className=" text-white " />
                    </Button>
                  </Popover>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Modal
          title={"DELETE MY CHATS"}
          open={openChatsModal}
          onCancel={() => setOpenChatsModal(false)}
          footer={null}
        >
          <center>
            <br />
            <p>Are you sure you want to delete your chat threads ?</p> <br />
            <Button
              className=" bg-red-500 text-white border-none"
              onClick={handleDelete}
            >
              DELETE
            </Button>
          </center>
        </Modal>
        <Modal
          title={"UPDATE MY INTERESTS"}
          open={openInterestsModal}
          onCancel={() => {
            setOpenInterestsModal(false);
            setIsChangedFields(false);
          }}
          footer={null}
        >
          <input
            type="text"
            name="interest"
            id="interest"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={interests}
            onChange={(e) => {
              setInterests(e.target.value);
              setIsChangedFields(true);
            }}
            placeholder="Enter ',' separated Interests"
          />
          <q>Enter comma separated values</q>
          <br />
          <center>
            <Button
              className={isChangedFields && " bg-green-500 text-white"}
              disabled={!isChangedFields}
              onClick={handleUpdate}
            >
              <SaveOutlined /> Save Changes
            </Button>
          </center>
        </Modal>
      </nav>
    </header>
  );
};

export default Header;
