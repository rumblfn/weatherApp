import { SET_CITY } from "./actions"

const initialState = {
    city: ""
}

export const Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_CITY: {
            return {
                ...state,
                city: action.payload
            }
        }
        default: {
            return state
        }
    }
}