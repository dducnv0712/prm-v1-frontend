import axiosClient from "./axiosClient";

const customerApi = {
    getInfoCustomer: () => {
        return axiosClient({
            method: 'GET',
            url: `/user`
        })
    },

    getHistoryExchanges: () => {
        return axiosClient({
            method: 'GET',
            url: `/history-gift-exchange`
            // url: `http://localhost:3001/exchanges`
        })
    },

    getHistoryScans: () => {
        return axiosClient({
            method: 'GET',
            url: `/history`
            // url: `http://localhost:3001/scans`
        })
    },

    getByID: (id) => {
        return axiosClient.get(`/nguoidung/${id}`);
    },
    updateCustomet: (id, data) => {
        // return axiosClient.put(`/nguoidung/${id}`, data);
        return axiosClient.post(`/change-info`, data);
    }
}
export default customerApi;