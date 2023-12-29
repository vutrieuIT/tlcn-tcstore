import React from "react";
import { Card, Badge, Rate } from "antd";

const ProductItem = ({ item, handleReadMore }) => {
  const HOST_URL = process.env.REACT_APP_HOST_URL;
  const renderProduct = () => {
    if (item.promotion !== 0) {
      return (
        <Badge.Ribbon text="Giảm giá" color="red">
          <Card
            className="card_product"
            onClick={() => handleReadMore(item._id)}
          >
            <Card
              className="card_product"
              onClick={() => handleReadMore(item._id)}
            >
              <img
                style={{ width: "100%", height: 180 }}
                src={item.image?.replace("http://localhost:3100", HOST_URL)}
                alt=""
              ></img>
              <div className="title_product">{item.name}</div>
              <div className="price_group">
                <div className="price_product">
                  {item.promotion.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
                <div className="promotion_product">
                  {item.price.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
              <div className="support_product">
                Thu cũ máy cũ - Giá thu cao nhất - Tặng thêm 1 triệu khi đổi máy
                cũ
              </div>
              <Rate className="rate_product" allowHalf defaultValue={5} />
            </Card>
          </Card>
        </Badge.Ribbon>
      );
    } else {
      return (
        <Card className="card_product" onClick={() => handleReadMore(item._id)}>
          <Card
            className="card_product"
            onClick={() => handleReadMore(item._id)}
          >
            <img
              style={{ width: "100%", height: 180 }}
              src={item.image?.replace("http://localhost:3100", HOST_URL)}
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
            </div>
            <div className="support_product">
              Thu cũ máy cũ - Giá thu cao nhất - Tặng thêm 1 triệu khi đổi máy
              cũ
            </div>
            <Rate className="rate_product" allowHalf defaultValue={5} />
          </Card>
        </Card>
      );
    }
  };

  return <>{renderProduct()}</>;
};

export default ProductItem;
