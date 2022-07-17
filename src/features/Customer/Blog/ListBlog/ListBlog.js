import React, { useState, useEffect } from "react";
import "./ListBlog.scss"
import { Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { Link } from "react-router-dom";

import { getAllBlog } from "../BlogAPI";
const ListBlog = (props) => {
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(2);
    const [allBlog, setAllBlog] = useState();
    const [noBlog, setNoBlog] = useState(false);
    const [, setBlogLoading] = useState(true);

    useEffect(() => {
        if (props.searchValue != "") {
            // getAllBlog(props.searchValue).then((response) => {

            //     if (response.blog.length > 0) {
            //         setAllBlog(response.blog);
            //         setNoBlog(false);
            //     } else {
            //         setNoBlog(true);
            //     }
            // })
            //     .catch(() => {
            //         setNoBlog(true);
            //     })
            //     .finally(() => {
            //         setBlogLoading(false);
            //     });
        }
        else {
            getAllBlog("1").then((response) => {

                if (response.blog.rows.length > 0) {
                    setAllBlog(response.blog.rows);
                    setNoBlog(false);
                } else {
                    setNoBlog(true);
                }
            })
                .catch(() => {
                    setNoBlog(true);
                })
                .finally(() => {
                    setBlogLoading(false);
                });
        }
    }, [props.searchValue]);


    const fetchNextPageCenter = async () => {
        getAllBlog(page)
            .then((response) => {
                const { data } = response.blog.rows;
                if (data && data.length > 0) {
                    setAllBlog((prev) => {
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
            {noBlog ? (
                <div className="noData">
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 60,
                        }}
                        description={"No Data"}
                    />
                </div>
            ) : (
                <div className="listBlogContent">
                    <InfiniteScroll className="scrollBlog"
                        dataLength={getAllBlog?.length ? getAllBlog.length : 0}

                        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                        loader={
                            <div className={"loading"}>
                                <StaggerAnimation />
                            </div>
                        }
                        hasMore={hasMore}
                        next={fetchNextPageCenter}
                    >
                        {allBlog?.map((item, index) => {
                            return (
                                <div>
                                    <Link to={`/blog-detail/${item.id}`} className="Blog">
                                        <div className="BlogInfo">
                                            <div className="infoBlog">
                                                <img
                                                    className="BlogImg"
                                                    src={item.BlogImage}
                                                    style={{
                                                        borderRadius: "6px",
                                                        width: "220px",
                                                        height: "130px",
                                                        flex: "none",
                                                        order: 0,
                                                        flexGrow: 0,
                                                    }}
                                                />
                                                <div className="blogContent">
                                                    <p className="textNameBlog">{item.Title}</p>
                                                    <div className="content">{item.Content}</div>
                                                    <div className="readmore">Xem chi tiết</div>
                                                </div>
                                            </div>
                                            <div className="detailInfoBlog">
                                                <div className="addressCenter">{item.CenterAddress}</div>
                                                <span className="lineDetailInfoCenter"></span>

                                            </div>
                                        </div>
                                    </Link>

                                </div>
                            );
                        })}

                    </InfiniteScroll>

                </div>
            )}
        </>
    );
};
export default ListBlog;
