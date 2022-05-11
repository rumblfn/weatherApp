import { SET_CITY, SET_CITY_DATA } from "./actions"

const initialState = {
    city: "",
    data: {}
}

export const Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_CITY: {
            return {
                ...state,
                city: action.payload
            }
        }
        case SET_CITY_DATA: {
            return {
                ...state,
                data: {...action.payload}
            }
        }
        default: {
            return state
        }
    }
}