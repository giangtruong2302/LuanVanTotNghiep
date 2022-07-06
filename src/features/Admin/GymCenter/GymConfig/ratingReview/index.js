import React from "react";
import "./ratingReview.scss";
import { Star } from "phosphor-react";
import { UIEvent, useEffect, useState } from "react";
import Masonry from "react-masonry-component";
import ReviewItemCard from "./reviewItem/ReviewItemCard";

const RatingReview = () => {
  // const handleUIEvent = (e) => {
  //   const current = e.currentTarget ;
  //   if (current.scrollTop + current.clientHeight + 1 >= current.scrollHeight) {
  //     if (hasMore) {
  //       setLoadingMore(true);
  //       //fetchNextReviewList();
  //     }
  //   }
  // };
  return (
    <div className="ratingAndReviewContainer" id="scrollableDiv">
      <div className="title">Rating & Reviews</div>
      <div className="ratingContainer">
        <Star color="#ffc833" weight="fill" />
        4.0 (500+)
      </div>
      <div className="container">
        <Masonry className="reviewContainer">
          <ReviewItemCard />
          <ReviewItemCard />
          <ReviewItemCard />
          <ReviewItemCard />
          <ReviewItemCard />
          <ReviewItemCard />
        </Masonry>
        {/* {loadingMore ? (
        <div className={classes.loadingContainer}>
          <StaggerAnimation />
        </div>
      ) : (
        ""
      )} */}
      </div>
    </div>
  );
};
export default RatingReview;
