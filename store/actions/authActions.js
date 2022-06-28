import {
    GET_CURRENT_USER, SET_CURRENT_USER, GET_ERRORS
} from '../types'
import axiosClient from '../../api/axiosClient'
import { AuthAPI } from '../../api/authAPI'

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}

export const getCurrentUser = () => {
    return dispatch => {
        axiosClient({
            method: "GET",
            url: `/user`
        })
            .then((res) => {
                dispatch({
                    type: GET_CURRENT_USER,
                    payload: res.data
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export const getErrors = (errors) => {
    return {
        type: GET_ERRORS,
        payload: errors
    }
}

export const login = (data, router) => {
    return dispatch => {
        axiosClient({
            method: 'POST',
            url: `https://sukien.doppelherz.vn/api/login`,
            data: data
        })
            .then((res) => {
                const token = res.data.access_token;
                localStorage.setItem('auth_token', token);
                // const decoded = jwtDecode(token);
                dispatch(setCurrentUser(res.data));
                window.location.href = '/';
                // router.push('/lichsutichdiem')
                
            })
            .catch(err => {
                console.log(err);
            })
    }
}

// export const register = (data, history) => {
//     return dispatch => {
//         axios({
//             method: "POST",
//             data: JSON.stringify(data),
//             url: `${API_URL}/api/auth/register`,
//             headers: {
//                 'content-type': 'application/json'
//             }
//         })
// .then((res) => {
//     history.push("/login")
// })
// .catch((err) => {
//     if (err) {
//         toast.error(err.response.data.message, {
//             position: "bottom-center",
//             theme: 'dark',
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//         });
//         dispatch(getErrors(err.response.data.message))
//     }
// })
//     }
// }

export const logout = (router) => {
    return dispatch => {
        // localStorage.removeItem("auth_token");
        // dispatch(setCurrentUser({}));
        // window.location.reload();
        AuthAPI.logout()
            .then(() => {
                dispatch(setCurrentUser({}))
                router.push('/');
                localStorage.removeItem("auth_token");
            })
            .catch((err) => console.log(err))
    }
}