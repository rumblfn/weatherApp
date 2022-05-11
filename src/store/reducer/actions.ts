import { IWeatherData } from "../../types/types"

export const SET_CITY = 'SET_CITY'
export const SET_CITY_DATA = 'SET_CITY_DATA'

export const setCity = (payload: string) => ({
    type: SET_CITY,
    payload
})

export const setCityData = (payload: IWeatherData) => ({
    type: SET_CITY_DATA,
    payload
})