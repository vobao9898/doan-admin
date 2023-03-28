import React, { useState, useEffect } from "react";
import "./component_type.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as action from "../../../actions/modal";
import * as actionTinh from "../../../actions/tinh_thanh_pho";
import useForm from "./useForm/useForm";
import validate from "./validateForm/validateForm";
import * as notify from "../../../contants/notifycation";
import * as api from "../../../api/tinh_thanh_pho";
import { useHistory } from "react-router-dom";
function Component_type(props) {
  const history = useHistory()
  const { onChangeInput, data, setData, errors, handleSubmit } = useForm(
    submit,
    validate
  );
  const { modalFormCreator, tinhAtionCrearotors, modalAtionCrearotors } = props;
  const { setTinhThanhPhogEdittingNull } = tinhAtionCrearotors;
  const { hideModal } = modalAtionCrearotors;
  async function submit() {
    console.log(data)
    await api
      .update(data)
      .then((response) => {
        if (response.status === 200) {
          notify.notificatonSuccess("Chỉnh sửa thành công");
          setTinhThanhPhogEdittingNull();
          hideModal();
          history.push('/VanChuyen');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  useEffect(() => {
    const { tinhEditting } = props;
    setData(tinhEditting);
  }, []);

  const { ship } = data;

  return (
    <div className=" tm-edit-product-row">
      <form className="row tm-edit-product-form" onSubmit={handleSubmit}>
        <div className="col-xl-6 col-lg-6 col-md-12">
          <div className="form-group mb-3">
            <label>Phí vận chuyển </label>
            <input
              id="ship"
              name="ship"
              type="number"
              value={ship}
              className="form-control validate"
              onChange={(e) => onChangeInput(e)}
            />
            {errors.ship && <p className="error"> {errors.ship} </p>}
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary btn-block text-uppercase add_type"
            >
              Thực hiện
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Component_type.propTypes = {
// 	loagiayCreator: PropTypes.func,
// };

// Component_type.defaultProps = {
// 	loagiayCreator: null,
// };

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

export default connect(mapStateToProps, mapDispatchToProps)(Component_type);
