import axiosClient from "./axiosClient";
const qrcodeApi = {
    getAll:()=>{
        return axiosClient.get("/qrcode");
    },
    getInfoExchangeGift: ({promotion_id, product_id, special_code}) => {
        return axiosClient({
            method: 'GET',
            url: `/tichdiem/${promotion_id}/${product_id}/${special_code}`
        })
    }
}

export default qrcodeApi;