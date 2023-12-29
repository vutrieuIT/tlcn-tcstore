import React from "react";
import "./ReviewItem.css"; // Import file CSS cho styling

const ReviewItem = ({ item }) => {
    const HOST_URL = process.env.REACT_APP_HOST_URL;
  const getStarIcons = (starCount) => {
    // Tạo biểu tượng sao dựa trên starCount
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(
        <span key={i} className="star-icon">
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="review-item">
      <div className="review-header">
        <img
          src={item.user?.image?.replace(
            "http://localhost:3100",
            HOST_URL
          )}
          alt="Avatar"
          className="avatar"
        />
        <div className="review-info">
          <span className="review-name">{item.user?.username}</span>
          <span className="review-id" hidden={true}>
            ID: {item.id}
          </span>
        </div>
      </div>
      <div className="star-rating">{getStarIcons(item.rating)}</div>
      <div className="review-text">{item.comment}</div>
    </div>
  );
};

export default ReviewItem;
