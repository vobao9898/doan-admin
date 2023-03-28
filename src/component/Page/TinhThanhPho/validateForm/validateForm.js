export default function validateInfo(values) {
    let errors = {};
    if (!values.ship) {
        errors.ship = 'Vui lòng nhập phí vận chuyển';
    }
    return errors;
}