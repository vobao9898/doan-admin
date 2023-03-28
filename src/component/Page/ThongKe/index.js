import React, { useState } from "react";
import "./homePage.scss";
import * as api from "./../../../api/thong_ke";
import Table from "react-bootstrap/Table";
import Moment from "moment";
// import "react-datepicker/dist/react-datepicker.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import * as echarts from 'echarts';


function Thongke(props) {

 const [dataGiayByMonth, setDataGiayByMonth] = useState([]);
  const [dataLoaiGiayByMonth, setDataLoaiGiayByMonth] = useState([]);

  const [toDate, settoDate] = useState(new Date());
  const [fromDate, setfromDate] = useState(new Date());

  const [giay, setGiay] = useState([]);
  const [loaiGiay, setLoaiGiay] = useState([]);

  const handleformtodate = (date) => {
    settoDate(date);
  };

  const handleformfromdate = (date) => {
    setfromDate(date);
  };


  async function submitSP(){
    var dataGiay = []
    var dataGiayIndex = [];
    var dataGiayValue = []


    var dataLoaiGiay = []
    var dataLoaiGiayIndex = [];
    var dataLoaiGiayValue = []
    await api.getGiayHotByMonth({to_date: Moment(toDate).format('YYYY-MM-DD'), from_date: Moment(fromDate).format('YYYY-MM-DD') }).then((res) => {
      if (res.status === 200) {
        setDataGiayByMonth(res.data.data);
         if(res.data.data.length>0){
          res.data.data.forEach((item, index)=>{
            dataGiay.push(item.ten_giay);
            dataGiayIndex.push(index+1);
            dataGiayValue.push(item.tong_tien)
          })
         }
         setGiay(dataGiay);
      }
    });
    await api.getLoaiGiayHotByMonth({to_date: Moment(toDate).format('YYYY-MM-DD'), from_date: Moment(fromDate).format('YYYY-MM-DD') }).then((res) => {
      if (res.status === 200) {
        setDataLoaiGiayByMonth(res.data.data);
        if(res.data.data.length>0){
         res.data.data.forEach((item, index)=>{
           dataLoaiGiay.push(item.ten_loai_giay);
           dataLoaiGiayIndex.push(index+1);
           dataLoaiGiayValue.push(item.tong_tien)
         });
        }
        setLoaiGiay(dataLoaiGiay);
      }
    });


    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      xAxis: {
        type: 'category',
        data: dataGiayIndex
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: dataGiayValue,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };
    option && myChart.setOption(option);

    var chartDom1 = document.getElementById('main1');
    var myChart1 = echarts.init(chartDom1);
    var option1;
    option1 = {
      xAxis: {
        type: 'category',
        data: dataLoaiGiayIndex
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: dataLoaiGiayValue,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };
    option1 && myChart1.setOption(option1);
  }

  return (
    <div className="homePage-admin">
      <div className="homepage">
        <div className="title-homePage fs-4 fw-bold"> Thống kê các sản phẩm bán chạy</div>
    
        <div className="statistical-homepage mt-5">
          <div className="giayByMonth">
            <div className="d-flex">
              <div className="form-group d-flex mr-3 align-items-center">
                <div className="mr-1">Từ</div>
               <DatePicker
                className="heigth_date" 
                  selected={fromDate}
                  value={fromDate}
                  onChange={(date) => handleformfromdate(date)}
                  showTimeSelect
                  dateFormat="dd-MM-yyyy"
                  name="from_date"
                />
              </div>
              <div className="form-group d-flex mr-3 align-items-center">
                <div className="mr-1">Đến</div>
                <DatePicker
                  className="heigth_date"
                  selected={toDate}
                  value={toDate}
                  onChange={(date) => handleformtodate(date)}
                  showTimeSelect
                  dateFormat="dd-MM-yyyy"
                  name="to_date"
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={submitSP}>Thực hiện</button>
            </div>
            <Table striped bordered hover   className="table_type">
              <thead>
                <tr>
                  <th scope="col" colSpan={4} className="text-center fw-bold">
                    Sản phẩm bán chạy
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
                {dataGiayByMonth.length > 0 ? (
                  dataGiayByMonth.map((item, index) => {
                    return (
                      <tr key={item.ten_giay}>
                        <td>{index + 1}</td>
                        <td>{item.ten_giay}</td>
                        <td>{item.so_luong}</td>
                        <td>{`${(item.tong_tien)
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
          </div>
          <div style={{marginLeft:'10px', height: giay.length > 0 ? '500px' : '0px'}} className='d-flex'>
              <div style={{height: giay.length > 0 ? '500px' : '0px', width: '50%'}} id='main'></div>
              <div style={{ width: '50%', display: 'flex',marginTop: '10px', flexWrap: 'wrap'}}>
                {giay.length > 0 && giay.map((item, index)=>{
                    return <div style={{width: '100%'}}>{index+1 +': '+item}</div>
                })}
              </div>
          </div>
          <div className="mt-5">
            <Table striped bordered hover   className="table_type">
              <thead>
                <tr>
                  <th scope="col" colSpan={4} className="text-center fw-bold">
                    Loại giày bán chạy
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
                {dataLoaiGiayByMonth.length > 0 ? (
                  dataLoaiGiayByMonth.map((item, index) => {
                    return (
                      <tr key={item.ten_loai_giay}>
                        <td>{index + 1}</td>
                        <td>{item.ten_loai_giay}</td>
                        <td>{item.so_luong}</td>
                        <td>{`${(item.tong_tien)
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
            <div style={{marginLeft:'10px', height: loaiGiay.length > 0 ? '500px' : '0px'}} className='d-flex'>
              <div style={{height: loaiGiay.length > 0 ? '500px' : '0px', width: '50%'}} id='main1'></div>
              <div style={{ width: '50%', display: 'flex',marginTop: '10px', flexWrap: 'wrap'}}>
                {loaiGiay.length > 0 && loaiGiay.map((item, index)=>{
                    return <div key={item} style={{width: '100%'}}>{index+1 +': '+item}</div>
                })}
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thongke;
