import axiosClient from "./axiosClient"

export const AuthAPI = {
    login: (data) => {
        return axiosClient({
            method: 'POST',
            url: '/login',
            data: data
        })
    },

    register: (data) => {
        return axiosClient({
            method: 'POST',
            url: '/dangky',
            data: data
        })
    },

    logout: () => {
        return axiosClient({
            method: 'GET',
            url: '/logout'
        })
    }
}