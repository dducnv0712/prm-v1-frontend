
// const STATUS = [
//     1,
//     2,
//     3,
//     4
// ]

export const formatStatus = (status) => {
    let result = '';
    switch (status) {
        case 1:
            result = 'Trạng thái 1';
            break;
        case 2:
            result = 'Trạng thái 2';
            break;
        case 3:
            result = 'Trạng thái 3';
            break;
        case 4:
            result = 'Trạng thái 4';
            break;
        default:
            result = 'Đang chờ'
            break;
    }

    return result;
}