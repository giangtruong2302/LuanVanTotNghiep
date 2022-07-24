import React, { useState, useEffect } from "react";
import { getDetailCus } from "./ListReviewAPI";
import "./ListReview.scss";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
const CusReview = (props) => {
    const [detailCus, setDetailCus] = useState();
    const [noDetailCus, setNoDetailCus] = useState(false);
    const [, setDetailCusLoading] = useState(true);


    useEffect(() => {
        getDetailCus(props.cusId)
            .then((response) => {


                if (response.cusDetail) {
                    setDetailCus(response.cusDetail);
                    setNoDetailCus(false);
                } else {
                    setNoDetailCus(true);
                }
            })
            .catch(() => {
                setDetailCus(true);
            })
            .finally(() => {
                setDetailCusLoading(false);
            });
    }, []);
    return (
        <div>
            {detailCus?.CustomerImage === ""
                ?
                <Avatar className="imgCusReview" icon={<UserOutlined />} />
                :
                <img src={detailCus?.CustomerImage} className="imgCusReview" />
            }

            {detailCus?.CustomerName}


        </div>
    )
}
export default CusReview