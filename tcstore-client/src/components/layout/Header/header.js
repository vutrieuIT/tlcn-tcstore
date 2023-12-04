import React, { useEffect, useState } from "react";
import "./header.css";
import userApi from "../../../apis/userApi";
import logo from "../../../assets/header/Techcomp.png";
import DropdownAvatar from "../../DropdownMenu/dropdownMenu";
import { useHistory } from "react-router-dom";
import { Layout, Avatar, Badge, Row, Col, List, Popover, Modal } from "antd";
import {
  BellOutlined,
  NotificationTwoTone,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import pn from "../../../assets/header/header-panner.png";
import { AiOutlineSearch } from "react-icons/ai";

const { Header } = Layout;

function Topbar() {
  const [countNotification, setCountNotification] = useState(0);
  const [notification, setNotification] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visiblePopover, setVisiblePopover] = useState(false);
  const [titleNotification, setTitleNotification] = useState("");
  const [contentNotification, setContentNotification] = useState("");
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [userData, setUserData] = useState([]);
  const [cart, setCart] = useState();

  const history = useHistory();

  const handleLink = (link) => {
    setVisibleDrawer(false);
    history.push(link);
  };

  const Logout = async () => {
    await userApi.logout();
    localStorage.removeItem("client");
    history.push("/login");
    window.location.reload(false);
  };

  const content = (
    <div>
      {notification.map((values, index) => {
        return (
          <div>
            <List.Item style={{ padding: 0, margin: 0 }}>
              <List.Item.Meta
                style={{ width: 250, margin: 0 }}
                avatar={
                  <NotificationTwoTone
                    style={{ fontSize: "20px", color: "#08c" }}
                  />
                }
                title={
                  <a
                    onClick={() =>
                      handleNotification(values.content, values.title)
                    }
                  >
                    {values.title}
                  </a>
                }
                description={
                  <p
                    className="fixLine"
                    dangerouslySetInnerHTML={{ __html: values.content }}
                  ></p>
                }
              />
            </List.Item>
          </div>
        );
      })}
    </div>
  );

  const handleNotification = (valuesContent, valuesTitile) => {
    setVisible(true);
    setVisiblePopover(visible !== visible);
    setContentNotification(valuesContent);
    setTitleNotification(valuesTitile);
  };

  const handleVisibleChange = (visible) => {
    setVisiblePopover(visible);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onClose = () => {
    setVisibleDrawer(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await userApi.getProfile();
        const cart = localStorage.getItem("cartLength");
        console.log(cart);
        setCart(cart);
        setUserData(response);
      } catch (error) {
        console.log("Failed to fetch profile user:" + error);
      }
    })();
  }, []);

  return (
    <>
      <div className="header_top1">
        <img src={pn} alt=""></img>
      </div>

      <div className="fixed-div bg-header">
        <Row className=" container bg-header" style={{ background: "#373737" }}>
          <Col span={11} bg-header>
            <div className="row-style">
              <Row>
                <Col style={{ marginLeft: 70 }}>
                  <img
                    style={{ height: "50px", cursor: "pointer" }}
                    src={logo}
                    onClick={() => handleLink("/home")}
                  ></img>
                </Col>
                <Col className="btn-st">
                  <button
                    className="btn-sty"
                    onClick={() => handleLink("/home#categories")}
                  >
                    Danh mục
                  </button>
                </Col>
                <div className="coll-header--search">
                  <input
                    className="input-st"
                    type="text"
                    placeholder="Search..."
                  />
                  <AiOutlineSearch className="coll-header--search-icon " />
                </div>
              </Row>
            </div>
          </Col>
          <Col span={11} offset={2} className="headerText">
            <div className="div-center">
              <Row>
                <Col onClick={() => handleLink("/cart")}>
                  <p className="p-st">
                    <ShoppingCartOutlined className="cart" /> {cart}{" "}
                    <b>Giỏ hàng</b>
                  </p>
                </Col>
                <Col>
                  <Badge
                    style={{ marginLeft: 20 }}
                    overflowCount={9999}
                    count={userData?.score > 0 ? userData?.score : 0}
                  />
                </Col>
              </Row>
              <Row>
                <span
                  className="container "
                  style={{ marginRight: 15, background: "#373737" }}
                >
                  <Popover
                    placement="bottomRight"
                    title="Thông Báo"
                    content={content}
                    visible={visiblePopover}
                    onVisibleChange={handleVisibleChange}
                    trigger="click"
                  >
                    <Badge count={countNotification}>
                      <Avatar
                        style={{
                          marginLeft: 15,
                          marginRight: 5,
                          cursor: "pointer",
                        }}
                        icon={
                          <BellOutlined
                            style={{ fontSize: "18px", color: "#000000" }}
                          />
                        }
                      />
                    </Badge>
                  </Popover>
                </span>
              </Row>
              <Row style={{ background: "FF0000" }}>
                <DropdownAvatar key="avatar" />
              </Row>
              <Modal
                title={titleNotification}
                visible={visible}
                onOk={handleOk}
                onCancel={handleOk}
                cancelButtonProps={{ style: { display: "none" } }}
              >
                <p
                  dangerouslySetInnerHTML={{ __html: contentNotification }}
                ></p>
              </Modal>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Topbar;
