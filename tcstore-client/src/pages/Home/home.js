import React, { useState, useEffect } from "react";
import "./home.css";
import Texty from "rc-texty";
import TweenOne from "rc-tween-one";
import QueueAnim from "rc-queue-anim";
import eventApi from "../../apis/eventApi";
import productApi from "../../apis/productApi";
import { OverPack } from "rc-scroll-anim";
//import { DateTime } from "../../utils/dateTime";
//import handshake from "../../assets/icon/handshake.svg";
import promotion1 from "../../assets/home/banner-1.png";
import bn1 from "../../assets/image/banner/bn1.png";
import bn2 from "../../assets/image/banner/bn2.png";
import bn3 from "../../assets/image/banner/bn3.png";
import bnfL from "../../assets/home/bnfooterLeft.png";
import bnfR from "../../assets/home/bnfooterRight.png";
import pannerSALE from "../../assets/home/offer_bg_5.png";
import service6 from "../../assets/image/service/service6.png";
import service7 from "../../assets/image/service/service7.png";
import service8 from "../../assets/image/service/service8.png";
import service9 from "../../assets/image/service/service9.png";
import service10 from "../../assets/image/service/service10.png";

import { useHistory } from "react-router-dom";
import { RightOutlined, QrcodeOutlined } from "@ant-design/icons";
import {
  Col,
  Row,
  Button,
  Pagination,
  Spin,
  Carousel,
  Card,
  List,
  BackTop,
  Affix,
  Avatar,
  Badge,
  Rate,
} from "antd";

const DATE_TIME_FORMAT = "DD - MM - YYYY";
const gridStyle = {
  width: "25%",
  textAlign: "center",
};

