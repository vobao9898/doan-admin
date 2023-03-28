import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import * as action from "../../../actions/modal";
import * as actionLoaiGiay from "../../../actions/loai_giay";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ComponentType from "./form_loai_giay/component";
import * as apiUpload from "../../../api/loai_giay";
import * as apiTinTuc from "../../../api/tin_tuc";
import * as notify from "../../../contants/notifycation";
import Modal from "react-bootstrap/Modal";
import Moment  from 'moment';

function LoaiSanPham(props) {
  const { modalAtionCrearotors } = props;
  const { showModal, changeModalContent, changeModalTitle } =
    modalAtionCrearotors;
  const [show, setShow] = useState(false);
  const [nd, setNd] = useState("");
  const [dataTam, setDataTam] = useState({});
  const [searchTH, setSearchTH] = useState("");
  const [dataPage, setDataPage] = useState({
    offset: 0,
    limit: 10,
  });
  const [data, setData] = useState([]);

  useEffect(()=>{
    loadData();
  },[]);

  async function loadData(){
    apiTinTuc.getTinTuc(dataPage).then((res)=>{
      if(res.data.success === 1){
        setData(res.data.data);
      }
    })
  }

  function ThemLoaiGiay() {
    setSearchTH("");
    changeModalTitle("Thêm quảng cáo");
    changeModalContent(<ComponentType loadData={loadData}> </ComponentType>);
    showModal();
  }

  const handleClose = () => {
    setShow(false);
  };

  function closeDidalog() {
    if (dataTam.id) {
      apiTinTuc
        .deleteTinTuc(dataTam)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.success === 500) {
            } else {
              loadData();
              notify.notificatonSuccess("Xóa thành công");
              setDataTam({});
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setShow(false);
  }
  useEffect(() => {
    const { LoaiGiayAtionCrearotors } = props;
    const { fetchListLoaiGiayRequest } = LoaiGiayAtionCrearotors;
    async function fetchPostsList() {
      try {
        fetchListLoaiGiayRequest();
      } catch (error) {
        console.log("failed to fetch post list", error.message);
      }
    }
    fetchPostsList();
  }, []);

  function deleteLoaigiays(data) {
    setSearchTH("");
    setShow(true);
    setNd(`Bạn muốn xóa không`);
    setDataTam(data);
  }

  function update(data) {
    setSearchTH("");
    changeModalTitle("Chỉnh sửa quảng cáo");
    changeModalContent(<ComponentType loadData={loadData} dataEdit={data}> </ComponentType>);
    showModal();
  }

  function updateTrangThai(data) {
    let t = 0;
    if (data.trang_thai === 0) {
      t = 1;
    }
    const d = {
      id: data.id,
      ten_loai_giay: data.ten_loai_giay,
      mo_ta: data.mo_ta,
      trang_thai: t,
      hinh_anh: data.hinh_anh,
    };
    apiUpload
      .updateLoaiGiay(d)
      .then((response) => {
        if (response.status === 200) {
          notify.notificatonSuccess("Chỉnh sửa trạng thành công");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function searchThuongHieu(e) {
    e.persist();
    setSearchTH(e.target.value);
  }
  useEffect(() => {
    let delayDebounceFn = null;
    if (searchTH !== "") {
      delayDebounceFn = setTimeout(() => {
      }, 1000);
    } 
    return () => clearTimeout(delayDebounceFn);
  }, [searchTH]);
  return (
    <div className="product-admin">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Thông báo </Modal.Title>
        </Modal.Header>
        <Modal.Body> {nd} </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeDidalog}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="type_product">
        <div className="type_product_search">
          <Button variant="success" onClick={ThemLoaiGiay}>
           Thêm tin tức
          </Button>
        </div>
        <Table
          striped
          bordered
          hover
           
          className="table_type khuyenmai"
        >
          <thead>
            <tr>
              <th> STT </th> <th> Tên tin tức </th> <th> Tóm tắt</th>
              <th>Hình ảnh</th>
              <th className="width-DK"> Điều khiển </th>
            </tr>
          </thead>
          <tbody>
            
            {data
              ? data.map((post, index) => {
                  return (
                    <tr key={index + 1}>
                      <td> {index + 1} </td>
                      <td>
                        {post.ten_tin_tuc}
                      </td>
                      <td>
                        {post.tom_tat}
                      </td>
                      <td>
                        <img
                          src={`https://apidoan.herokuapp.com/images/${post.hinh_anh}`}
                          alt=""
                        />
                      </td>
                      <td>{Moment(post.date_create).format("YYYY-MM-DD")}</td>
                      <td className="Controls_type">
                        <Button
                          variant="primary update_type"
                          onClick={() => update(post)}
                        >
                          sửa
                        </Button>
                        <Button
                          variant="danger delete_type"
                          onClick={() => deleteLoaigiays(post)}
                        >
                          Xóa
                        </Button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

LoaiSanPham.propTypes = {
  showModal: PropTypes.func,
};

LoaiSanPham.defaultProps = {
  showModal: null,
};

const mapDispatchToProps = (dispatch) => {
  return {
    modalAtionCrearotors: bindActionCreators(action, dispatch),
    LoaiGiayAtionCrearotors: bindActionCreators(actionLoaiGiay, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    ListLoaiGiay: state.loaigiay.ListLoaiGiay,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoaiSanPham);
