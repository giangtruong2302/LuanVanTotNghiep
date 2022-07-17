import React, { useState, useEffect } from "react";
import { List, Avatar, Space, Select } from "antd";
import { getPtDetail } from "./listPTServiceAPI";
const ListItem = (props) => {
    const [ptDetail, setptDetail] = useState();
    const [noptDetail, setNoptDetail] = useState();
    const [, setptDetailLoading] = useState();
    useEffect(() => {

        getPtDetail(props.data.StaffId).then((response) => {
            if (response.staffDetail) {
                setptDetail(response.staffDetail);
                setNoptDetail(false);
            } else {
                setNoptDetail(true);
            }
        })
            .catch(() => {
                setNoptDetail(true);
            })
            .finally(() => {
                setptDetailLoading(false);
            });



    }, []);
    return (
        <List.Item.Meta
            avatar={<Avatar src={ptDetail?.StaffImage} />}
            title={<a>{ptDetail?.StaffName}</a>}
            description={"Email: " + ptDetail?.StaffEmail}

        />
    )
}
export default ListItem