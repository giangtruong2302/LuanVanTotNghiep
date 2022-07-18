import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import Masonry from "react-masonry-component";

import { ArrowLeft, XCircle } from "phosphor-react";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../component/StaggerAnimation";
// import SearchPT from "./SearchPT/searchPT";
import { Gear, Plus, SquaresFour } from "phosphor-react";
import { Action, Fab } from "react-tiny-fab";
import { isVisible } from "@testing-library/user-event/dist/utils";
// import CreateAccount from "./ModalManager/modalAddManager";
import CreateAccount from "./ModalAccount/modalAddBlog";
// import ListStaff from "./ListStaff/listStaff";
import { PageHeader, Input, Row, Col, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import handleGetAllBlog from "./BlogAPI";
import { handleDeleteBlog } from "./ModalAccount/ModalAccountAPI";
import UpdateBlog from "./ModalAccount/modalUpdateAccount";
import { ExclamationCircleOutlined } from "@ant-design/icons";
// import ListAccount from "./ListManager/listAccount";
// import ListManager from "./ListManager/listManager";
const { Search } = Input;
const { confirm } = Modal;
const Blog = () => {
  const navigate = useNavigate();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [dataBlog, setDataBlog] = useState();
  const [page, setPage] = useState(2);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [dataDetailBlog, setDataDetailBlog] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [status, setStatus] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const handleShowModalAdd = (isVisible) => {
    setShowModalAdd(isVisible);
  };
  function confirmDelete(id) {
    confirm({
      title: `Do you want to delete ${
        // props.data.firstName + " " + props.data.lastName
        ""
      }`,
      icon: <ExclamationCircleOutlined />,
      centered: true,
      // content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk() {
        // return console.log("check id: ", id);
        return handleDeleteBlog(id)
          .then((res) => {
            message.success("Success");
            // props.colDef.action.action1("delete" + Date.now());
            setStatus("complete" + Date.now());
          })
          .catch(() => {
            message.error("Failure");
          });
      },
      onCancel() {
        ("");
      },
    });
  }
  const showModalAddAcc = () => {
    setShowModalAdd(true);
    // alert("aa");
  };
  const handleShowModalUpdate = (isVisible) => {
    setShowModalUpdate(isVisible);
  };
  const takeStatus = (value) => {
    setStatus(value);
  };
  const deleteBlog = (id) => {
    console.log("check id blog ", id);
    try {
      handleDeleteBlog(id)
        .then((res) => {
          message.success("delete nlog is success");
          setStatus("delete" + Date.now());
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateBlog = (data) => {
    setDataDetailBlog(data);
    setShowModalUpdate(true);
  };
  useEffect(() => {
    try {
      handleGetAllBlog(1)
        .then((res) => {
          // console.log("check blogs ", res.blog);
          setDataBlog(res.blog.rows);
          for (let i = 2; i <= res.totalPage; i++) {
            handleGetAllBlog(i)
              .then((res) => {
                if (res.blog) {
                  const data = res.blog.rows;
                  setDataBlog((prev) => {
                    if (prev !== undefined) return [...prev, ...data];
                  });
                }
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, [status]);
  const fetchNextPageService = async () => {
    handleGetAllBlog(page)
      .then((response) => {
        const data = response.blog.rows;
        if (data && data.length > 0) {
          console.log(response);
          setDataBlog((prev) => {
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
  // console.log("check data blog: ", dataBlog);
  const onSearchCus = (value) => {
    // console.log("check search value: ", value);
    setSearchValue(value);
  };
  return (
    <div className={classes.BlogProfileBg}>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate("/admin")}
        subTitle="Back to dashboard center"
        style={{
          top: 0,
          position: "sticky",
          zIndex: "9",
          background:
            "linear-gradient(305.38deg, #fff -50.47%, #f2edf0 94.82%)",
          color: "#fff",
          fontWeight: "600",
        }}
        extra={
          <Search
            style={{ borderRadius: "8px !important" }}
            placeholder="search reservation of center"
            // loading
            onSearch={onSearchCus}
            enterButton
          />
        }
      />
      <div className={classes.listItem}>
        <Row className={classes.contentItems}>
          <Masonry style={{ width: "100%", padding: "10px" }}>
            {dataBlog &&
              dataBlog.length > 0 &&
              dataBlog.map((item, index) => {
                return (
                  <Col span={5} className={classes.item} key={index}>
                    <span className={classes.xCircle}>
                      <XCircle
                        size={22}
                        weight="fill"
                        color="#fff"
                        onClick={() => confirmDelete(item.id)}
                      />
                    </span>
                    <div className={classes.titleContent}>{item.Title}</div>
                    <div className={classes.imageBlog}>
                      <img src={item.BlogImage ? item.BlogImage : ""} />
                    </div>
                    <div className={classes.contentReview}>{item.Content}</div>

                    <button
                      className={classes.btnUpdateBlog}
                      onClick={() => handleUpdateBlog(item)}
                    >
                      Update
                    </button>
                    <div></div>
                    {/* <button className={classes.btnSeeDetail}>Detail</button> */}
                  </Col>
                );
              })}
          </Masonry>
        </Row>
      </div>
      <Fab
        mainButtonStyles={{ backgroundColor: "#1363DF" }}
        icon={<SquaresFour size={24} color="#Ffff" weight="fill" />}
        alwaysShowTitle={true}
      >
        <Action
          style={{ backgroundColor: "#1363DF" }}
          onClick={showModalAddAcc}
        >
          <Plus size={20} color="#Ffff" weight="fill" />
        </Action>
      </Fab>
      {showModalAdd && (
        <CreateAccount
          showModal={showModalAdd}
          handleModal={handleShowModalAdd}
          takeStatus={takeStatus}
        />
      )}
      {showModalUpdate && (
        <UpdateBlog
          showModal={showModalUpdate}
          handleModal={handleShowModalUpdate}
          data={dataDetailBlog}
          takeStatus={takeStatus}
        />
      )}
    </div>
  );
};
export default Blog;
