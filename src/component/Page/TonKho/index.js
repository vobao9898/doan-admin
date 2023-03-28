import React, { useState, useEffect } from "react";
import "./homePage.scss";
import * as api from "../../../api/thong_ke";
import Table from "react-bootstrap/Table";
// import "react-datepicker/dist/react-datepicker.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-js-pagination";
function Thongke(props) {

 const [data, setData] = useState([]);
 const [dataAll, setDataAll] = useState([]);

 const [offset, setoffset] = useState(0);
 const [limit, setLimit] = useState(10);

 const [activePage, setActivePage] = useState(1);
 const [allPage, setAllPage] = useState(0);

  useEffect(() => {
    getData({offset: offset, limit: limit});
    setAllPage(1);
  }, [])

  async function getData(stemp){
    await api.getTonKho(stemp).then((res) => {
      if (res.status === 200) {
        setData(res.data.data);
      }
    });
    await api.getTonKhoTongTien().then((res) => {
      if (res.status === 200) {
        console.log(res)
        setDataAll(res.data.data);
      }
    });
    await api.getTonKhoTotal().then((res) => {
      if (res.status === 200) {
        setAllPage(res.data.data[0].total);
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
    getData({limit: limit,offset: pageN,});
  }
  return (
    <div className="homePage-admin">
      <div className="homepage">
        <div className="title-homePage fs-4 fw-bold"> Thống kê tồn kho</div>
        <div className="statistical-homepage">
          <div className="giayByMonth">
          {dataAll.length > 0 ? (
              <div className="p-5">
                <div className="category-homePage">
                  <div className="product-homePage shadow">
                    <div className="vertical">
                      <div className="base">
                        <div className="left">
                          <div className="title-homePage-small">
                            Số lượng
                          </div>
                          <div className="amount-homePage">{`${dataAll[0].so_luong
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
                            Tổng tiền tồn kho
                          </div>
                          <div className="amount-homePage">{`${dataAll[0].tong_tien
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
                  <th scope="col" colSpan={4} className="text-center fw-bold">
                    Tồn kho
                  </th>
                </tr>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên giày</th>
                  <th scope="col">Tên thương hiệu</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Giá bán gốc</th>
                  <th scope="col">Giá bán</th>
                  <th scope="col">Tổng tiền</th>
                  <th scope="col">Tổng tiền gốc</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => {
                    return (
                      <tr key={item.ten_giay}>
                        <td>{index + 1}</td>
                        <td>{item.ten_giay}</td>
                        <td>{item.ten_loai_giay}</td>
                        <td>{item.so_luong}</td>
                        <td>{`${item.gia_ban_goc
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</td>
                        <td>{`${item.gia_ban
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</td>
                        <td>{`${item.tong_tien
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</td>
                        <td>{`${item.tong_tien_goc
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <th scope="col" colSpan={4} className="text-center fw-bold">
                      Danh sách trống
                    </th>
                  </tr>
                )}
              </tbody>
            </Table>
             <div className="pagination">
              <Pagination
                prevPageText="prev"
                nextPageText="next"
                activePage={activePage}
                itemsCountPerPage={limit}
                totalItemsCount={allPage}
                pageRangeDisplayed={limit}
                onChange={handlePageChange}
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Thongke;
