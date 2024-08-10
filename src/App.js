import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import EDashBoard from "./components/eDashBoard";
import Login from "./components/login";
import Register from "./components/register";
import PrivateRoute from "./PrivateRoute";
import ChatBot from "./components/chatBot";
import { useEffect, useState } from "react";
import CreatePost from "./components/CreatePost";
import MyPosts from "./components/MyPosts";
import IDashBoard from "./components/iDashBoard";
import Footer from "./components/Footer";

function App() {
  const [render, setRender] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    if (user?.email) {
      setRender(true);
    } else {
      setRender(false);
    }
  }, [location]);

  return (
    <div>
      {render && <ChatBot isDeleted={isDeleted} setIsDeleted={setIsDeleted} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dash-board"
          element={
            <PrivateRoute>
              {user?.type === "Invester" ? (
                <IDashBoard />
              ) : (
                <EDashBoard setIsDeleted={setIsDeleted} />
              )}
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/dash-board/create-post"
          element={
            <PrivateRoute>
              <CreatePost />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/dash-board/my-posts"
          element={
            <PrivateRoute>
              <MyPosts />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
