import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Collapse,
  Empty,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Spin,
  Tag,
} from "antd";
import Header from "./Header";
import {
  ContactsOutlined,
  DeleteOutlined,
  DislikeOutlined,
  EditOutlined,
  TagOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { headers } from "./helpers/helper";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import CreatePost from "./CreatePost";
const { REACT_APP_BASE_URL } = process.env;

const { Panel } = Collapse;

const IDashBoard = () => {
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
        .get(`${REACT_APP_BASE_URL}/getAllPosts`, {
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
      posts.filter((post) => post.title.toLowerCase().includes(value))
    );
  };

  const markAsNotInterested = async (id) => {
    try {
      await axios.post(
        `${REACT_APP_BASE_URL}/notInterested/${id}/${user._id}`,
        {},
        {
          headers,
        }
      );
      setIsModalOpen(false);
      setReRender(true);
    } catch (error) {
      message.error(error.response.data.detail);
    }
  };

  const handleEmailSend = async (pId, title, eId) => {
    try {
      await axios.post(
        `${REACT_APP_BASE_URL}/sendEmail/${user._id}/${eId}/${pId}`,
        { email: user.email, title },
        {
          headers,
        }
      );
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
        <div className="max-w-1200 mx-auto mt-10">⚡My Feed</div>

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
          {!filteredPosts.length ? (
            <Empty
              description={
                !posts.length
                  ? "No posts available yet."
                  : "No matching results found."
              }
            />
          ) : (
            filteredPosts.map((post, index) => (
              <Panel
                header={
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold">
                        {post.title}
                      </span>
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
                      <Popconfirm
                        title="Are you sure you want to mark as not interested this post?"
                        description="This action cannot be undone."
                        onConfirm={() => markAsNotInterested(post._id)}
                        onCancel={() =>
                          message.error("Not Interested discarded")
                        }
                        okText="Yes, Confirm"
                        cancelText="No, Don't"
                        okType="danger"
                      >
                        {post?.["not-interested"]?.includes(user._id) ? (
                          "You marked as not interested"
                        ) : post?.["contacted-list"]?.includes(user._id) ? (
                          "You contacted the entrepreneur"
                        ) : (
                          <Button
                            icon={<DislikeOutlined />}
                            className="text-blue-500"
                            size="small"
                          >
                            Not Interested
                          </Button>
                        )}
                      </Popconfirm>
                      {!post?.["not-interested"]?.includes(user._id) &&
                        !post?.["contacted-list"]?.includes(user._id) && (
                          <Popconfirm
                            title="Are you sure you want to contact this post owner?"
                            description="Email has been seen to that particular Entrepreneur"
                            onConfirm={() =>
                              handleEmailSend(post._id, post.title, post.userId)
                            }
                            onCancel={() => message.error("Contact discarded")}
                            okText="Yes, Contact"
                            cancelText="No, Don't"
                            okType="default"
                          >
                            <Button
                              icon={<ContactsOutlined />}
                              className="text-red-500"
                              size="small"
                            >
                              Contact Entrepreneur
                            </Button>
                          </Popconfirm>
                        )}
                    </div>
                  </div>
                }
                key={index}
                className="border-b border-gray-300"
              >
                Entrepreneur Impression Rate: {post.impressionRate}
                <p className="p-4 text-gray-700">
                  <Image src={post.img}/>
                  <Markdown className="text-justify mt-4 leading-loose"
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
            ))
          )}
        </Collapse>
      </Spin>
    </>
  );
};

export default IDashBoard;
