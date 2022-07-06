import { useSelector } from "react-redux";
import AppLoader from "../../../../component/AppLoader";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { Star } from "phosphor-react";
import React, { UIEvent, useCallback, useEffect, useState } from "react";
import Masonry from "react-masonry-component";
// import { getRatingAndReview } from "./ratingAndReviewAPI";
// import { RatingAndReviewResponseType } from "./ratingAndReviewModel";
// import ReviewItem from "./ReviewItem/reviewItem";
import classes from "./styles.module.scss";
import ReviewItem from "./ReviewItem/reviewItem";

const RatingAndReview = () => {
  // const currentSalon = useSelector((state) => state.currentSalon.salonId);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [reviewList, setReviewList] = useState(["data"]);
  const [loading, setLoading] = useState(true);
  const [justOne, setJustOne] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [_noReviewData, setNoReviewData] = useState(false);
  const [_error, setError] = useState(false);
  // const [isScrolling,setIsScrolling] = useState(true);
  const scrollDivRef = useCallback(async (node) => {
    if (node instanceof HTMLDivElement) {
      // console.log("clientHeight", node.clientHeight);
      // console.log("scrollHeight", node.scrollHeight);
      if (node.clientHeight === node.scrollHeight) {
        if (hasMore) {
          callApiGetRatingAndReview(2);
          setPage(page + 1);
        }
      }
    }
  }, []);

  const callApiGetRatingAndReview = (page) => {
    console.log(page);
  };
  // useEffect(() => {
  //   getRatingAndReview(1, currentSalon)
  //     .then((res) => {
  //       const { data } = res;
  //       if (data.data.length > 0) {
  //         setReviewList(data.data);
  //         setError(false);
  //         setNoReviewData(false);
  //         if (data.nextPage === null) {
  //           setHasMore(false);
  //         }
  //       } else {
  //         setNoReviewData(true);
  //         setHasMore(false);
  //       }
  //     })
  //     .catch(() => {
  //       setError(true);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [currentSalon]);
  const fetchNextReviewList = useCallback((page) => {
    setJustOne(false);
    // getRatingAndReview(page, currentSalon)
    //   .then((res) => {
    //     const { data } = res;
    //     if (data.data.length > 0) {
    //       setReviewList((prev) => [...prev, ...data.data]);
    //       if (data.nextPage === null) {
    //         setHasMore(false);
    //       }
    //       setError(false);
    //       setNoReviewData(false);
    //     } else {
    //       setNoReviewData(true);
    //       setHasMore(false);
    //     }
    //   })
    //   .catch(() => {
    //     setError(true);
    //   })
    //   .finally(() => {
    //     setLoadingMore(false);
    //     setJustOne(true);
    //   });
  }, []);
  // console.log(hasMore && justOne);
  // console.log(hasMore);
  const handleUIEvent = (e) => {
    const current = e.currentTarget;
    if (current.scrollTop + current.clientHeight + 1 >= current.scrollHeight) {
      if (hasMore && justOne) {
        setLoadingMore(true);
        setPage(page + 1);
        fetchNextReviewList(page);
      }
    }
  };

  return (
    <>
      <div className={classes.ratingAndReviewContainer} id="scrollableDiv">
        <div className={classes.title}>Rating & Reviews</div>
        <div className={classes.ratingContainer}>
          <Star color="#ffc833" weight="fill" />
          4.0 (500+)
        </div>
        <div
          className={classes.container}
          onScroll={handleUIEvent}
          ref={scrollDivRef}
        >
          <Masonry className={classes.reviewContainer}>
            <ReviewItem reviewItem={"item"} salonId={1} key={1} />

            <ReviewItem reviewItem={"item"} salonId={1} key={2} />
            <ReviewItem reviewItem={"item"} salonId={1} key={3} />
            <ReviewItem reviewItem={"item"} salonId={1} key={4} />
            <ReviewItem reviewItem={"item"} salonId={1} key={5} />
            <ReviewItem reviewItem={"item"} salonId={1} key={6} />
            <ReviewItem reviewItem={"item"} salonId={1} key={7} />
            <ReviewItem reviewItem={"item"} salonId={1} key={8} />
            <ReviewItem reviewItem={"item"} salonId={1} key={9} />
            <ReviewItem reviewItem={"item"} salonId={1} key={10} />
            {/* {reviewList.map((item, index) => {
                return (
                  <ReviewItem
                    reviewItem={item}
                    salonId={currentSalon}
                    key={index}
                  />
                );
              })} */}
          </Masonry>
        </div>
        {loadingMore ? (
          <div className={classes.loadingContainer}>
            <StaggerAnimation />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default RatingAndReview;
