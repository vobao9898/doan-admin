export default function validateInfo(values) {
    let errors = {};
    if (!values.hinh_anh) {
        errors.hinten_tin_tuch_anh = 'Vui lòng nhập tên tin tức';
    }
    if (!values.tom_tat) {
        errors.tom_tat = 'Vui lòng nhập tóm tắt';
    }
    if (!values.noi_dung) {
        errors.noi_dung = 'Vui lòng nhập nội dung';
    }
    if (!values.hinh_anh) {
        errors.hinh_anh = 'Vui lòng chọn hình ảnh';
    }

    return errors;
}