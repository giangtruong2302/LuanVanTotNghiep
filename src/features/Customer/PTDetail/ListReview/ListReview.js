import { Avatar, Divider, List, Skeleton, Rate, Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import { getReviewOfPt } from './ListReviewAPI';
import { useParams } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import InfiniteScroll from "react-infinite-scroll-component";
import "./ListReview.scss"
import CusReview from './CusReview';
const ListReview = (props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [allReview, setAllReview] = useState();
    const [noReview, setNoReview] = useState(false);
    const [, setReviewLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(2);
    const id = useParams();
    console.log("center", props.centerId)
    useEffect(() => {
        getReviewOfPt(id.id, 1)
            .then((response) => {


                if (response.reviewOfPT.rows.length > 0) {
                    setAllReview(response.reviewOfPT.rows);
                    setNoReview(false);
                } else {
                    setNoReview(true);
                }
            })
            .catch(() => {
                setAllReview(true);
            })
            .finally(() => {
                setReviewLoading(false);
            });
    }, [props.status]);
    const fetchNextReview = async () => {
        getReviewOfPt(id.id, page)
            .then((response) => {
                const data = response.reviewOfPT.rows;
                if (data && data.length > 0) {
                    setAllReview((prev) => {
                        if (prev !== undefined) return [...prev, ...data];
                    });
                    if (data.length === 0 || data.length < 10) {
                        setHasMore(false);
                    }
                    setPage(page + 1);
                }
            })
            .catch(() => {
                // setFlag(true);
                setHasMore(false);
            })
            .finally(() => {
                // setFlag(true);
                console.log("success");
                // setHasMore(false)
            });
    };
    return (
        <>
            <div className='ReviewContainer '>

                <div
                    id="scrollableDiv"
                    style={{
                        height: 200,
                        overflow: 'auto',
                        padding: '0 16px',
                        border: '1px solid rgba(140, 140, 140, 0.35)',
                        marginBottom: '30px',
                    }}
                >
                    <InfiniteScroll
                        dataLength={allReview?.length ? allReview?.length : 0}
                        next={fetchNextReview}
                        hasMore={hasMore}

                        scrollableTarget="scrollableDiv"
                    >
                        <List
                            dataSource={allReview}
                            renderItem={allReview ? item => (
                                ((item.Status) === 1 ?
                                    <List.Item className='contentReview'>

                                        <div className='CusName'><CusReview cusId={item.CustomerId} /> <div className='CusReview'>{item.reviewContent}</div></div>

                                        <div className='rateReview'>  <Rate disabled value={item.ratingPoint} /></div>

                                    </List.Item>
                                    :
                                    ""
                                )

                            ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                        />
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
};

export default ListReview;