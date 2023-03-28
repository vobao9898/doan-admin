import React, { useState } from "react";
import "./homePage.scss";
import * as api from "../../../api/thong_ke";
import Table from "react-bootstrap/Table";
import Moment from "moment";
// import "react-datepicker/dist/react-datepicker.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import Pagination from "react-js-pagination";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

function Thongke(props) {
  const [data, setData] = useState([]);
  const [dataVanChuyen, setDataVanChuyen] = useState([]);
  const [dataLG, setDataLG] = useState([]);
  const [dataAll, setDataAll] = useState([]);

  const [toDateLG, settoDateLG] = useState(new Date());
  const [fromDateLG, setfromDateLG] = useState(new Date());

  const [offset, setoffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const [activePage, setActivePage] = useState(1);
  const [allPage, setAllPage] = useState(0);

  const handleformtodateLG = (date) => {
    settoDateLG(date);
  };

  const handleformfromdateLG = (date) => {
    setfromDateLG(date);
  };

  async function submitLG(stemp) {
    await api.getDoanhThu(stemp).then((res) => {
      console.log(res)
      if (res.status === 200) {
        setData(res.data.data);
      }
    });
    await api.getDoanhThuLG(stemp).then((res) => {
      if (res.status === 200) {
        setDataLG(res.data.data);
      }
    });
    await api.getDoanhThuTotal(stemp).then((res) => {
      if (res.status === 200) {
        setAllPage(res.data.data[0].total);
      }
    });
    await api.getVanChuyen(stemp).then((res) => {
      if (res.status === 200) {
        setDataVanChuyen(res.data.data);
      }
    });
    await api.getDoanhThuTongTien(stemp).then((res) => {
      console.log(res)
      if (res.status === 200) {
        if(res.data.data[0].tong_tien){
          setDataAll(res.data.data);
        }else{
          setDataAll([]);
        }
      }
    });
  }

  function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
    let pageN = 0;
    if (pageNumber === 1) {
      pageN = 0;
    } else {
      pageN = pageNumber * 10 - 10;
    }
    submitLG({
      to_date: Moment(toDateLG).format("YYYY-MM-DD"),
      from_date: Moment(fromDateLG).format("YYYY-MM-DD"),
    });
  }

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
 
  return (
    <div className="homePage-admin">
      <div className="homepage">
        <div className="title-homePage fs-4 fw-bold"> Thống kê Doanh Thu</div>
        <div className="statistical-homepage mt-5">
          <div className="mt-5">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="form-group d-flex mr-3 align-items-center">
                  <div className="mr-1">Từ</div>
                  <DatePicker
                    className="heigth_date"
                    selected={fromDateLG}
                    value={fromDateLG}
                    onChange={(date) => handleformfromdateLG(date)}
                    showTimeSelect
                    dateFormat="dd-MM-yyyy"
                    name="from_date"
                  />
                </div>
                <div className="form-group d-flex mr-3 align-items-center">
                  <div className="mr-1">Đến</div>
                  <DatePicker
                    className="heigth_date"
                    selected={toDateLG}
                    value={toDateLG}
                    onChange={(date) => handleformtodateLG(date)}
                    showTimeSelect
                    dateFormat="dd-MM-yyyy"
                    name="to_date"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    submitLG({
                      to_date: Moment(toDateLG).format("YYYY-MM-DD"),
                      from_date: Moment(fromDateLG).format("YYYY-MM-DD"),
                    })
                  }
                >
                  Thực hiện
                </button>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => exportToCSV(data, "doanhThu")}
              >
                Xuất EXCEL
              </button>
            </div>

            {dataAll.length > 0 ? (
              <div className="p-5">
                <div className="category-homePage">
                  <div className="product-homePage shadow">
                    <div className="vertical">
                      <div className="base">
                        <div className="left">
                          <div className="title-homePage-small">
                            Tổng tiền bán được
                          </div>
                          <div className="amount-homePage">{`${dataAll[0].tong_tien
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</div>
                        </div>
                        <div className="righ"></div>
                      </div>
                    </div>
                  </div>
                  <div className="product-homePage shadow">
                    <div className="vertical">
                      <div className="base">
                        <div className="left">
                          <div className="title-homePage-small">
                            Tổng tiền gốc
                          </div>
                          <div className="amount-homePage">{`${dataAll[0].tong_tien_goc
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</div>
                        </div>
                        <div className="righ"></div>
                      </div>
                    </div>
                  </div>
                  <div className="product-homePage shadow">
                    <div className="vertical">
                      <div className="base">
                        <div className="left">
                          <div className="title-homePage-small">
                            Tổng tiền vận chuyển
                          </div>
                          <div className="amount-homePage">{`${dataVanChuyen[0].van_chuyen
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</div>
                        </div>
                        <div className="righ"></div>
                      </div>
                    </div>
                  </div>
                  <div className="product-homePage shadow">
                    <div className="vertical">
                      <div className="base">
                        <div className="left">
                          <div className="title-homePage-small">
                            Tổng doanh thu
                          </div>
                          <div className="amount-homePage">{`${(
                            dataAll[0].tong_tien - dataAll[0].tong_tien_goc
                          )
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</div>
                        </div>
                        <div className="righ"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            <Table striped bordered hover   className="table_type">
              <thead>
                <tr>
                  <th scope="col" colSpan={7} className="text-center fw-bold">
                    Doanh thu theo giày
                  </th>
                </tr>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên giày</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Giá bán gốc</th>
                  <th scope="col">Giá bán</th>
                  <th scope="col">Tổng tiền gốc</th>
                  <th scope="col">Tổng tiền Bán ra</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.ten_giay}</td>
                        <td>{item.so_luong}</td>
                        <td>{`${item.gia_ban_goc
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</td>
                        <td>{`${item.gia_ban
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</td>
                        <td>{`${(item.so_luong * item.gia_ban_goc)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</td>
                        <td>{`${item.tong_tien
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <th scope="col" colSpan={7} className="text-center fw-bold">
                      Danh sách trống
                    </th>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className="mt-2">
              <Table
                striped
                bordered
                hover
                 
                className="table_type"
              >
                <thead>
                  <tr>
                    <th scope="col" colSpan={7} className="text-center fw-bold">
                      Doanh thu theo thương hiệu
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên giày</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {dataLG.length > 0 ? (
                    dataLG.map((item, index) => {
                      return (
                        <tr key={`LG_${item.ten_loai_giay}`}>
                          <td>{index + 1}</td>
                          <td>{item.ten_loai_giay}</td>
                          <td>{item.so_luong}</td>
                          <td>{`${item.tong_tien
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <th
                        scope="col"
                        colSpan={7}
                        className="text-center fw-bold"
                      >
                        Danh sách trống
                      </th>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
            {/* <div className="pagination">
              <Pagination
                prevPageText="prev"
                nextPageText="next"
                activePage={activePage}
                itemsCountPerPage={limit}
                totalItemsCount={allPage}
                pageRangeDisplayed={limit}
                onChange={handlePageChange}
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thongke;
