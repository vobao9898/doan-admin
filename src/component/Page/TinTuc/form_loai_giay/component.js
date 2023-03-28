import React, { useState, useEffect } from "react";

import "./component_type.scss";
import * as apiUpload from "../../../../api/loai_giay";
import * as apiTinTuc from "../../../../api/tin_tuc";
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
import JoditEditor from "jodit-react";
import { useRef } from "react";
function Component_type({ loadData = () => {}, dataEdit = {}, ...props }) {
  const { loagiayCreator, loaiGiayEditting, ListLoaiGiay } = props;
  const { modalFormCreator } = props;
  const { hideModal } = modalFormCreator;
  const { updateLoaiGiay, themLoaiGiaysuccess } = loagiayCreator;
  const {
    onUpload,
    onChangeInput,
    handleChange,
    handleSubmit,
    data,
    setData,
    errors,
  } = useForm(submit, validate, apiUpload);
  const [show, setShow] = useState(false);
  const [nd, setNd] = useState("");
  const { ten_tin_tuc, tom_tat, noi_dung } = data;

  const editor = useRef(null);

  const config = {
    zIndex: 0,
    readonly: false,
    activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about', 'dots'],
    toolbarButtonSize: 'middle',
    theme: 'default',
    saveModeInCookie: false,
    spellcheck: true,
    editorCssClass: false,
    triggerChangeEvent: true,
    width: 'auto',
    height: 'auto',
    minHeight: 100,
    direction: '',
    language: 'auto',
    debugLanguage: false,
    i18n: 'en',
    tabIndex: -1,
    toolbar: true,
    enter: "P",

    useSplitMode: false,
    colors: {
        greyscale:  ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF'],
        palette:    ['#980000', '#FF0000', '#FF9900', '#FFFF00', '#00F0F0', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF'],
        full: [
            '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC',
            '#DD7E6B', '#EA9999', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#D5A6BD',
            '#CC4125', '#E06666', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#C27BA0',
            '#A61C00', '#CC0000', '#E69138', '#F1C232', '#6AA84F', '#45818E', '#3C78D8', '#3D85C6', '#674EA7', '#A64D79',
            '#85200C', '#990000', '#B45F06', '#BF9000', '#38761D', '#134F5C', '#1155CC', '#0B5394', '#351C75', '#733554',
            '#5B0F00', '#660000', '#783F04', '#7F6000', '#274E13', '#0C343D', '#1C4587', '#073763', '#20124D', '#4C1130'
        ]
    },
    colorPickerDefaultTab: 'background',
    imageDefaultWidth: 300,
    removeButtons: [],
    disablePlugins: [],
    extraButtons: [],
    sizeLG: 900,
    sizeMD: 700,
    sizeSM: 400,
    sizeSM: 400,
    buttons: [
        'source', '|',
        'bold',
        'strikethrough',
        'underline',
        'italic', '|',
        'ul',
        'ol', '|',
        'outdent', 'indent',  '|',
        'font',
        'fontsize',
        'brush',
        'paragraph', '|',
        'image',
        'video',
        'table',
        'link', '|',
        'align', 'undo', 'redo', '|',
        'hr',
        'eraser',
        'copyformat', '|',
        'symbol',
        'fullsize',
        'print',
        'about'
    ],
    buttonsXS: [
        'bold',
        'image', '|',
        'brush',
        'paragraph', '|',
        'align', '|',
        'undo', 'redo', '|',
        'eraser',
        'dots'
    ],
    events: {},
    textIcons: false,
  }

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
  console.log(data.noi_dung);
  function submit() {
    if (data.id) {
      apiTinTuc
        .updateTinTuc(data)
        .then((response) => {
          if (response.status === 200) {
            notify.notificatonSuccess("Chỉnh sửa thành công");
            loadData();
            hideModal();
            setData((data) => ({
              ...data,
              id: 0,
              ten_tin_tuc: "",
              tom_tat: "",
              noi_dung: "",
              hinh_anh: "",
              date_create: new Date(),
              date_update: new Date(),
            }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      apiTinTuc
        .ThemTinTuc(data)
        .then((response) => {
          if (response.status === 200) {
            notify.notificatonSuccess("Thêm thành công");
            loadData();
            hideModal();
            setData((data) => ({
              ...data,
              id: 0,
              ten_tin_tuc: "",
              tom_tat: "",
              noi_dung: "",
              hinh_anh: "",
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
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="form-group">
            <label>Tin tức</label>
            <input
              id="ten_tin_tuc"
              name="ten_tin_tuc"
              type="text"
              value={ten_tin_tuc}
              className="form-control validate"
              onChange={(e) => onChangeInput(e)}
            />
            {errors.ten_tin_tuc && (
              <p className="error">{errors.ten_tin_tuc}</p>
            )}
          </div>
          <div className="form-group">
            <label> Tóm tắt tin tức </label>
            <textarea
              id="tom_tat"
              name="tom_tat"
              value={tom_tat}
              className="form-control validate"
              rows="3"
              onChange={(e) => onChangeInput(e)}
            ></textarea>
            {errors.tom_tat && <p className="error">{errors.tom_tat}</p>}
          </div>
          <div className="form-group">
            <label> Nội dung</label>
            <JoditEditor
              ref={editor}
              value={noi_dung}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) =>
                setData((data) => ({
                  ...data,
                  noi_dung: newContent,
                }))
              } // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => {}}
            />
            {errors.noi_dung && <p className="error">{errors.noi_dung}</p>}
          </div>
        </div>

        <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
          <div className="tm-product-img-dummy mx-auto">
            {!data.hinh_anh ? (
              <i className="fas fa-cloud-upload-alt tm-upload-icon"> </i>
            ) : (
              <img src={`http://localhost:8080/images/${data.hinh_anh}`} />
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
