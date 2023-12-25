import React, { useState, useEffect } from 'react';
import "./profile.css";
import {
    Col, Row, Spin, Card, Divider, Form,
} from 'antd';
import { SafetyOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
//import QRCode from 'qrcode.react';
import userApi from "../../apis/userApi";
//import { useHistory } from 'react-router-dom';


//const { confirm } = Modal;
//const { Option } = Select;
//const { Title } = Typography;
//const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";

const Profile = () => {

    //const [event, setEvent] = useState([]);
    //const [eventTemp, setEventTemp] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [userData, setUserData] = useState([]);

    //const history = useHistory();

    /*const { data, isLoading, errorMessage } = useOpenWeather({
        key: '03b81b9c18944e6495d890b189357388',
        lat: '16.060094749570567',
        lon: '108.2097695823264',
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
    });*/


    useEffect(() => {
        (async () => {
            try {
                const response = await userApi.getProfile();
                setUserData(response.user);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch profile user:' + error);
            }
        })();
        window.scrollTo(0, 0);
    }, [])
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
                          "http://vuductrieu.id.vn:3100"
                        )}
                        style={{ width: 150, height: 150 }}
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
}

export default Profile;