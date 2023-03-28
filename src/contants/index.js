import React from "react";
import LoaiSanPham from "./../component/Page/LoaiSanPham/index";
import SanPham from "./../component/Page/SanPham/index";
import KhachHang from "./../component/Page/KhachHang/index";
import DonHang from "./../component/Page/DonHang/index";
import KhuyenMai from "./../component/Page/KhuyenMai/index";
import PhanHoi from "./../component/Page/PhanHoi/index";
import TrangChu from "./../component/Page/TrangChu/index";
import MauSac from "./../component/Page/MauSac/index";
import Size from "./../component/Page/Size/index";
import HomeIcon from '@mui/icons-material/Home';
import XemDonHang from "./../component/Page/XemDonHang/index";
import ThongKe from "./../component/Page/ThongKe/index";
import DoanhThu from "./../component/Page/DoanhThu/index";
import TonKho from "./../component/Page/TonKho/index";
import TinhThanhPho from "./../component/Page/TinhThanhPho/index";
import QuangCao from "./../component/Page/QuangCao/index";
import TinTuc from "./../component/Page/TinTuc/index";
import AssignmentTurnedIn from '@mui/icons-material/AssignmentTurnedIn';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import PersonAdd from '@mui/icons-material/PersonAdd';
import ListAlt from '@mui/icons-material/ListAlt';
import Timer10 from '@mui/icons-material/Timer10Select';
import RecordVoiceOver from '@mui/icons-material/RecordVoiceOver';
import ColorLens from '@mui/icons-material/ColorLens';
import AspectRatio from '@mui/icons-material/AspectRatio';
import TrendingUp from '@mui/icons-material/TrendingUp';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import EventIcon from '@mui/icons-material/Event';
import ContactsIcon from '@mui/icons-material/Contacts';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import Login from "./../commom/Login/index";
import Taikhoan from "./../component/Page/TaiKhoan/index";
import NotFound from "./../component/Page/notFound/index";

// export const ROUTES_LOGIN = [
// 	{
// 	  path: '/login',
// 	  name: 'Đăng nhập',
// 	  component: Login,
// 	  exact: true,
// 	},
//   ];

export const API_ENPOINT = "http://localhost:8080";
export const ROUTESLG = [
  {
    path: "/dangnhap",
    name: "Trang đămg nhập",
    exact: false,
    component: Login,
  },
];

export const ROUTES = [
  {
    path: "/",
    name: "Trang chủ",
    exact: true,
    component: TrangChu,
    icon: <HomeIcon> </HomeIcon>,
  },{
    path: "/QuangCao",
    name: "Quảng Cáo ",
    exact: true,
    component: QuangCao,
    icon: <CardMembershipIcon> </CardMembershipIcon>,
  },
  {
    path: "/TinTuc",
    name: "Tin Tức",
    exact: true,
    component: TinTuc,
    icon: <EventIcon> </EventIcon>,
  },
  {
    path: "/ThuongHieu",
    name: "Thương hiệu",
    exact: false,
    component: LoaiSanPham,
    icon: <AssignmentTurnedIn> </AssignmentTurnedIn>,
  },
  {
    path: "/SanPham",
    name: "Sản phẩm",
    exact: false,
    component: SanPham,
    icon: <AddShoppingCart> </AddShoppingCart>,
  },
  {
    path: "/MauSac",
    name: "Màu Sắc",
    exact: false,
    component: MauSac,
    icon: <ColorLens> </ColorLens>,
  },
  {
    path: "/Size",
    name: "Size",
    exact: false,
    component: Size,
    icon: <AspectRatio> </AspectRatio>,
  },
  {
    path: "/khachhang",
    name: "Khách hàng",
    exact: false,
    component: KhachHang,
    icon: <ContactsIcon> </ContactsIcon>,
  },
  {
    path: "/donhang",
    name: "Đơn Hàng",
    exact: false,
    component: DonHang,
    icon: <ListAlt> </ListAlt>,
  },
  {
    path: "/Khuyenmai",
    name: "Khuyến mãi",
    exact: false,
    component: KhuyenMai,
    icon: <Timer10> </Timer10>,
  },
  {
    path: "/VanChuyen",
    name: "Vận chuyển",
    exact: false,
    component: KhuyenMai,
    icon: <DriveEtaIcon> </DriveEtaIcon>,
  },
  // {
  //   path: "/phanhoi",
  //   name: "Phản hồi",
  //   exact: false,
  //   component: PhanHoi,
  //   icon: <RecordVoiceOver> </RecordVoiceOver>,
  // },

  {
    path: "/ThongKe",
    name: "Thống kê",
    exact: false,
    component: ThongKe,
    icon: <TrendingUp> </TrendingUp>,
  },
  {
    path: "/taikhoan",
    name: "Tài khoản",
    exact: false,
    component: Taikhoan,
    icon: <RecordVoiceOver> </RecordVoiceOver>,
  },
];

