import React, { useState, useEffect } from "react";
import axiosClient from "../../../apis/axiosClient";
import { useParams } from "react-router-dom";
import userApi from "../../../apis/userApi";
import productApi from "../../../apis/productApi";
import { useHistory } from "react-router-dom";
import { Spin, Card } from "antd";
import {
  Button,
  Steps,
  Breadcrumb,
  notification,
  Form,
  Input,
  Radio,
} from "antd";
import { AuditOutlined, HomeOutlined } from "@ant-design/icons";

const Pay = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [userData, setUserData] = useState([]);
  const [orderTotal, setOrderTotal] = useState([]);
  const [form] = Form.useForm();
  let { id } = useParams();
  const history = useHistory();

  const accountCreate = async (values) => {
    try {
      const formatData = {
        userId: userData._id,
        address: values.address,
        billing: "cod",
        description: values.description,
        status: "pending",
        products: productDetail,
        orderTotal: orderTotal,
      };

      await axiosClient.post("/order", formatData).then((response) => {
        if (response === undefined) {
          notification["error"]({
            message: `Thông báo`,
            description: "Đặt hàng thất bại",
          });
        } else {
          notification["success"]({
            message: `Thông báo`,
            description: "Đặt hàng thành công",
          });
          form.resetFields();
          history.push("/final-pay");
          localStorage.removeItem("cart");
          localStorage.removeItem("cartLength");
        }
      });
    } catch (error) {
      throw error;
    }
    setTimeout(function () {}, 1000);
  };

  const CancelPay = () => {
    form.resetFields();
    history.push("/cart");
  };

  useEffect(() => {
    (async () => {
      try {
        await productApi.getDetailProduct(id).then((item) => {
          setProductDetail(item);
        });
        const response = await userApi.getProfile();
        if (!response) {
          localStorage.removeItem("client");
        }
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
        let totalPrice = 0;

        for (let i = 0; i < transformedData.length; i++) {
          let product = transformedData[i];
          let price = product.price * product.quantity;
          totalPrice += price;
        }

        setOrderTotal(totalPrice);
        setProductDetail(transformedData);
        setUserData(response.user);
      } catch (error) {
        console.log("Failed to fetch event detail:" + error);
      }
    })();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Spin spinning={false}>
        <Card className="container">
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
                  current={1}
                  percent={60}
                  items={[
                    {
                      title: "Chọn sản phẩm",
                    },
                    {
                      title: "Thanh toán",
                    },
                    {
                      title: "Hoàn thành",
                    },
                  ]}
                />
              </div>

              <div className="information_pay">
                <Form
                  form={form}
                  onFinish={accountCreate}
                  name="eventCreate"
                  layout="vertical"
                  initialValues={{
                    residence: ["zhejiang", "hangzhou", "xihu"],
                    prefix: "86",
                  }}
                  scrollToFirstError
                >
                  <Form.Item
                    name="name"
                    label="Tên"
                    hasFeedback
                    style={{ marginBottom: 10 }}
                  >
                    <Input disabled placeholder="Tên" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email"
                    hasFeedback
                    style={{ marginBottom: 10 }}
                  >
                    <Input disabled placeholder="Email" />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    hasFeedback
                    style={{ marginBottom: 10 }}
                  >
                    <Input disabled placeholder="Số điện thoại" />
                  </Form.Item>

                  <Form.Item
                    name="address"
                    label="Địa chỉ"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập địa chỉ",
                      },
                      // { max: 20, message: 'Password maximum 20 characters.' },
                      // { min: 6, message: 'Password at least 6 characters.' },
                    ]}
                    style={{ marginBottom: 15 }}
                  >
                    <Input placeholder="Địa chỉ" />
                  </Form.Item>

                  <Form.Item
                    name="description"
                    label="Lưu ý cho đơn hàng"
                    hasFeedback
                    style={{ marginBottom: 15 }}
                  >
                    <Input.TextArea rows={4} placeholder="Lưu ý" />
                  </Form.Item>

                  <Form.Item
                    name="billing"
                    label="Phương thức thanh toán"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn phương thức thanh toán!",
                      },
                    ]}
                    style={{ marginBottom: 10 }}
                  >
                    <Radio.Group>
                      <Radio value={"cod"}>COD</Radio>
                      {/* <Radio value={2}>B</Radio> */}
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      style={{
                        background: "#FF8000",
                        color: "#FFFFFF",
                        float: "right",
                        marginTop: 20,
                        marginLeft: 8,
                      }}
                      htmlType="submit"
                    >
                      Hoàn thành
                    </Button>
                    <Button
                      style={{
                        background: "#FF8000",
                        color: "#FFFFFF",
                        float: "right",
                        marginTop: 20,
                      }}
                      onClick={CancelPay}
                    >
                      Trở về
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </Card>
      </Spin>
    </div>
  );
};

export default Pay;
