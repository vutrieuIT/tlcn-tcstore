import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Row } from "antd";
import { Menu } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import "./dropdownMenu.css";
import userApi from "../../apis/userApi";

function DropdownAvatar() {
  const HOST_URL = process.env.REACT_APP_HOST_URL;
  const [userData, setUserData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  let history = useHistory();

  const Logout = async () => {
    localStorage.clear();
    history.push("/");
    await userApi.logout();
    window.location.reload(false);
  };

  const Login = () => {
    history.push("/login");
  };

  const register = () => {
    history.push("/register");
  };

  const handleRouter = (link) => {
    history.push(link);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await userApi.getProfile();
        if (!response) {
          console.log(response);
          localStorage.removeItem("client");
        }
        setUserData(response.user);
        const checkLogin = localStorage.getItem("client");
        if (checkLogin) {
          setIsLogin(checkLogin);
        }
      } catch (error) {
        console.log("Failed to fetch profile user:" + error);
      }
    })();
  }, []);

  const avatarPrivate = (
    <Menu>
      <Menu.Item icon={<UserOutlined />}>
        {/*  eslint-disable-next-line */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleRouter("/profile")}
        >
          Trang cá nhân
        </a>
      </Menu.Item>
      <Menu.Item icon={<ShoppingCartOutlined />}>
        {/*  eslint-disable-next-line */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleRouter("/cart-history")}
        >
          Quản lý đơn hàng
        </a>
      </Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={Logout}>
        {/*  eslint-disable-next-line */}
        <a target="_blank" rel="noopener noreferrer">
          Thoát
        </a>
      </Menu.Item>
    </Menu>
  );

  const avatarPublic = (
    <Menu>
      <Menu.Item icon={<UserOutlined />}>
        {/*  eslint-disable-next-line */}
        <a target="_blank" rel="noopener noreferrer" onClick={Login}>
          Đăng nhập
        </a>
      </Menu.Item>
      <Menu.Item icon={<UserOutlined />}>
        {/*  eslint-disable-next-line */}
        <a target="_blank" rel="noopener noreferrer" onClick={register}>
          Đăng ký
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      key="avatar"
      placement="bottomCenter"
      overlay={isLogin ? avatarPrivate : avatarPublic}
      arrow
    >
      <Row className="container row-st">
        <div className="sty1">
          <div style={{ paddingRight: 10 }}>
            <Avatar
              style={{ outline: "none", fontSize: "2px" }}
              src={
                userData
                  ? userData.image?.replace("http://localhost:3100", HOST_URL)
                  : "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
              }
            />
          </div>
          <p className="sty2">{userData?.username}</p>
        </div>
      </Row>
    </Dropdown>
  );
}

export default DropdownAvatar;
