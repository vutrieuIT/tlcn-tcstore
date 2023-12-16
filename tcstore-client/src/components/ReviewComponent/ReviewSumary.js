import React from "react";
import { Row, Col, Progress, Rate } from "antd"; // Import các component từ Ant Design

const ReviewSummary = ({ reviews }) => {
  const calculateAverageRating = () => {
    // Tính điểm trung bình từ các đánh giá
    const totalRatings = reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    return Number((totalRatings / reviews.length).toFixed(1)); // Làm tròn điểm trung bình đến 1 chữ số thập phân
  };

  const countRatings = (rating) => {
    // Đếm số lượng đánh giá với mỗi rating
    return reviews.filter((review) => review.rating === rating).length;
  };

  const roundRating = (rating) => {
    const res = Math.round(rating);
    console.log("round", res, typeof res);
    return res;
  };

  return (
    <Row gutter={12}>
      <Col span={8}>
        <div className="comment_total">
          <p className="title">{calculateAverageRating()}/5</p>
          <Rate
            disabled
            allowHalf
            defaultValue={roundRating(calculateAverageRating())}
          />
          <p>
            <strong>{reviews.length}</strong> đánh giá
          </p>
        </div>
      </Col>
      <Col span={16}>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="progress_comment">
            <div className="is-active">
              <div>{rating}</div>
              <div>
                <svg
                  height="15"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"></path>
                </svg>
              </div>
            </div>
            <Progress
              className="progress"
              percent={(countRatings(rating) / reviews.length) * 100}
            />
          </div>
        ))}
      </Col>
    </Row>
  );
};

export default ReviewSummary;
