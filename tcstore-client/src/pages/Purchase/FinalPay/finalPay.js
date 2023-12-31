import React, { useEffect } from "react";
import userApi from "../../../apis/userApi";
import { useHistory } from 'react-router-dom';
import { Spin, Card } from "antd";
import {  Button, Steps, Breadcrumb, Form, Result} from 'antd';
import { AuditOutlined, HomeOutlined } from '@ant-design/icons';

const FinalPay = () => {
    const [form] = Form.useForm();
    const history = useHistory();

    const handleFinal = () => {
        history.push("/")
    }

    useEffect(() => {
      (async () => {
        try {
          const response = await userApi.getProfile();
          console.log(response);
          form.setFieldsValue({
            name: response.user.username,
            email: response.user.email,
            phone: response.user.phone,
          });
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          const transformedData = cart.map(
            ({ _id: product, quantity, price }) => ({
              product,
              quantity,
              price,
            })
          );

          console.log(transformedData);
        } catch (error) {
          console.log("Failed to fetch event detail:" + error);
        }
      })();
      window.scrollTo(0, 0);
      // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Spin spinning={false}>
                <Card className="container" >
                    <div className="product_detail">

                        <div style={{ marginLeft: 5, marginBottom: 10, marginTop: 10 }}>
                            <Breadcrumb>
                                <Breadcrumb.Item href="">
                                    <HomeOutlined />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="">
                                    <AuditOutlined />
                                    <span>Thanh toán</span>
                                </Breadcrumb.Item>
                            </Breadcrumb>

                            <div className="payment_progress">
                                <Steps
                                    current={2}
                                    percent={100}
                                    items={[
                                        {
                                            title: 'Chọn sản phẩm',
                                        },
                                        {
                                            title: 'Thanh toán',
                                        },
                                        {
                                            title: 'Hoàn thành',
                                        },
                                    ]}
                                />
                            </div>
                            <Result
                                status="success"
                                title="Đặt hàng thành công!"
                                subTitle="Bạn có thể xem lịch sử đặt hàng ở quản lý đơn hàng."
                                extra={[
                                    <Button type="primary" key="console" onClick={() => handleFinal()}>
                                        Hoàn thành
                                    </Button>,
                                ]}
                            />
                        </div>
                    </div>
                </Card>
            </Spin>
        </div >
    );
};

export default FinalPay;
