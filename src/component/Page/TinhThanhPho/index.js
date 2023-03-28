import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Moment from "moment";
import * as action from "../../../actions/modal";
import * as actionTinh from "../../../actions/tinh_thanh_pho";
import Modal from "react-bootstrap/Modal";
import * as api from "../../../api/tinh_thanh_pho";
import ComponentType from "./component";
import Pagination from "react-js-pagination";
import { useHistory } from "react-router-dom";

function KhuyenMai(props) {
  const history = useHistory();

  const { tinhAtionCrearotors, modalAtionCrearotors, tinhEditting } = props;
  const [data, setData] = useState([]);
  const [offset, setoffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const [activePage, setActivePage] = useState(1);
  const [allPage, setAllPage] = useState(0);

  const { setTinhThanhPhoEdittings } = tinhAtionCrearotors;
  const { showModal, changeModalContent, changeModalTitle } =
    modalAtionCrearotors;

  const [show, setShow] = useState(false);
  const [nd, setNd] = useState("");

  const [search, setSearch] = useState("");
  const handleClose = () => {
    setShow(false);
  };

  function closeDidalog() {
    // if (CTKhuyenMaiEditting.length > 0) {
    //   for (var i = 0; i < CTKhuyenMaiEditting.length; i++) {
    //     const datanews = {
    //       id_khuyen_mai: CTKhuyenMaiEditting[i].id_khuyen_mai,
    //       id_giay: CTKhuyenMaiEditting[i].id_giay,
    //     };
    //     apiCTKM
    //       .deleteCTKhuyenMai(datanews)
    //       .then((responseCTKM) => {
    //         if (responseCTKM.status === 200) {
    //           deleteCTKhuyenMai(datanews.id_khuyen_mai, datanews.id_giay);
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   }
    //   api
    //     .deleteKhuyenMai(khuyenMaiEditting)
    //     .then((responseCTKM) => {
    //       if (responseCTKM.status === 200) {
    //         deleteKhuyenMai(khuyenMaiEditting.id);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
    setShow(false);
  }
  useEffect(() => {
    const param = {
      offset: offset,
      limit: limit,
    };
    getData(param);
  }, []);

  async function getData(param) {
    await api
      .page(param)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    await api
      .getPageTotal()
      .then((response) => {
        if (response.status === 200) {
          setAllPage(response.data.data[0].total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateVanChuyen(data) {
    setTinhThanhPhoEdittings(data);
    changeModalTitle("Chỉnh sửa phí vận chỉnh");
    changeModalContent(<ComponentType></ComponentType>);
    showModal();
  }

  function handlePageChange(pageNumber) {
    if (props.match.params.search && props.match.params.page) {
      history.push(
        `/VanChuyen/page=${pageNumber}&&Search=${props.match.params.search}`
      );
    } else {
      history.push(`/VanChuyen/page=${pageNumber}`);
    }
  }

  function searchThuongHieu(e) {
    e.persist();
    setSearch(e.target.value);
  }

  useEffect(() => {
    let delayDebounceFn = null;
    delayDebounceFn = setTimeout(() => {
      if (search !== "") {
        history.push(`/VanChuyen/page=${1}&&search=${search}`);
      } else if(props.match.params.search && search==='') {
        history.push(`/VanChuyen`);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);
  
  useEffect(() => {
    if (props.match.params) {
      function fetchPostsLists() {
        if (
          parseInt(props.match.params.page) !== 0 &&
          !props.match.params.search
        ) {
          let pageN = 0;
          let pageNumber = parseInt(props.match.params.page);
          if (pageNumber === 1) {
            pageN = 0;
          } else {
            pageN = pageNumber * 10 - 10;
          }
          const param = {
            offset: pageN,
            limit: limit,
          };
          setActivePage(parseInt(props.match.params.page));
          getData(param);
        } else if (
          props.match.params.search !== "" &&
          parseInt(props.match.params.page) !== 0
        ) {
          let pageN = 0;
          let pageNumber = parseInt(props.match.params.page);
          if (pageNumber === 1) {
            pageN = 0;
          } else {
            pageN = pageNumber * 10 - 10;
          }
          setSearch(props.match.params.search);
          setActivePage(parseInt(props.match.params.page));
          api
            .pageSearch({
              offset: pageN,
              limit: limit,
              name: props.match.params.search,
            })
            .then((res) => {
              if (res.status === 200) {
                setData(res.data.data);
                api
                  .getPageSearchTotal()
                  .then((response) => {
                    if (response.status === 200) {
                      setAllPage(response.data.data[0].total);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            });
        }
        if (!props.match.params.search && !props.match.params.page) {
          setActivePage(1);
          const param = {
            offset: 0,
            limit: limit,
          };
          getData(param);
        }
      }

      fetchPostsLists();
    }
    return () => {
      setData([]);
    };
  }, [props.match.params]);

  return (
    <div className="product-admin">
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
      <div className="type_product">
        <div className="type_product_search">
          <div className="search-thuonghieu">
            <label> Tìm kiếm </label>
            <input
              type="text"
              value={search}
              placeholder="Nhập tên tỉnh thành phố"
              onChange={searchThuongHieu}
            />
          </div>
        </div>
        <Table
          className="khuyenmai table_type"
          striped
          bordered
          hover
           
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>tên tỉnh</th>
              <th>Phí vận chuyển</th>
              <th className="width-DK">Điều khiển</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((post, index) => {
                  return (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{post.name}</td>
                      <td>{post.ship}</td>
                      <td className="Controls_type">
                        <Button
                          className="khuyenmai-button"
                          variant="primary update_type"
                          onClick={() => updateVanChuyen(post)}
                        >
                          sửa
                        </Button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
        <div className="pagination">
          <Pagination
            prevPageText="prev"
            nextPageText="next"
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={allPage}
            pageRangeDisplayed={10}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    modalAtionCrearotors: bindActionCreators(action, dispatch),
    tinhAtionCrearotors: bindActionCreators(actionTinh, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    tinhEditting: state.tinh.tinhEditting,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KhuyenMai);
