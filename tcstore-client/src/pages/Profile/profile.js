import React, { useState, useEffect } from "react";
import "./profile.css";
import { Col, Row, Spin, Card, Divider } from "antd";
import { SafetyOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import userApi from "../../apis/userApi";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await userApi.getProfile();
        if (!response) {
          localStorage.removeItem("client");
        }
        setUserData(response.user);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch profile user:" + error);
      }
    })();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Spin spinning={loading}>
        <div style={{ marginBottom: 25, marginTop: 25 }}>
          <div className="container">
            <Row justify="center">
              <Col
                span="19"
                style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}
              >
                <Card
                  hoverable={true}
                  className="profile-card"
                  style={{ padding: 0, margin: 0 }}
                >
                  <Row justify="center" style={{ padding: 20 }}>
                    <img
                      src={userData.image?.replace(
                        "http://localhost:3100",
                        process.env.REACT_APP_HOST_URL
                      )}
                      style={{ width: 150, height: 150 }}
                      alt="user avatar"
                    ></img>
                  </Row>
                  <Row justify="center">
                    <Col span="24">
                      <Row justify="center">
                        <strong style={{ fontSize: 18 }}>
                          {userData.username}
                        </strong>
                      </Row>
                      <Row justify="center">
                        <p style={{ padding: 0, margin: 0, marginBottom: 5 }}>
                          {userData.email}
                        </p>
                      </Row>
                      <Row justify="center">
                        <p>{userData.birthday}</p>
                      </Row>
                      <Divider style={{ padding: 0, margin: 0 }}></Divider>
                      <Row justify="center" style={{ marginTop: 10 }}>
                        <Col span="4">
                          <Row justify="center">
                            <p>{<UserOutlined />}</p>
                            <p style={{ marginLeft: 5 }}>{userData.gender}</p>
                          </Row>
                        </Col>
                        <Col span="8">
                          <Row justify="center">
                            <p>{<SafetyOutlined />}</p>
                            <p style={{ marginLeft: 5 }}>{userData.type}</p>
                          </Row>
                        </Col>
                        <Col span="8">
                          <Row justify="center">
                            <p>{<PhoneOutlined />}</p>
                            <p style={{ marginLeft: 5 }}>{userData.phone}</p>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Profile;
