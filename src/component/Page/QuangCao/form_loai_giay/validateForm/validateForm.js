export default function validateInfo(values) {
    let errors = {};
    if (!values.hinh_anh) {
        errors.hinh_anh = 'Vui lòng chọn hình ảnh';
    }

    return errors;
}