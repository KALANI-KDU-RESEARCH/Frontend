import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Header from "./Header";
import { categories, cloudinary, headers } from "./helpers/helper";
import { Option } from "antd/es/mentions";
const { REACT_APP_UPLOAD_PRESET, REACT_APP_BASE_URL } = process.env;

const { TextArea } = Input;

const CreatePost = ({
  isEdit = false,
  post = [],
  setIsModalOpen,
  setReRender,
}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    form.setFieldsValue({
      ...post,
      description: post.desc,
      categories: post.cat,
      image: post.img,
    });
    setSelectedCategories(post?.cat);
    setImage(post?.img);
  }, []);

  const handleUpload = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", REACT_APP_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          cloudinary.config().cloud_name
        }/image/upload`,
        formData
      );
      setImage(response.data.secure_url);
      form.setFieldValue("image", response.data.secure_url);
      message.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      message.error("Image upload failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const postData = {
        title: values.title,
        desc: values.description,
        img: image,
        cat: values.categories,
        userId: user._id,
      };
      if (isEdit) {
        await axios.put(
          `${REACT_APP_BASE_URL}/editPost/${post._id}`,
          postData,
          {
            headers,
          }
        );
        setIsModalOpen(false);
        setReRender(true);
      } else {
        await axios.post(`${REACT_APP_BASE_URL}/post`, postData, {
          headers,
        });
      }
      message.success(`Post ${isEdit ? "updated" : "created"} successfully!`);
      form.resetFields();
      setImage("");
      setSelectedCategories([]);
    } catch (error) {
      message.error(error.response.data.detail);
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type === "image/jpeg" || file.type === "image/png";
    if (!isImage) {
      message.error("You can only upload JPG/PNG files!");
      return false;
    }
    handleUpload(file);
    return false;
  };

  const handleSelect = (value) => {
    setSelectedCategories(value);
  };

  return (
    <>
      {!isEdit && <Header />}
      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-20">
        <Form onFinish={handleSubmit} labelCol={{ span: 4 }} form={form}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
            className="mb-4"
          >
            <Input
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter post title"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
            className="mb-4"
          >
            <TextArea
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter post description"
            />
          </Form.Item>

          <Form.Item
            name="categories"
            label="Categories"
            rules={[{ required: true, message: "Please select categories!" }]}
            className="mb-4"
          >
            <Select
              mode="tags"
              placeholder="Select or add categories"
              className="w-full border border-gray-300 rounded-md"
              style={{ width: "100%" }}
              onChange={handleSelect}
              value={selectedCategories}
              defaultValue={selectedCategories}
            >
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name={"image"}
            label="Image"
            rules={[{ required: true, message: "Please upload an image!" }]}
            className="mb-4"
          >
            <Upload
              beforeUpload={beforeUpload}
              accept=".jpg,.jpeg,.png" // Restrict file types
              maxCount={1} // Allow only one file
              showUploadList={false}
              className="w-full"
            >
              <Button
                className={`w-full flex items-center justify-center p-2 border border-gray-300 rounded-md ${
                  loading ? "bg-gray-200" : "bg-blue-500 text-white"
                }`}
                icon={<UploadOutlined />}
                loading={loading}
              >
                {loading ? "Uploading" : "Click to Upload"}
              </Button>
            </Upload>
            {image && (
              <img
                src={image}
                alt="Uploaded"
                className="mt-4 w-full max-h-56 object-cover rounded-md border border-gray-300"
              />
            )}
          </Form.Item>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              disabled={loading}
              className="w-full  rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              {isEdit ? "Save Changes" : "Create Post"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreatePost;
