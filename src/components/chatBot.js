import axios from "axios";
import React, { useEffect, useState } from "react";
import { Widget, addResponseMessage, addUserMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import { headers } from "./helpers/helper";
const { REACT_APP_BASE_URL } = process.env;

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    (async () => {
      await axios
        .get(`${REACT_APP_BASE_URL}/chat/${user._id}`, { headers })
        .then((res) =>
          res.data.map((el) => {
            addUserMessage(el.user);
            addResponseMessage(el.assistant);
          })
        )
        .catch((err) => alert(err));
      addResponseMessage("**Welcome Chief to this awesome chat!**");
    })();
  }, []);

  const handleNewUserMessage = async (newMessage) => {
    await axios
      .post(
        `${REACT_APP_BASE_URL}/chat/`,
        {
          userId: user._id,
          userName: user.email.split("@")[0],
          text: newMessage,
        },
        { headers }
      )
      .then((res) => addResponseMessage(res.data))
      .catch((err) => alert(err));
  };
  return (
    <div className="App">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={"https://i.ibb.co/2WH8sKP/bot.png"}
        profileClientAvatar={"https://flowbite.com/docs/images/logo.svg"}
        title="My Chat Assistant"
        subtitle="Micro Entrepreneur Management System"
        // titleAvatar={"https://flowbite.com/docs/images/logo.svg"}
        resizable={true}
        markAllAsRead
        showBadge={false}
        emojis={true}
        launcherOpenImg={"https://i.ibb.co/2WH8sKP/bot.png"}
        launcherCloseImg={"https://i.ibb.co/8B4kGnB/close.png"}
      />
    </div>
  );
};

export default ChatBot;
