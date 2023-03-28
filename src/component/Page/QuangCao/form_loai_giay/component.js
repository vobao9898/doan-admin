import React, { useState, useEffect } from "react";

import "./component_type.scss";
import * as apiUpload from "../../../../api/loai_giay";
import * as apiQuangCao from "../../../../api/quang_cao";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loaigiayAction from "../../../../actions/loai_giay";
import * as modalAction from "../../../../actions/modal";
import useForm from "./useForm/useForm";
import validate from "./validateForm/validateForm";
import * as notify from "../../../../contants/notifycation";
import { Button } from "react-bootstrap";
import Moment from "moment";
import Modal from "react-bootstrap/Modal";

function Component_type({ loadData = () => {}, dataEdit = {}, ...props }) {
  const { loagiayCreator, loaiGiayEditting, ListLoaiGiay } = props;
  const { modalFormCreator } = props;
  const { hideModal } = modalFormCreator;
  const { updateLoaiGiay, themLoaiGiaysuccess } = loagiayCreator;
  const { onUpload, handleChange, handleSubmit, data, setData, errors } =
    useForm(submit, validate, apiUpload);
  const [show, setShow] = useState(false);
  const [nd, setNd] = useState("");
  const handleClose = () => {
    setShow(false);
  };

  function closeDidalog() {
    setShow(false);
  }

  useEffect(() => {
    if (dataEdit.id) {
      setData({ ...dataEdit });
    }
  }, [dataEdit]);

  function submit() {
    if (data.id) {
      apiQuangCao
        .updateQuangCao(data)
        .then((response) => {
          if (response.status === 200) {
            notify.notificatonSuccess("Chỉnh sửa thành công");
            loadData();
            hideModal();
            setData((data) => ({
              ...data,
              id: 0,
              hinh_anh: "",
              trang_thai: 1,
              date_create: new Date(),
              date_update: new Date(),
            }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      apiQuangCao
        .ThemQuangCao(data)
        .then((response) => {
          if (response.status === 200) {
            notify.notificatonSuccess("Thêm thành công");
            loadData();
            hideModal();
            setData((data) => ({
              ...data,
              id: 0,
              hinh_anh: "",
              trang_thai: 1,
              date_create: new Date(),
              date_update: new Date(),
            }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className=" tm-edit-product-row">
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
      <form className="row tm-edit-product-form" onSubmit={handleSubmit}>
        <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
          <div className="tm-product-img-dummy mx-auto">
            {!data.hinh_anh ? (
              <i className="fas fa-cloud-upload-alt tm-upload-icon"> </i>
            ) : (
              <img src={`https://apidoan.herokuapp.com/images/${data.hinh_anh}`} />
            )}
          </div>
          {errors.hinh_anh && <p className="error"> {errors.hinh_anh} </p>}
          <div className="custom-file mt-3 mb-3">
            <input type="file" name="file" onChange={(e) => handleChange(e)} />
            <button
              type="button"
              className="btn btn-primary btn-block text-uppercase add_type"
              onClick={onUpload}
            >
              Upload
            </button>
          </div>
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary btn-block text-uppercase add_type"
          >
            Thực hiện
          </button>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    loagiayCreator: bindActionCreators(loaigiayAction, dispatch),
    modalFormCreator: bindActionCreators(modalAction, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    ListLoaiGiay: state.loaigiay.ListLoaiGiay,
    ListGiay: state.giay.ListGiay,
    loaiGiayEditting: state.loaigiay.loaiGiayEditting,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component_type);
