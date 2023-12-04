import React, { useState, useEffect } from "react";
import styles from "../EventDetail/eventDetail.css";
import axiosClient from "../../../apis/axiosClient";
import { useParams } from "react-router-dom";
import eventApi from "../../../apis/eventApi";
import { useHistory } from 'react-router-dom';
import { Col, Row, Tag, Spin, Card } from "antd";
import { DateTime } from "../../../utils/dateTime";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Typography, Button, Badge, Breadcrumb, Popconfirm, notification, Form, Input, Select } from 'antd';
import { HistoryOutlined, AuditOutlined, AppstoreAddOutlined, CloseOutlined, UserOutlined, MehOutlined, TeamOutlined, HomeOutlined, CheckOutlined } from '@ant-design/icons';

import Slider from "react-slick";

const { Meta } = Card;
const { Option } = Select;

const containerStyle = {
    width: "100%",
    height: '400px'
};

const center = {
    lat: 16.060269977440598,
    lng: 108.20984466888396
};

const centerQT = {
    lat: 16.074926901030143,
    lng: 108.22292498371291
};

const centerHK = {
    lat: 16.049688044658048,
    lng: 108.16043358186133
};

const { Title } = Typography;
const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";
const { TextArea } = Input;

const EventDetail = () => {

    const [eventDetail, setEventDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [suggest, setSuggest] = useState([]);
    const [visible, setVisible] = useState(false);
    const [dataForm, setDataForm] = useState([]);
    const [lengthForm, setLengthForm] = useState();
    const [form] = Form.useForm();
    const [template_feedback, setTemplateFeedback] = useState();
    let { id } = useParams();
    const history = useHistory();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };

    const settingsMobile = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const hideModal = () => {
        setVisible(false);
    };

    const handleJointEvent = async (id) => {
        try {
            await eventApi.joinEvent(id).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Notification`,
                        description:
                            'Joint Event Failed',

                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Successfully Joint Event',
                    });
                    listEvent();
                }
            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleCancelJointEvent = async (id) => {
        try {
            await eventApi.cancelJoinEvent(id).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Notification`,
                        description:
                            'Cancel Join Event Failed',

                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Successfully Cancel Joint Event',
                    });
                    listEvent();
                }
            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const listEvent = () => {
        setLoading(true);
        (async () => {
            try {
                const response = await eventApi.getDetailEvent(id);
                console.log(response);
                setEventDetail(response);
                setLoading(false);

            } catch (error) {
                console.log('Failed to fetch event detail:' + error);
            }
        })();
        window.scrollTo(0, 0);
    }

    const handleDetailEvent = (id) => {
        history.replace("/event-detail/" + id);
        window.location.reload();
        window.scrollTo(0, 0);
    }

    const getDataForm = async (uid) => {
        try {
            await axiosClient.get("/event/" + id + "/template_feedback/" + uid + "/question")
                .then(response => {
                    console.log(response);
                    setDataForm(response);
                    let tabs = [];
                    for (let i = 0; i < response.length; i++) {
                        tabs.push({
                            content: response[i]?.content,
                            uid: response[i]?.uid,
                            is_rating: response[i]?.is_rating
                        })
                    }
                    form.setFieldsValue({
                        users: tabs
                    })
                    setLengthForm(tabs.length)
                }
                );

        } catch (error) {
            throw error;
        }
    }

    const handleDirector = () => {
        history.push("/evaluation/" + id)
    }

    const onFinish = async (values) => {
        console.log(values.users);
        let tabs = [];
        for (let i = 0; i < values.users.length; i++) {
            tabs.push({
                scope: values.users[i]?.scope == undefined ? null : values.users[i]?.scope,
                comment: values.users[i]?.comment == undefined ? null : values.users[i]?.comment,
                question_uid: values.users[i]?.uid,

            })
        }
        console.log(tabs);
        setLoading(true);
        try {
            const dataForm = {
                "answers": tabs
            }
            await axiosClient.post("/event/" + id + "/answer", dataForm)
                .then(response => {
                    if (response === undefined) {
                        notification["error"]({
                            message: `Notification`,
                            description:
                                'Answer event question failed',

                        });
                        setLoading(false);
                    }
                    else {
                        notification["success"]({
                            message: `Notification`,
                            description:
                                'Successfully answer event question',

                        });
                        setLoading(false);
                        form.resetFields();
                    }
                }
                );

        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        (async () => {
            try {
                await eventApi.getDetailEvent(id).then((item) => {

                    setEventDetail(item);
                    getDataForm(item.template_feedback.uid)
                });
                const suggest = await eventApi.getSuggest();
                setSuggest(suggest);

                setLoading(false);

            } catch (error) {
                console.log('Failed to fetch event detail:' + error);
            }
        })();
        window.scrollTo(0, 0);
    }, [])

    return (
        <div>
            <Spin spinning={false}>
                <Row>
                    <div className="container_img">
                        <img className="bg-image" src={eventDetail?.avatar} style={{ width: '100%' }} alt='spaceship' />
                    </div>
                </Row>
                <Card className="event-detail" >
                    <div style={{ marginLeft: 5, marginBottom: 10, marginTop: 10 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <AuditOutlined />
                                <span>San phẩm</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >Chi tiết sản phẩm</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                </Card>
            </Spin>
        </div >
    );
};

export default EventDetail;
