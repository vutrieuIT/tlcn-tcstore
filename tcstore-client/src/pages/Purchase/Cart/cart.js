import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row, Spin, Card } from "antd";
import {
  Button,
  Breadcrumb,
  InputNumber,
} from "antd";
import { Layout, Table, Divider, Statistic } from "antd";
import {
  DeleteOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

const Cart = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [cartLength, setCartLength] = useState();
  const [cartTotal, setCartTotal] = useState();
  const history = useHistory();

  const handlePay = () => {
    history.push("/pay");
  };

  const deleteCart = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("cartLength");
    window.location.reload(true);
  };

  const updateQuantity = (productId, newQuantity) => {
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    const updatedProductDetail = productDetail.map((product) => {
      if (product._id === productId) {
        return {
          ...product,
          quantity: newQuantity,
        };
      }
      return product;
    });
    setProductDetail(updatedProductDetail);

    // Tính lại tổng tiền
    const newTotal = updatedProductDetail.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    setCartTotal(newTotal);
  };

  const columns = [
    {
      title: "ID",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        // eslint-disable-next-line
        <img
          src={image?.replace(
            "http://localhost:3100",
            process.env.REACT_APP_HOST_URL
          )}
          style={{ height: 80 }}
        />
      ),
      width: "10%",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text, record) => {
        const displayPrice =
          record.promotion > 0 ? record.promotion : record.price;
        return (
          <p>
            {displayPrice.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <InputNumber
          min={1}
          defaultValue={text}
          onChange={(value) => {
            // gọi hàm updateQuantity để cập nhật số lượng sản phẩm
            updateQuantity(record._id, value);
          }}
        />
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text, record) => {
        const totalPrice =
          record.promotion > 0
            ? (record.promotion * record.quantity).toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })
            : (record.price * record.quantity).toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              });

        return (
          <div>
            <div className="groupButton">{totalPrice}</div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        // await productApi.getDetailProduct(id).then((item) => {
        //     setProductDetail(item);
        // });
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setProductDetail(cart);
        console.log(cart);
        const cartLength = localStorage.getItem("cartLength");
        setCartLength(cartLength);
        const total = cart.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );
        setCartTotal(total);
      } catch (error) {
        console.log("Failed to fetch event detail:" + error);
      }
    })();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Spin spinning={false}>
        <Card className="container">
          <div className="box_cart">
            <Layout className="box_cart">
              <Content className="site-layout-background">
                <Breadcrumb>Đơn hàng</Breadcrumb>
                <br></br>
                <Row justify="end">
                  <Col>
                    <Button type="default" danger>
                      <DeleteOutlined />
                      &nbsp;
                      <span onClick={() => deleteCart()}>Xóa đơn hàng</span>
                    </Button>
                  </Col>
                </Row>
                <h2>
                  Tổng sản phẩm <strong>({cartLength})</strong>
                </h2>
                <br></br>
                <Table
                  columns={columns}
                  dataSource={productDetail}
                  pagination={false}
                />
                <Divider orientation="right">
                  <p>Thanh toán</p>
                </Divider>
                <Row justify="start">
                  <Col md={12}>
                    <Divider orientation="left">Chính sách</Divider>
                    <ol>
                      <li>
                        Quy định về sản phẩm: Chúng tôi cam kết cung cấp những
                        sản phẩm chất lượng, đúng với mô tả, hình ảnh và thông
                        tin được cung cấp trên website.
                      </li>
                      <li>
                        Quy định về vận chuyển: Chúng tôi cam kết vận chuyển
                        hàng hóa đúng thời gian và địa điểm được yêu cầu bởi
                        khách hàng. Nếu có bất kỳ sự cố nào xảy ra trong quá
                        trình vận chuyển, chúng tôi sẽ liên hệ ngay với khách
                        hàng để thông báo và đưa ra giải pháp kịp thời.
                      </li>
                    </ol>
                  </Col>
                </Row>
                <br></br>
                <Row justify="end">
                  <Col>
                    <Statistic
                      title="Tổng tiền (đã bao gồm thuế)."
                      value={`${Math.round(cartTotal).toFixed(0)}`}
                      precision={0}
                    />
                    <Button
                      style={{ marginTop: 16 }}
                      type="primary"
                      onClick={() => handlePay()}
                    >
                      Thanh toán ngay <CreditCardOutlined />
                    </Button>
                  </Col>
                </Row>
              </Content>
            </Layout>
          </div>
        </Card>
      </Spin>
    </div>
  );
};

export default Cart;
