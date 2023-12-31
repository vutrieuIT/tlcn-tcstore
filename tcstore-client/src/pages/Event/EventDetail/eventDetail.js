import React, { useState, useEffect } from "react";
import axiosClient from "../../../apis/axiosClient";
import { useParams } from "react-router-dom";
import eventApi from "../../../apis/eventApi";
import { useHistory } from "react-router-dom";
import { Row, Spin, Card } from "antd";
import { Breadcrumb, notification, Form } from "antd";
import { AuditOutlined, HomeOutlined } from "@ant-design/icons";

const EventDetail = () => {
  const [eventDetail, setEventDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggest, setSuggest] = useState([]);
  const [dataForm, setDataForm] = useState([]);
  const [lengthForm, setLengthForm] = useState();
  const [form] = Form.useForm();
  let { id } = useParams();
  const history = useHistory();

  const getDataForm = async (uid) => {
    try {
      await axiosClient
        .get("/event/" + id + "/template_feedback/" + uid + "/question")
        .then((response) => {
          console.log(response);
          setDataForm(response);
          let tabs = [];
          for (let i = 0; i < response.length; i++) {
            tabs.push({
              content: response[i]?.content,
              uid: response[i]?.uid,
              is_rating: response[i]?.is_rating,
            });
          }
          form.setFieldsValue({
            users: tabs,
          });
          setLengthForm(tabs.length);
        });
    } catch (error) {
      throw error;
    }
  };

  const handleDirector = () => {
    history.push("/evaluation/" + id);
  };

  const onFinish = async (values) => {
    console.log(values.users);
    let tabs = [];
    for (let i = 0; i < values.users.length; i++) {
      tabs.push({
        scope:
          values.users[i]?.scope == undefined ? null : values.users[i]?.scope,
        comment:
          values.users[i]?.comment == undefined
            ? null
            : values.users[i]?.comment,
        question_uid: values.users[i]?.uid,
      });
    }
    console.log(tabs);
    setLoading(true);
    try {
      const dataForm = {
        answers: tabs,
      };
      await axiosClient
        .post("/event/" + id + "/answer", dataForm)
        .then((response) => {
          if (response === undefined) {
            notification["error"]({
              message: `Notification`,
              description: "Answer event question failed",
            });
            setLoading(false);
          } else {
            notification["success"]({
              message: `Notification`,
              description: "Successfully answer event question",
            });
            setLoading(false);
            form.resetFields();
          }
        });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await eventApi.getDetailEvent(id).then((item) => {
          setEventDetail(item);
          getDataForm(item.template_feedback.uid);
        });
        const suggest = await eventApi.getSuggest();
        setSuggest(suggest);

        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch event detail:" + error);
      }
    })();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Spin spinning={false}>
        <Row>
          <div className="container_img">
            <img
              className="bg-image"
              src={eventDetail?.avatar}
              style={{ width: "100%" }}
              alt="spaceship"
            />
          </div>
        </Row>
        <Card className="event-detail">
          <div style={{ marginLeft: 5, marginBottom: 10, marginTop: 10 }}>
            <Breadcrumb>
              <Breadcrumb.Item href="">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="">
                <AuditOutlined />
                <span>San phẩm</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Chi tiết sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </Card>
      </Spin>
    </div>
  );
};

export default EventDetail;
