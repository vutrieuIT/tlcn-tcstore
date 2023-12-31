import React, { useState, useEffect } from "react";
import moment from 'moment';
import SunEditor from 'suneditor-react';
import { useHistory } from 'react-router-dom';
import eventApi from "../../../apis/eventApi";
import 'suneditor/dist/css/suneditor.min.css';
import axiosClient from "../../../apis/axiosClient";
import styles from "../EventCreate/createRecuritment.module.scss";
import { Button, Form, Input, Select, DatePicker, Spin, notification, InputNumber } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

const EventCreate = () => {

    const [typeEvent, setTypeEvent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [image, setImage] = useState();
    const [description, setDescription] = useState([]);

    const history = useHistory();

    const eventCreate = async (values) => {
        setLoading(true);
        try {
            var formData = new FormData();
            formData.append("image", image);
            await axiosClient.post("/uploadfile", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                if (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "approval") {
                    const formatData = {
                        "event_name": values.event_name,
                        "type_event_uids": values.type_event,
                        "is_online": values.is_online,
                        "size": values.size,
                        "organization": values.organization,
                        "start_at": values.rangePicker[0].format('YYYY-MM-DD T HH:mm') + "+7:00",
                        "end_at": values.rangePicker[1].format('YYYY-MM-DD T HH:mm') + "+7:00",
                        "description": description,
                        "location": values.location,
                        "avatar": response?.img_url,
                        "scope": values.score
                    }
                    return axiosClient.post("/event", formatData)
                        .then(response => {
                            if (response === undefined) {
                                notification["error"]({
                                    message: `Notification`,
                                    description:
                                        'Event create failed',

                                });
                                setLoading(false);
                            }
                            else {
                                notification["success"]({
                                    message: `Notification`,
                                    description:
                                        'Successfully event create',

                                });
                                setLoading(false);
                                history.push("/my-event");
                            }
                        }
                        );
                } else {
                    const formatData = {
                        "event_name": values.event_name,
                        "type_event": values.type_event,
                        "is_online": values.is_online,
                        "size": values.size,
                        "organization": values.organization,
                        "start_at": values.rangePicker[0].format('YYYY-MM-DD T HH:mm') + "+7:00",
                        "end_at": values.rangePicker[1].format('YYYY-MM-DD T HH:mm') + "+7:00",
                        "description": description,
                        "location": values.location,
                        "avatar": response?.img_url,
                        "score": 0
                    }
                    return axiosClient.post("/event", formatData)
                    .then(response => {
                        if (response === undefined) {
                            notification["error"]({
                                message: `Notification`,
                                description:
                                    'Event create failed',

                            });
                            setLoading(false);
                        }
                        else {
                            notification["success"]({
                                message: `Notification`,
                                description:
                                    'Successfully event create',

                            });
                            setLoading(false);
                            history.push("/my-event");
                        }
                    }
                    );
                }

            })

        } catch (error) {
            throw error;
        }
    }

    const CancelCreateRecruitment = () => {
        form.resetFields();
        history.push("/my-event");
    }

    const handleChangeImage = (event) => {
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
    }

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    function disabledRangeTime(_, type) {
        if (type === 'start') {
            return {
                disabledSeconds: () => [55, 56],
            };
        }
        return {
            disabledSeconds: () => [55, 56],
        };
    }

    const handleChange = (content) => {
        console.log(content); //Get Content Inside Editor
        setDescription(content);
    }

    useEffect(() => {
      (async () => {
        try {
          form.resetFields();
          const response = await eventApi.getTypeEvent();
          setTypeEvent(response.type_event);
          setLoading(false);
        } catch (error) {
          throw error;
        }
      })();
      window.scrollTo(0, 0);
      // eslint-disable-next-line
    }, [])

    return (
        <div id={styles.create_event}>
            <h1 style={{ borderRadius: 1, marginLeft: "10%", marginRight: "10%", marginTop: 40, marginBottom: 0, padding: 15, color: "#FFFFFF", background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)" }}>Add New Event Form </h1>
            <div id={styles.dialog}
            >
                <Spin spinning={loading}>
                    <Form
                        form={form}
                        onFinish={eventCreate}
                        name="eventCreate"
                        layout="vertical"
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="event_name"
                            label="Event Name"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your event name!',
                                },
                                { max: 150, message: 'Name Event maximum 150 characters.' },
                                { min: 5, message: 'Name Event at least 5 characters.' },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input placeholder="Name Event" />
                        </Form.Item>

                        <Form.Item
                            name="organization"
                            label="Organization"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your organization!',
                                },
                                { max: 150, message: 'Organization Name maximum 150 characters.' },
                                { min: 5, message: 'Organization Name at least 5 characters.' },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input placeholder="Organization" />
                        </Form.Item>

                        <Form.Item
                            name="size"
                            label="Number of participants"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your number of participants!',
                                },
                                {
                                    required: true,
                                    pattern: /^[-+]?\d+$/,
                                    message: "Number of participants must be integer and contain just number!"
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <InputNumber style={{ width: "100%" }} min={1} max={9999} placeholder="Number of participants" ></InputNumber>
                        </Form.Item>

                        {localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "approval" ?
                            <Form.Item
                                name="score"
                                label="Score"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your score!',
                                    },
                                    {
                                        required: true,
                                        pattern: /^[-+]?\d+$/,
                                        message: "Score must be integer and contain just number!"
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <InputNumber style={{ width: "100%" }} min={1} max={100} placeholder="Score" ></InputNumber>
                            </Form.Item> : ""}

                        <Form.Item
                            name="location"
                            label="Location"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your location!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Select placeholder="Location" >
                                <Option value="245 Nguyễn Văn Linh, Đà Nẵng">245 Nguyễn Văn Linh, Đà Nẵng</Option>
                                <Option value="03 Quang Trung, Đà Nẵng">03 Quang Trung, Đà Nẵng</Option>
                                <Option value="120 Hoàng Minh Thảo, Đà Nẵng">120 Hoàng Minh Thảo, Đà Nẵng</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="rangePicker"
                            label="Start Time - End Time"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Start Time - End Time!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <RangePicker
                                disabledDate={disabledDate}
                                disabledTime={disabledRangeTime}
                                showTime={{
                                    hideDisabledOptions: true,
                                    defaultValue: [moment('00:00:00', 'HH:mm'), moment('11:59', 'HH:mm')],
                                }}
                                format="DD-MM-YYYY HH:mm" />
                        </Form.Item>

                        <Form.Item
                            name="type_event"
                            label="Event Type"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your event type!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Select mode="multiple" style={{ width: '100%' }} tokenSeparators={[',']} placeholder="Event Type">
                                {typeEvent.map((item, index) => {
                                    return (
                                        <Option value={item.uid} key={index} label="Japan">
                                            {item.name?.toUpperCase()}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="is_online"
                            label="Event Status"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose your event stauts!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Select placeholder="Event Status" >
                                <Option value="false">Offline</Option>
                                <Option value="true">Online</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="desEvent"
                            label="Event Description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Description Event!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >

                            <SunEditor
                                lang="en"
                                placeholder="Content"
                                onChange={handleChange}
                                setOptions={{
                                    buttonList: [
                                        ["undo", "redo"],
                                        ["font", "fontSize"],
                                        // ['paragraphStyle', 'blockquote'],
                                        [
                                            "bold",
                                            "underline",
                                            "italic",
                                            "strike",
                                            "subscript",
                                            "superscript"
                                        ],
                                        ["fontColor", "hiliteColor"],
                                        ["align", "list", "lineHeight"],
                                        ["outdent", "indent"],

                                        ["table", "horizontalRule", "link", "image", "video"],
                                        // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                                        // ['imageGallery'], // You must add the "imageGalleryUrl".
                                        // ["fullScreen", "showBlocks", "codeView"],
                                        ["preview", "print"],
                                        ["removeFormat"]

                                        // ['save', 'template'],
                                        // '/', Line break
                                    ],
                                    fontSize: [
                                        8, 10, 14, 18, 24,
                                    ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                                    defaultTag: "div",
                                    minHeight: "300px",
                                    showPathLabel: false,
                                    attributesWhitelist: {
                                        all: "style",
                                        table: "cellpadding|width|cellspacing|height|style",
                                        tr: "valign|style",
                                        td: "styleinsert|height|style",
                                        img: "title|alt|src|style"
                                    }
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="image"
                            label="Image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please import photos!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <input type="file" onChange={handleChangeImage}
                                id="avatar" name="file"
                                accept="image/png, image/jpeg" />
                        </Form.Item>


                        <Form.Item >
                            <Button style={{ background: "#FF8000", color: '#FFFFFF', float: 'right', marginTop: 20, marginLeft: 8 }} htmlType="submit">
                                Create
                            </Button>
                            <Button style={{ background: "#FF8000", color: '#FFFFFF', float: 'right', marginTop: 20 }} onClick={CancelCreateRecruitment}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        </div>
    )
}

export default EventCreate;