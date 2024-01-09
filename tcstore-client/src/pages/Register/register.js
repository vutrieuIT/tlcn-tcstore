import React from "react";
import "./register.css";
import { Input } from "antd";
import {
  Card,
  Form,
  Button,
  notification,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axiosClient from "../../apis/axiosClient";
import logo from "../../assets/header/Techcomp.png";

const RegisterCustomer = () => {
  let history = useHistory();

  const onFinish = async (values) => {
    try {
      const formatData = {
        email: values.email,
        username: values.username,
        password: values.password,
        phone: values.phoneNo,
        role: "isClient",
      };
      await axiosClient
        .post("http://localhost:3100/api/auth/register", formatData)
        .then((response) => {
          if (response === undefined) {
            notification["error"]({
              message: "Thông báo",
              description: "Đăng kí không thành công",
            });
          } else {
            notification["success"]({
              message: "Thông báo",
              description: "Đăng kí thành công",
            });
            setTimeout(function () {
              history.push("/login");
            }, 1000);
          }
        });
    } catch (error) {
      throw error;
    }
  };
  return (
    <div>
      <div className="imageBackground">
        <div id="wrapper">
          <Card id="dialog" bordered={false}>
            <Form
              style={{ width: 400, marginBottom: 8 }}
              name="normal_login"
              className="loginform"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item style={{ marginBottom: 3 }}>
                <img src={logo} width="200px" alt="#"></img>
              </Form.Item>
              <Form.Item style={{ marginBottom: 16 }}>
                <p style={{ fontSize: "24px" }} className="text">
                  Đăng Kí Tài Khoản khách hàng
                </p>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: 20 }}
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tài khoản!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="siteformitemicon" />}
                  placeholder="Tài khoản"
                />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: 20 }}
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="siteformitemicon" />}
                  type="password"
                  placeholder="Mật khẩu"
                />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: 20 }}
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập E-mail!",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="siteformitemicon" />}
                  placeholder="Email!"
                />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: 20 }}
                name="phoneNo"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="siteformitemicon" />}
                  placeholder="Số điện thoại"
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 18 }}>
                <Button
                  className="loginformbutton"
                  type="primary"
                  htmlType="submit"
                >
                  Đăng Kí
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterCustomer;