const Home = () => {
  const [event, setEvent] = useState([]);
  const [productList, setProductList] = useState([]);
  const [eventListHome, setEventListHome] = useState([]);
  const [totalEvent, setTotalEvent] = useState(Number);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsShow, setProductsShow] = useState([]);
  const [productsPC, setProductsPC] = useState([]);
  const [productsTablet, setProductsTablet] = useState([]);
  const [filterCategory, setFilterCategory] = useState(null);

  const history = useHistory();

  const handlePage = async (page, size) => {
    try {
      const response = await eventApi.getListEvents(page, 8);
      setEventListHome(response.data);
      setTotalEvent(response.total_count);
      setCurrentPage(page);
    } catch (error) {
      console.log("Failed to fetch event list:" + error);
    }
  };

  const handleReadMore = (id) => {
    console.log(id);
    history.push("product-detail/" + id);
  };

  const handleClickCategory = async (id, categoryName) => {
    try {
      console.log("category click", id);
      if (id == null) {
        const response = await productApi.getListProducts({
          limit: 100,
        });
        setProducts(response.data.docs);
        setFilterCategory(null);
      } else {
        const response = await productApi.getProductsByCategory(
          { limit: 100 },
          id
        );
        setProducts(response.data.docs);
        setFilterCategory(categoryName);
      }
    } catch (error) {
      console.log("get product by categoty fail");
    }
  };

  const renderItemList = (page, data) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const dataPaginate = data.slice(startIndex, endIndex);

    setProductsShow(dataPaginate);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getListProducts({
          page: 1,
          limit: 10,
        });
        setProductList(response.data.docs);
        setTotalEvent(response);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch event list:" + error);
      }

      try {
        const response = await productApi.getListEvents(1, 6);
        setEventListHome(response.data);
        setTotalEvent(response.total_count);
      } catch (error) {
        console.log("Failed to fetch event list:" + error);
      }
      try {
        const response = await productApi.getCategory({ limit: 10, page: 1 });
        console.log(response);
        setCategories(response.data.docs);
      } catch (error) {
        console.log(error);
      }
      try {
        const data = { limit: 10, page: 1 };
        const response = await productApi.getListProducts(data);
        console.log(response);
        setProducts(response.data.docs);
        renderItemList(1, response.data.docs);
        const response2 = await productApi.getListProducts(data);
        console.log(response2);
        setProductsPC(response2.data.docs);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Spin spinning={false}>
      <div className="home home1">
        <div
          style={{ background: "#FFFFFF" }}
          className="container-home container banner-promotion"
        >
          <Row justify="center" align="top" key="1">
            <Col span={5}>
              <ul className="menu-tree" id="categories">
                <li>
                  <div
                    className="menu-category"
                    onClick={() => handleClickCategory(null, null)}
                  >
                    tất cả
                    <RightOutlined />
                  </div>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <div
                      className="menu-category"
                      onClick={() =>
                        handleClickCategory(category._id, category.name)
                      }
                    >
                      {category.name}
                      <RightOutlined />
                    </div>
                  </li>
                ))}
              </ul>
            </Col>
            <Col span={19}>
              <Carousel autoplay className="carousel-image">
                <div className="img">
                  <img className="c-image" src={bn1} alt="" />
                </div>
                <div className="img">
                  <img className="c-image" src={bn2} />
                </div>
                <div className="img">
                  <img className="c-image" src={bn3} alt="" />
                </div>
              </Carousel>
            </Col>
          </Row>
        </div>

        <div className="container-home container">
          <img src={promotion1} className="promotion1"></img>
        </div>

        <div className="heading_slogan"></div>
        <br></br>
        <div className="card_wrap container-home container">
          <div>
            <Card
              bordered={false}
              className="card_suggest card_why card_slogan"
            >
              <img src={service6}></img>
              <p class="card-text mt-3 fw-bold text-center">
                Nhanh chóng & Bảo mật <br />
                Vận chuyển
              </p>
            </Card>
          </div>
          <div>
            <Card
              bordered={false}
              className="card_suggest card_why card_slogan"
            >
              <img src={service7}></img>
              <p class="card-text mt-3 fw-bold text-center">
                Đảm bảo 100% <br />
                Chính Hãng
              </p>
            </Card>
          </div>
          <div>
            <Card
              bordered={false}
              className="card_suggest card_why card_slogan"
            >
              <img src={service8}></img>
              <p class="card-text mt-3 fw-bold text-center">
                24 Giờ <br /> Đổi Trả
              </p>
            </Card>
          </div>
          <div>
            <Card
              bordered={false}
              className="card_suggest card_why card_slogan"
            >
              <img src={service9}></img>
              <p class="card-text mt-3 fw-bold text-center">
                Giao hàng <br /> Nhanh nhất
              </p>
            </Card>
          </div>
          <div>
            <Card
              bordered={false}
              className="card_suggest card_why card_slogan"
            >
              <img src={service10}></img>
              <p class="card-text mt-3 fw-bold text-center">
                Hỗ trợ <br /> Nhanh chóng
              </p>
            </Card>
          </div>
        </div>

        <div className="image-one">
          <div className="texty-demo">
            <Texty>Giờ Vàng</Texty>
          </div>
          <div className="texty-title">
            <p>
              Sản Phẩm <strong style={{ color: "#3b1d82" }}>Giảm Sốc</strong>
            </p>
          </div>

          <Row justify="center" className="container-home container" key="1">
            <div className="title-category">
              <a
                // href="https://cellphones.com.vn/mobile.html"
                class="title"
                style={{ textAlign: "left" }}
              >
                <h3>{filterCategory ? filterCategory : "Tất cả Sản phẩm"}</h3>
              </a>
            </div>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 5,
              }}
              dataSource={productsShow}
              renderItem={(item) => (
                <List.Item>
                  <Badge.Ribbon text="Giảm giá" color="red">
                    <Card
                      className="card_product"
                      onClick={() => handleReadMore(item._id)}
                    >
                      <img
                        style={{ width: "100%", height: 180 }}
                        src={item.image}
                        alt=""
                      ></img>
                      <div className="title_product">{item.name}</div>
                      <div className="price_group">
                        <div className="price_product">
                          {item.price.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </div>
                        <div className="promotion_product">
                          {item.promotion.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </div>
                      </div>
                      <div className="support_product">
                        Thu cũ máy cũ - Giá thu cao nhất - Tặng thêm 1 triệu khi
                        đổi máy cũ
                      </div>
                      <Rate
                        className="rate_product"
                        allowHalf
                        defaultValue={5}
                      />
                    </Card>
                  </Badge.Ribbon>
                </List.Item>
              )}
            />
          </Row>
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Pagination
            pageSize={pageSize}
            current={currentPage}
            defaultCurrent={1}
            total={products.length} // Tổng số sản phẩm
            onChange={(page) => {
              setCurrentPage(page);
              renderItemList(page, products);
            }}
          />
        </div>

        <div className="image-one">
          <div className="texty-demo">
            <Texty>Giờ Vàng</Texty>
          </div>
          <div className="texty-title">
            <p>
              Sản Phẩm <strong style={{ color: "#3b1d82" }}>ĐẶC BIỆT</strong>
            </p>
          </div>

          <Row justify="center" className="container-home container" key="1">
            <div className="title-category">
              <a
                href="https://cellphones.com.vn/mobile.html"
                class="title"
                style={{ textAlign: "left" }}
              >
                <h3>OUTLET SALE</h3>
              </a>
            </div>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 5,
              }}
              dataSource={productsPC}
              renderItem={(item) => (
                <List.Item>
                  <Badge.Ribbon text="Giảm giá" color="red">
                    <Card
                      className="card_product"
                      onClick={() => handleReadMore(item._id)}
                    >
                      <img
                        style={{ width: "100%", height: 180 }}
                        src={item.image}
                        alt=""
                      ></img>
                      <div className="title_product">{item.name}</div>
                      <div className="price_group">
                        <div className="price_product">
                          {item.price.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </div>
                        <div className="promotion_product">
                          {item.promotion.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </div>
                      </div>
                      <div className="support_product">
                        Thu cũ lên đời - Giá thu cao nhất - Tặng thêm 1 triệu
                        khi lên đời
                      </div>
                      <Rate
                        className="rate_product"
                        allowHalf
                        defaultValue={5}
                      />
                    </Card>
                  </Badge.Ribbon>
                </List.Item>
              )}
            />
          </Row>
        </div>

        <div class="container-home container">
          <div className="sale-2">
            <div class="banner-block-1 banner-block">
              <img src={bnfL} alt="" />
              <div class="banner-content">
                {/*<span class="ec-banner-stitle ">OUTLET SALE</span>
                                <span class="ec-banner-title">WiFi IP Camera 36</span>*/}
                <span class="ec-banner-btn">
                  <a href="#" class="btn-primary">
                    Mua Ngay
                  </a>
                </span>
              </div>
            </div>
            <div class="banner-block-2 banner-block">
              <img src={bnfR} alt="" />
              <div class="banner-content ">
                {/*<span class="ec-banner-stitle">lenovo tablets</span>
                                <span class="ec-banner-title">UP to 70% OFF</span>*/}
                <span class="ec-banner-btn">
                  <a href="#" class="btn-primary">
                    Mua Ngay
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="image-one">
          <Row justify="center" className="container-home container" key="1">
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 5,
              }}
              dataSource={productsTablet}
              renderItem={(item) => (
                <List.Item>
                  <Badge.Ribbon text="Giảm giá" color="red">
                    <Card
                      className="card_product"
                      onClick={() => handleReadMore(item._id)}
                    >
                      <img
                        style={{ width: "100%", height: 180 }}
                        src={item.image}
                        alt=""
                      ></img>
                      <div className="title_product">{item.name}</div>
                      <div className="price_group">
                        <div className="price_product">
                          {item.price.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </div>
                        <div className="promotion_product">
                          {item.promotion.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </div>
                      </div>
                      <div className="support_product">
                        Thu cũ lên đời - Giá thu cao nhất - Tặng thêm 1 triệu
                        khi lên đời
                      </div>
                      <Rate
                        className="rate_product"
                        allowHalf
                        defaultValue={5}
                      />
                    </Card>
                  </Badge.Ribbon>
                </List.Item>
              )}
            />
          </Row>
        </div>

        <div class="container">
          <div class="ec-offer-inner ">
            <img src={pannerSALE} className="ofr-img" alt="" href="#"></img>
          </div>
        </div>

        <div className="image-footer">
          <OverPack style={{ overflow: "hidden", height: 800, marginTop: 20 }}>
            <TweenOne
              key="0"
              animation={{ opacity: 1 }}
              className="code-box-shape"
              style={{ opacity: 0 }}
            />
            <QueueAnim
              key="queue"
              animConfig={[
                { opacity: [1, 0], translateY: [0, 50] },
                { opacity: [1, 0], translateY: [0, -50] },
              ]}
            >
              <div className="texty-demo-footer">
                <Texty>NHANH LÊN! </Texty>
              </div>
              <div className="texty-title-footer">
                <p>
                  Tham Dự Buổi <strong>Ra Mắt Galaxy S24</strong>
                </p>
                <p
                  style={{
                    fontSize: "18px",
                    fontStyle: "italic",
                    marginTop: "-2em",
                  }}
                >
                  Vào ngày 17/1/2024 - tại San Francisco, Mỹ.
                </p>
              </div>
              <Row
                justify="center"
                style={{ marginBottom: 100, fill: "#FFFFFF" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="71px"
                  height="11px"
                >
                  {" "}
                  <path
                    fill-rule="evenodd"
                    d="M59.669,10.710 L49.164,3.306 L39.428,10.681 L29.714,3.322 L20.006,10.682 L10.295,3.322 L1.185,10.228 L-0.010,8.578 L10.295,0.765 L20.006,8.125 L29.714,0.765 L39.428,8.125 L49.122,0.781 L59.680,8.223 L69.858,1.192 L70.982,2.895 L59.669,10.710 Z"
                  ></path>
                </svg>
              </Row>
              <Row justify="center">
                <a href="/event" class="footer-button" role="button">
                  <span>ĐĂNG KÝ NGAY</span>
                </a>
              </Row>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
      <BackTop style={{ textAlign: "right" }} />
    </Spin>
  );
};

export default Home;
