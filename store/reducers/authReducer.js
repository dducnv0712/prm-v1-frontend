import {
    GET_CURRENT_USER,
    SET_CURRENT_USER,
    GET_ERRORS
} from '../types'

const initialState = {
    auth: {},
    isFetching: true
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                auth: action.payload.user,
                isFetching: false
            }
        case GET_CURRENT_USER:
            return {
                ...state,
                auth: action.payload.user,
                isFetching: false
            }
        case GET_ERRORS:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default authReducer;