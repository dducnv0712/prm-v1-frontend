import axiosClient from "./axiosClient";
const giftApi = {
    getAll: () => {
        return axiosClient.get("/thongtinquatang")
    },
    getAllProduct: () => {
        return axiosClient.get("/thongtinsanpham")
    },
    claimGift:(req) => {
        var data = {
            customer_id:req.customer_id,
            gift_id:req.gift_id,
            type:"confirmed",
        }
        return axiosClient.post("/doiqua",data)
    },
    claimGiftChangeInfo:(req)=>{
        var data ={
            customer_id:req.customer_id,
            gift_id:req.gift_id,
            type:"edit",
            address:req.address,
            phone:req.phone,
            name:req.name
        }
        console.log(req);
        return axiosClient.post("/doiqua",data)
    }
}
export default giftApi;