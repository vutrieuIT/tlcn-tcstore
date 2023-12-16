import React, { useState } from "react";
import "./ReviewForm.css"; // Import file CSS cho styling

const ReviewForm = ({ onSubmit }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ comment, rating });
    setComment("");
    setRating(0);
  };

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          const starValue = index + 1;
          return (
            <span
              key={index}
              className={starValue <= rating ? "star-filled" : "star-empty"}
              onClick={() => handleStarClick(starValue)}
            >
              ★
            </span>
          );
        })}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Nhập đánh giá của bạn..."
        rows="4"
        cols="50"
      ></textarea>
      <button type="submit">Gửi Đánh Giá</button>
    </form>
  );
};

export default ReviewForm;
