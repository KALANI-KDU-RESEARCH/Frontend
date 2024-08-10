import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Collapse,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Spin,
  Tag,
} from "antd";
import Header from "./Header";
import { DeleteOutlined, EditOutlined, TagOutlined } from "@ant-design/icons";
import axios from "axios";
import { headers } from "./helpers/helper";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import CreatePost from "./CreatePost";
const { REACT_APP_BASE_URL } = process.env;

const { Panel } = Collapse;

const MyPosts = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await axios
        .get(`${REACT_APP_BASE_URL}/getPosts/${user._id}`, {
          headers,
        })
        .then((res) => {
          setPosts(res.data);
          setFilteredPosts(res.data); // Initialize filteredPosts
        })
        .finally(() => {
          setLoading(false);
          setReRender(false);
        });
    })();
  }, [reRender]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredPosts(
      posts.filter((post) =>
        post.title.toLowerCase().includes(value)
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${REACT_APP_BASE_URL}/deletePost/${id}`, {
        headers,
      });
      setIsModalOpen(false);
      setReRender(true);
    } catch (error) {
      message.error(error.response.data.detail);
    }
  };

  return (
    <>
      <Header />
      <Spin spinning={loading}>
        <div className="max-w-1200 mx-auto mt-10">
          Badge Representations :&nbsp;&nbsp;&nbsp;
          <Badge status={"default"} className="mr-2" /> Pending
          &nbsp;&nbsp;&nbsp;
          <Badge status={"success"} className="mr-2" /> Interested by Investors
        </div>

        <div className="max-w-1200 mx-auto mt-5">
          <Input
            placeholder="Search posts by title"
            value={searchTerm}
            onChange={handleSearch}
            allowClear
          />
        </div>

        <Collapse
          accordion
          className="bg-gray-100 rounded-lg shadow-md max-w-1200 mx-auto mt-10"
          defaultActiveKey={["0"]}
        >
          {filteredPosts.map((post, index) => (
            <Panel
              header={
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge
                      status={post.status ? "success" : "default"}
                      className="mr-2"
                    />
                    <span className="text-lg font-semibold">{post.title}</span>
                    {post.cat.map((el) => (
                      <Tag
                        key={el}
                        className="border-green-500"
                        icon={<TagOutlined className="text-green-500" />}
                      >
                        {el}
                      </Tag>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      icon={<EditOutlined />}
                      className="text-blue-500"
                      size="small"
                      onClick={() => setIsModalOpen(true)}
                    />
                    <Popconfirm
                      title="Are you sure you want to delete this post?"
                      description="This action cannot be undone."
                      onConfirm={() => handleDelete(post._id)}
                      onCancel={() => message.error("Deletion discarded")}
                      okText="Yes, Delete"
                      cancelText="No, Don't"
                      okType="danger"
                    >
                      <Button
                        icon={<DeleteOutlined />}
                        className="text-red-500"
                        size="small"
                      />
                    </Popconfirm>
                  </div>
                </div>
              }
              key={index}
              className="border-b border-gray-300"
            >
              <p className="p-4 text-gray-700">
                <Image src={post.img} />
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {post.desc}
                </Markdown>
              </p>
              <Modal
                title={"Edit Your Post"}
                open={isModalOpen}
                onCancel={() => {
                  setIsModalOpen(false);
                }}
                footer={null}
                width={800}
                destroyOnClose={true}
              >
                <CreatePost
                  isEdit={true}
                  post={post}
                  setIsModalOpen={setIsModalOpen}
                  setReRender={setReRender}
                />
              </Modal>
            </Panel>
          ))}
        </Collapse>
      </Spin>
    </>
  );
};

export default MyPosts;
