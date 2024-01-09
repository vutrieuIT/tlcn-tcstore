import React, { useState, useEffect } from "react";
import "./productDetail.css";
import { useParams } from "react-router-dom";
import productApi from "../../../apis/productApi";
import { useHistory } from "react-router-dom";
import { Col, Row, Spin, Card } from "antd";
import { Button, Breadcrumb, Rate } from "antd";
import { AuditOutlined, HomeOutlined } from "@ant-design/icons";

import ReviewForm from "../../../components/ReviewComponent/ReviewFrom";
import ReviewItem from "../../../components/ReviewComponent/ReviewItem";
import ReviewSummary from "../../../components/ReviewComponent/ReviewSumary";

const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [cartLength, setCartLength] = useState();
  let { id } = useParams();
  const history = useHistory();

  const addCart = (product) => {
    console.log(product);
    const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
    let updatedItems;
    const existingItemIndex = existingItems.findIndex(
      (item) => item._id === product._id
    );
    if (existingItemIndex !== -1) {
      // If product already exists in the cart, increase its quantity
      updatedItems = existingItems.map((item, index) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    } else {
      // If product does not exist in the cart, add it to the cart
      updatedItems = [...existingItems, { ...product, quantity: 1 }];
    }
    console.log(updatedItems.length);
    setCartLength(updatedItems.length);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    localStorage.setItem("cartLength", updatedItems.length);
    window.location.reload(true);
  };

  const paymentCard = (product) => {
    console.log(product);
    const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
    let updatedItems;
    const existingItemIndex = existingItems.findIndex(
      (item) => item._id === product._id
    );
    if (existingItemIndex !== -1) {
      // If product already exists in the cart, increase its quantity
      updatedItems = existingItems.map((item, index) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    } else {
      // If product does not exist in the cart, add it to the cart
      updatedItems = [...existingItems, { ...product, quantity: 1 }];
    }
    console.log(updatedItems.length);
    setCartLength(updatedItems.length);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    localStorage.setItem("cartLength", updatedItems.length);
    history.push("/cart");
  };

  const [reviews, setReview] = useState([]);

  const handleReviewFromSubmit = async (review) => {
    try {
      console.log("product ID", id);
      console.log("review", review);
      await productApi.createReview(review, id);
      // Sau khi tạo review thành công, cập nhật lại danh sách đánh giá
      const updatedReview = await productApi.getReview(id);
      setReview(updatedReview);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await productApi.getReview(id).then((item) => {
          setReview(item);
          console.log(item);
        });
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await productApi.getDetailProduct(id).then((item) => {
          setProductDetail(item);
        });
      } catch (error) {
        console.log("Failed to fetch event detail:" + error);
      }
    })();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [cartLength]);

  return (
    <div>
      <Spin spinning={false}>
        <Card className="container_details">
          <div className="product_detail">
            <div style={{ marginLeft: 5, marginBottom: 10, marginTop: 10 }}>
              <Breadcrumb>
                <Breadcrumb.Item href="">
                  <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">
                  <AuditOutlined />
                  <span>Sản phẩm</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <hr></hr>
            <div className="price">
              <h1 className="product_name">{productDetail.name}</h1>
              <Rate disabled defaultValue={4} className="rate" />
            </div>
            <Row gutter={12} style={{ marginTop: 20 }}>
              <Col span={8}>
                <Card className="card_image" bordered={false}>
                  {/* eslint-disable-next-line */}
                  <img
                    src={productDetail.image?.replace(
                      "http://localhost:3100",
                      process.env.REACT_APP_HOST_URL
                    )}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card className="card_total" bordered={false}>
                  {productDetail?.promotion !== 0 ? (
                    <div>
                      <div className="price_product">
                        {productDetail?.promotion?.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                      <div className="promotion_product">
                        {productDetail?.price?.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="price_product">
                      {productDetail?.price?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                  )}

                  <div class="box-product-promotion">
                    <div class="box-product-promotion-header">
                      <p>Khuyến mãi</p>
                    </div>
                    <div class="box-content-promotion">
                      <p class="box-product-promotion-number">1</p>
                      {/* eslint-disable-next-line */}
                      <a>
                        Thu cũ lên đời - Giá thu cao nhất - Tặng thêm 1 triệu
                        khi lên đời
                        <span>(Xem chi tiết)</span>
                      </a>
                    </div>
                  </div>
                  <div className="box_cart_1">
                    <Button
                      type="primary"
                      className="by"
                      size={"large"}
                      onClick={() => paymentCard(productDetail)}
                    >
                      Mua ngay
                    </Button>
                    <Button
                      type="primary"
                      className="cart"
                      size={"large"}
                      onClick={() => addCart(productDetail)}
                    >
                      Thêm vào giỏ
                    </Button>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card className="card_total" bordered={false}>
                  <div className="card_number">
                    <div>
                      <div className="number_total">
                        {productDetail.categoryTotal}
                      </div>
                      <div className="title_total">Chính sách mua hàng</div>
                      <div class="policy_intuitive">
                        <div class="policy">
                          <ul class="policy__list">
                            <li>
                              <div class="iconl">
                                <i class="icondetail-doimoi"></i>
                              </div>
                              <p>
                                Hư gì đổi nấy <b> 12 tháng </b> tại TCSTORE
                                (miễn phí tháng đầu)
                                {/* eslint-disable-next-line */}
                                <a title="Chính sách đổi trả">Xem chi tiết</a>
                              </p>
                            </li>
                            <li data-field="IsSameBHAndDT">
                              <div class="iconl">
                                <i class="icondetail-baohanh"></i>
                              </div>
                              <p>
                                Bảo hành <b>chính hãng 1 năm</b> tại các trung
                                tâm bảo hành hãng
                                <a
                                  href="/bao-hanh/lenovo"
                                  target="_blank"
                                  title="Chính sách bảo hành"
                                >
                                  Xem địa chỉ bảo hành
                                </a>
                              </p>
                            </li>

                            <li>
                              <div class="iconl">
                                <i class="icondetail-sachhd"></i>
                              </div>
                              <p>
                                Bộ sản phẩm gồm: Dây sạc, túi chống sốc...{" "}
                                {productDetail.name}
                                {/* eslint-disable-next-line */}
                                <a href="#">Xem hình</a>
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>

            <div>
              <div
                className="box_detail_description"
                dangerouslySetInnerHTML={{ __html: productDetail.description }}
              ></div>
            </div>

            <Row gutter={12} style={{ marginTop: 20 }}>
              <Col span={16}>
                <Card className="card_total" bordered={false}>
                  <div className="card_number">
                    <div>
                      <div className="number_total">
                        {productDetail.categoryTotal}
                      </div>
                      <div className="title_total">
                        Đánh giá & nhận xét {productDetail.name}
                      </div>
                      <div class="review">
                        <div class="policy-review">
                          <div class="policy__list">
                            <ReviewSummary reviews={reviews} />
                          </div>
                        </div>
                      </div>
                      <div>
                        {reviews.map((item) => (
                          <ReviewItem item={item} />
                        ))}
                      </div>
                      <p class="subtitle">Bạn đánh giá sao sản phẩm này</p>
                      <ReviewForm onSubmit={handleReviewFromSubmit} />
                      {/* <div class="group_comment">
                                                <Button type="primary" className="button_comment" size={'large'}>
                                                    Đánh giá ngay
                                                </Button>
                                            </div> */}
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </Card>
      </Spin>
    </div>
  );
};

export default ProductDetail;
