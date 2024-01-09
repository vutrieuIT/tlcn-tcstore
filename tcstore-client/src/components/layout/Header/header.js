import React, { useEffect, useState } from "react";
import "./header.css";
import userApi from "../../../apis/userApi";
import logo from "../../../assets/header/Techcomp.png";
import DropdownAvatar from "../../DropdownMenu/dropdownMenu";
import { useHistory } from "react-router-dom";
import { Avatar, Badge, Row, Col, List, Popover, Modal } from "antd";
import {
  BellOutlined,
  NotificationTwoTone,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import pn from "../../../assets/header/header-panner.png";
import { AiOutlineSearch } from "react-icons/ai";

function Topbar({ keyWord, setKeyWord }) {
  // eslint-disable-next-line
  const [countNotification, setCountNotification] = useState(0);
  // eslint-disable-next-line
  const [notification, setNotification] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visiblePopover, setVisiblePopover] = useState(false);
  const [titleNotification, setTitleNotification] = useState("");
  const [contentNotification, setContentNotification] = useState("");
  const [userData, setUserData] = useState([]);
  const [cart, setCart] = useState();
  const [tempKeyWord, setTempKeyWord] = useState("");

  const history = useHistory();

  const handleLink = (link) => {
    history.push(link);
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
                  <button
                    onClick={() =>
                      handleNotification(values.content, values.title)
                    }
                  >
                    {values.title}
                  </button>
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
    // eslint-disable-next-line
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

  const gotoTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const onKeyWordChange = (e) => {
    const newKeyword = e.target.value;
    setTempKeyWord(newKeyword);
  };

  const onKeyWordClick = () => {
    setKeyWord(tempKeyWord);
  };

  useEffect(() => {
    setTempKeyWord(keyWord);
  }, [keyWord]);

  useEffect(() => {
    (async () => {
      try {
        const response = await userApi.getProfile();
        if (!response) {
          console.log(response);
          localStorage.removeItem("client");
        } 
          const cart = localStorage.getItem("cartLength");
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
                    alt=""
                  ></img>
                </Col>
                <Col className="btn-st">
                  <button
                    className="btn-sty"
                    onClick={() => {
                      handleLink("/home");
                      gotoTop();
                    }}
                  >
                    Danh mục
                  </button>
                </Col>
                <div className="coll-header--search">
                  <input
                    className="input-st"
                    type="text"
                    placeholder="Search..."
                    value={tempKeyWord}
                    onChange={onKeyWordChange}
                  />
                  <AiOutlineSearch
                    onClick={onKeyWordClick}
                    className="coll-header--search-icon "
                  />
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
