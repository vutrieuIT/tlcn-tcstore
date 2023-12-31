import React, { useState, useEffect } from "react";
import "./dashBoard.css";
import {
  Col,
  Row,
  Spin,
  Card,
  BackTop,
  Breadcrumb,
} from "antd";
import {
  DashboardOutlined,
  HomeOutlined,
  ShopTwoTone,
  ContactsTwoTone,
  HddTwoTone,
  ShoppingTwoTone,
} from "@ant-design/icons";
import statisticApi from "../../apis/statistic";

const DashBoard = () => {
  const [statisticList, setStatisticList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        await statisticApi.getTotal().then((res) => {
          console.log(res);
          setStatisticList(res.data);
        });
      } catch (error) {
        console.log("Failed to fetch event list:" + error);
      }
    })();
  }, []);
  return (
    <div>
      <Spin spinning={false}>
        <div className="container">
          <div style={{ marginTop: 20 }}>
            <Breadcrumb>
              <Breadcrumb.Item href="">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="">
                <DashboardOutlined />
                <span>DashBoard</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Row gutter={12} style={{ marginTop: 20 }}>
            <Col span={6}>
              <Card className="card_total" bordered={false}>
                <div className="card_number">
                  <div>
                    <div className="number_total">
                      {statisticList.userTotal}
                    </div>
                    <div className="title_total">Số thành viên</div>
                  </div>
                  <div>
                    <ContactsTwoTone style={{ fontSize: 48 }} />
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card className="card_total" bordered={false}>
                <div className="card_number">
                  <div>
                    <div className="number_total">
                      {statisticList.productTotal}
                    </div>
                    <div className="title_total">Số sản phẩm</div>
                  </div>
                  <div>
                    <ShopTwoTone style={{ fontSize: 48 }} />
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card className="card_total" bordered={false}>
                <div className="card_number">
                  <div>
                    <div className="number_total">
                      {statisticList.categoryTotal}
                    </div>
                    <div className="title_total">Số danh mục</div>
                  </div>
                  <div>
                    <HddTwoTone style={{ fontSize: 48 }} />
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card className="card_total" bordered={false}>
                <div className="card_number">
                  <div>
                    <div className="number_total">
                      {statisticList.orderTotal}
                    </div>
                    <div className="title_total">Số đặt hàng</div>
                  </div>
                  <div>
                    <ShoppingTwoTone style={{ fontSize: 48 }} />
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
        <BackTop style={{ textAlign: "right" }} />
      </Spin>
    </div>
  );
};

export default DashBoard;
