import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IOIcon from "react-icons/io";
import { Link, Redirect } from "react-router-dom";
import "./Slidebar.scss";
import { IconContext } from "react-icons";
import * as routes from "./../../contants/index";
import { useHistory } from "react-router-dom";
import TrendingUp from '@mui/icons-material/TrendingUp';
// import WebSocket from 'ws';

function Slidebar(props) {
  // const client =  new WebSocket('ws://localhost:8081').client;
  let history = useHistory();
  const [token, setToken] = useState([]);
  const [isShow, setIsShow] = useState(false);
  function showSidebar() {
    onClickShowSlider(sidebar);
  }
  const { sidebar } = props;
  const { onClickShowSlider } = props;

  useEffect(() => {
    const stemp = localStorage.getItem("notify");
    if (stemp) {
      setToken(JSON.parse(stemp));
    }
  }, []);

  // useEffect(() => {
  //   client.onopen = () => {};
  //   get();
  // });

  // async function get() {
  //   client.onmessage = (message) => {
  //     const dataFromServer = JSON.parse(message.data);
  //     if (dataFromServer.type === "messages") {
  //       const token = localStorage.getItem("notify");
  //       let stemp = [];
  //       if (token) {
  //         stemp = JSON.parse(token);
  //         stemp.push(dataFromServer.msg);
  //         localStorage.removeItem("notify");
  //         localStorage.setItem("notify", JSON.stringify(stemp));
  //         setToken(stemp);
  //       } else {
  //         stemp.push(dataFromServer.msg);
  //         localStorage.removeItem("notify");
  //         localStorage.setItem("notify", JSON.stringify(stemp));
  //         setToken(stemp);
  //       }
  //     }
  //   };
  // }
  function logOut() {
    localStorage.removeItem("token");
    return (
      <Redirect
        to={{
          pathname: "/dangnhap",
          state: { from: props.location },
        }}
      ></Redirect>
    );
  }

  function handleXem(id) {
    let stemp = JSON.parse(localStorage.getItem("notify"));
    let stemps = -1;
    stemp.map((item, index) => {
      if (item.id === id) {
        stemps = index;
      }
    });
    if (stemps !== -1) {
      stemp.splice(stemps, 1);
      localStorage.setItem("notify", JSON.stringify(stemp));
      setToken(stemp);
      history.push(`/xemdonhang/id=${id}`);
      setIsShow(false);
    }
  }
  return (
    <IconContext.Provider className="navbar-slide" value={{ color: "#fff" }}>
      <div className="navbar">
        <div className="navbar-base d-flex justify-content-end">
          {/* <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link> */}
          <div className="menu-bars-right d-flex">
            <div className="cart-product">
              <div className="cart-poduct-sl">{token.length}</div>
              <IOIcon.IoMdNotifications
                onClick={() => setIsShow(!isShow)}
                className="icons-navbar cart-product__icon"
              ></IOIcon.IoMdNotifications>
              <div
                className={
                  isShow === false ? "notify-menu block-notify" : "notify-menu"
                }
              >
                <div className="title-notify">Thông báo</div>
                {token.length > 0 ? (
                  token.map((item) => {
                    return (
                      <div
                        key={`notify-${item.id}`}
                        onClick={() => handleXem(item.id)}
                      >{`Có một đơn hàng mới Mã đơn hàng: ${item.id}`}</div>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <Link onClick={logOut} to="#">
              <FaIcons.FaUserLock className="icons-navbar"></FaIcons.FaUserLock>
            </Link>
          </div>
        </div>
      </div>
      <nav className={'nav-menu active'}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {routes.ROUTES.map((item, index) => {
            if(item.name !== "Thống kê")
            return (
              
                <li key={index} className="row">
                <Link to={item.path}>
                  <div id="icon">  {item.name !== "Thống kê" ? (
                    <div id="title"> {item.icon} </div>
                  ) : null}</div>
                  {item.name !== "Thống kê" ? (
                    <div id="title"> {item.name} </div>
                  ) : null}
                </Link>
              </li>
              
            );
          })}
          <li className="row">
            <div>
              <Link id="title" className="text-lefts" to="#"><TrendingUp className="mx-2"></TrendingUp>Thống kê</Link>
              <div className="ml-3">
              <Link id="title" className="dropdown-item text-lefts" to="/ThongKe">
                  Các sản phẩm bán chạy
                </Link>
                <Link id="title" className="dropdown-item text-lefts" to="/DoanhThu">
                  Thống kê doanh thu
                </Link>
                <Link id="title" className="dropdown-item text-lefts" to="/TonKho">
                  Tồn kho
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

Slidebar.propTypes = {};

export default Slidebar;