export const ROUTESS = [
  {
    path: "/",
    name: "Trang chủ",
    exact: true,
    component: TrangChu,
    icon: <HomeIcon> </HomeIcon>,
  },
  {
    path: "/QuangCao",
    name: "Quảng Cáo ",
    exact: true,
    component: QuangCao,
    icon: <HomeIcon> </HomeIcon>,
  },
  {
    path: "/TinTuc",
    name: "Tin Tức",
    exact: true,
    component: TinTuc,
    icon: <HomeIcon> </HomeIcon>,
  },
  {
    path: "/ThuongHieu",
    name: "Thương hiệu",
    exact: false,
    component: LoaiSanPham,
    icon: <AssignmentTurnedIn> </AssignmentTurnedIn>,
  },
  {
    path: "/SanPham/page=:page&&search=:searchSP",
    name: "Sản phẩm",
    exact: false,
    component: SanPham,
    icon: <AddShoppingCart> </AddShoppingCart>,
  },
  {
    path: "/SanPham/page=:page&&ThuongHieu=:th",
    name: "Sản phẩm",
    exact: false,
    component: SanPham,
    icon: <AddShoppingCart> </AddShoppingCart>,
  },
  {
    path: "/SanPham/soluong=:soluong",
    name: "Sản phẩm",
    exact: false,
    component: SanPham,
    icon: <AddShoppingCart> </AddShoppingCart>,
  },
  {
    path: "/SanPham",
    name: "Sản phẩm",
    exact: false,
    component: SanPham,
    icon: <AddShoppingCart> </AddShoppingCart>,
  },
  {
    path: "/MauSac",
    name: "Màu Sắc",
    exact: false,
    component: MauSac,
    icon: <AddShoppingCart> </AddShoppingCart>,
  },
  {
    path: "/Size",
    name: "Size",
    exact: false,
    component: Size,
    icon: <AddShoppingCart> </AddShoppingCart>,
  },
  {
    path: "/khachhang/page=:page",
    name: "Khách hàng",
    exact: false,
    component: KhachHang,
  },
  {
    path: "/khachhang/search=:search",
    name: "Khách hàng",
    exact: false,
    component: KhachHang,
  },
  {
    path: "/khachhang/search=:search/page=:page",
    name: "Khách hàng",
    exact: false,
    component: KhachHang,
  },
  {
    path: "/khachhang",
    name: "Khách hàng",
    exact: false,
    component: KhachHang,
    icon: <PersonAdd> </PersonAdd>,
  },
  {
    path: "/VanChuyen/page=:page&&search=:search",
    name: "Vận chuyển",
    exact: false,
    component: TinhThanhPho,
  },{
    path: "/VanChuyen/page=:page",
    name: "Vận chuyển",
    exact: false,
    component: TinhThanhPho,
  },
  {
    path: "/VanChuyen",
    name: "Vận chuyển",
    exact: false,
    component: TinhThanhPho,
    icon: <PersonAdd> </PersonAdd>,
  },
  {
    path: "/donhang/page=:page",
    name: "Đơn hàng",
    exact: false,
    component: DonHang,
  },
  {
    path: "/donhang/trang_thai=:trang_thai&&page=:page",
    name: "Đơn hàng",
    exact: false,
    component: DonHang,
  },
  {
    path: "/donhang",
    name: "Đơn Hàng",
    exact: false,
    component: DonHang,
    icon: <ListAlt> </ListAlt>,
  },
  {
    path: "/xemdonhang/id=:id",
    name: "Xem Đơn hàng",
    exact: false,
    component: XemDonHang,
  },
  {
    path: "/Khuyenmai",
    name: "Khuyến mãi",
    exact: false,
    component: KhuyenMai,
    icon: <Timer10> </Timer10>,
  },
  // {
  //   path: "/phanhoi",
  //   name: "Phản hồi",
  //   exact: false,
  //   component: PhanHoi,
  //   icon: <RecordVoiceOver> </RecordVoiceOver>,
  // },
  {
    path: "/ThongKe",
    name: "Thống kê",
    exact: false,
    component: ThongKe,
  },
  {
    path: "/DoanhThu",
    name: "Doanh Thu",
    exact: false,
    component: DoanhThu,
  },
  {
    path: "/TonKho",
    name: "Tồn kho",
    exact: false,
    component: TonKho,
  },
  {
    path: "/taikhoan",
    name: "Tài khoản",
    exact: false,
    component: Taikhoan,
    icon: <RecordVoiceOver> </RecordVoiceOver>,
  },
  {
    path: "*",
    name: "Not Found",
    component: NotFound,
  },
];

export const ROUTESSTC = [
  {
    path: "/",
    name: "Trang chủ",
    exact: true,
    component: TrangChu,
  },

  {
    path: "/GiayTay",
    name: "Giày Tây",
    exact: false,
    component: LoaiSanPham,
  },
  {
    path: "/GioiThieu",
    name: "Giới Thiệu",
    exact: false,
    component: MauSac,
  },
  {
    path: "/DangNhap",
    name: "Đăng nhập",
    exact: false,
    component: Size,
  },
  {
    path: "/DangKy",
    name: "Đăng ký",
    exact: false,
    component: KhachHang,
  },
];

export const ROUTESSMN = [
  {
    path: "/",
    name: "Trang chủ",
    exact: true,
  },

  {
    path: "/GiayTay",
    name: "Giày Tây",
    exact: false,
  },
  {
    path: "/GioiThieu",
    name: "Giới Thiệu",
    exact: false,
  },
  {
    path: "/DangNhap",
    name: "Đăng nhập",
    exact: false,
  },
  {
    path: "/DangKy",
    name: "Đăng ký",
    exact: false,
  },
];
