import React, { useState, useEffect } from "react";
import "./index.scss";
import * as api from "../../../api/dat_hang";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Pagination from "react-js-pagination";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from "../../../actions/modal";
// import * as actionKH from "../../../actions/khachhang";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

function DonHang(props) {
  const history = useHistory();
  const { modalAtionCrearotors } = props;
  const { showModal, changeModalContent, changeModalTitle } =
    modalAtionCrearotors;

  const [dataPage, setDataPage] = useState({
    offset: 0,
    trang_thai: "ALL",
  });
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [allPage, setAllPage] = useState(0);
  const { trang_thai } = dataPage;

  const [dataTam, setDataTam] = useState({});
  const [show, setShow] = useState(false);
  const [nd, setNd] = useState("");

  const [search, setSearch] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  function closeDidalog() {
    setShow(false);
  }

  useEffect(() => {
    if (props.match.params) {
      function fetchPostsLists() {
        if (props.match.params.page && !props.match.params.trang_thai) {
          let pageN = 0;
          let pageNumber = parseInt(props.match.params.page);
          if (pageNumber === 1) {
            pageN = 0;
          } else {
            pageN = pageNumber * 6 - 6;
          }
          setActivePage(parseInt(props.match.params.page));

          api.pageDonHang({ offset: pageN }).then((res) => {
            if (res.status === 200) {
              setData(res.data.data);
              api.getList().then((resP) => {
                if (resP.status === 200) {
                  setAllPage(resP.data.data.length);
                }
              });
            }
          });
        } else if (
          props.match.params.trang_thai &&
          props.match.params.trang_thai !== "ALL"
        ) {
          setActivePage(parseInt(props.match.params.page));
          let pageN = 0;
          let pageNumber = parseInt(props.match.params.page);
          setDataPage({
            offset: pageN,
            trang_thai: props.match.params.trang_thai,
          });

          if (pageNumber === 1) {
            pageN = 0;
          } else {
            pageN = pageNumber * 2 - 2;
          }
          api
            .pageDonHang({
              offset: pageN,
              trang_thai: props.match.params.trang_thai,
            })
            .then((res) => {
              if (res.status === 200) {
                setData(res.data.data);
                api
                  .pageSearchDonHang({
                    offset: pageN,
                    trang_thai: props.match.params.trang_thai,
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      setAllPage(res.data.data.length);
                    }
                  });
              }
            });
        } else {
          let pageN = 0;
          if(props.match.params.page){
            let pageNumber = parseInt(props.match.params.page);
            setDataPage({
              offset: pageN,
            });
  
            if (pageNumber === 1) {
              pageN = 0;
            } else {
              pageN = pageNumber * 2 - 2;
            }
          }
         
          api.pageDonHang({ offset: pageN }).then((res) => {
            if (res.status === 200) {
              setData(res.data.data);
              api.getList().then((resP) => {
                if (resP.status === 200) {
                  setAllPage(resP.data.data.length);
                }
              });
            }
          });
        }
      }

      fetchPostsLists();
    }
    return () => {
      setData([]);
    };
  }, [props.match.params]);

  function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
    if (props.match.params.trang_thai) {
      history.push(
        `/donhang/trang_thai=${props.match.params.trang_thai}&&page=${pageNumber}`
      );
    } else {
      history.push(`/donhang/page=${pageNumber}`);
    }
  }

  function onchangeSelect(e) {
    e.persist();
    setDataPage((dataPage) => ({ ...dataPage, trang_thai: e.target.value }));
    history.push(`/donhang/trang_thai=${e.target.value}&&page=${1}`);
  }

  function handlePageChangeSearch(e) {
    e.persist();
    setSearch(e.target.value);
  }

  useEffect(() => {
    let delayDebounceFn = null;
    if (search !== "") {
      delayDebounceFn = setTimeout(() => {
        const d = { id: parseInt(search) };
        api
          .pageSearchByID(d)
          .then((response) => {
            if (response.status === 200) {
              if (response.data.data.length > 0) {
                setData(response.data.data);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }, 1000);
    }
    // if (search === "") {
    //   history.push(`/DonHang`);
    // }
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="donhang">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>{nd}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeDidalog}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="donhang-content">
        <div className="search_reservation">
          <div className="search_RVT d-flex justify-content-between">
            <div className="form-group">
              <label className="title_TT">Tình trạng : </label>
              <select
                onChange={(e) => onchangeSelect(e)}
                className="custom-select-product"
                id="category"
                value={trang_thai}
              >
                <option value="ALL">ALL</option>
                <option value={0}>Đặt hàng</option>
                <option value={1}>Xác nhận</option>
                <option value={2}>Hoàn thành</option>
                <option value={3}>Hủy</option>
              </select>
            </div>
            <div className="d-flex">
              <label className="title_TT">Tìm kiếm : </label>
              <input
                placeholder="Nhập mã đơn hàng cần tìm"
                className="custom-select-product"
                type="text"
                value={search}
                onChange={handlePageChangeSearch}
              />
            </div>
          </div>
        </div>
        <div className="list-donhang">
          <div className="listusers">
            <Table striped bordered hover   className="table_type">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Tên Người nhận</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Thời gian đặt hàng</th>
                  {/* <th scope="col">Tình trạng</th> */}
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          {item.trang_thai !== "HUY" ? (
                            <Link
                              className="xem-donhang"
                              to={`/xemdonhang/id=${item.id}`}
                            >
                              {item.ten_nguoi_nhan}
                            </Link>
                          ) : (
                            item.ten_nguoi_nhan
                          )}
                        </td>
                        <td>{item.sdt_nguoi_nhan}</td>
                        <td>{item.dia_chi_nguoi_nhan}</td>
                        <td>
                          {moment(item.thoi_gian_dat)
                            .utc()
                            .format("DD-MM-YYYY")}
                        </td>

                        {/* <td>{item.trang_thai}</td> */}
                      </tr>
                    );
                  })
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="pagination">
         {search === '' ? <Pagination
            prevPageText="prev"
            nextPageText="next"
            activePage={activePage}
            itemsCountPerPage={6}
            totalItemsCount={allPage}
            pageRangeDisplayed={6}
            onChange={handlePageChange}
          />:<></>}
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    // khachhangCreator: bindActionCreators(actionKH, dispatch),
    modalAtionCrearotors: bindActionCreators(action, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DonHang);
