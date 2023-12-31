import React, { useEffect, useState } from 'react';
import "./header.css";
import logo from "../../../assets/image/Techcomp.png";
import MenuDropdown from "../../DropdownMenu/dropdownMenu";
import { Layout, Row, Col, Modal } from 'antd';
import userApi from "../../../apis/userApi";

const { Header } = Layout;

function Topbar() {
  // eslint-disable-next-line
  const [notification, setNotification] = useState([]);
  const [visible, setVisible] = useState(false);
  // eslint-disable-next-line
  const [titleNotification, setTitleNotification] = useState("");
  // eslint-disable-next-line
  const [contentNotification, setContentNotification] = useState("");

  const handleOk = () => {
    setVisible(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await userApi.pingRole();
        console.log(response.role);
      } catch (error) {
        console.log("Failed to fetch event list:" + error);
      }
    })();
  }, []);

  return (
    <Header className="header" style={{ background: "#FFFFF" }}>
      <div>
        <Row className="header header-st">
          <Col span={10}>
            <div className="div-sty">
              <Row justify="center">
                <Col style={{ paddingLeft: 20 }}>
                  {/* eslint-disable-next-line */}
                  <a href="#">
                    <img className="logo" alt="" src={logo} />
                  </a>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={6} offset={8}>
            <div className="div-sty2">
              <Row>
                <MenuDropdown key="image" />
              </Row>
              <Row></Row>
            </div>
          </Col>
        </Row>
        <Modal
          title={titleNotification}
          visible={visible}
          onOk={handleOk}
          onCancel={handleOk}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <p dangerouslySetInnerHTML={{ __html: contentNotification }}></p>
        </Modal>
      </div>
    </Header>
  );
}

export default Topbar;