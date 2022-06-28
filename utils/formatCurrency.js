export const formatCurrency = (num) => {
    num = parseInt(num);
    return num.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
    })
}