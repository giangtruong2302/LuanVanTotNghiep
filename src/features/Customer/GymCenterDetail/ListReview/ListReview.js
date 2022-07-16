import { Avatar, Divider, List, Skeleton, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { getReview } from './ListReviewAPI';
import { useParams } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import "./ListReview.scss"
import CusReview from './CusReview';
const ListReview = (props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [allReview, setAllReview] = useState();
    const [noReview, setNoReview] = useState(false);
    const [, setReviewLoading] = useState(true);
    const id = useParams();
    console.log("center", props.centerId)
    useEffect(() => {
        getReview(id.id, 1)
            .then((response) => {


                if (response.reviewOfCenter.rows.length > 0) {
                    setAllReview(response.reviewOfCenter.rows);
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
    }, []);

    return (
        <>

            <div
                className='ReviewContainer'
                style={{
                    marginLeft: 90,
                    marginTop: 63,
                    width: 650,
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}>

                <List
                    itemLayout="horizontal"
                    dataSource={allReview}


                    renderItem={item => (
                        ((item.Status) === 1 ?
                            <List.Item className='contentReview'>

                                <div className='CusName'><CusReview cusId={item.CustomerId} /> <div className='CusReview'>{item.reviewContent}</div></div>

                                <div className='rateReview'>  <Rate disabled value={item.ratingPoint} /></div>

                            </List.Item>
                            :
                            ""
                        )

                    )}
                />

            </div>
        </>
    );
};

export default ListReview;