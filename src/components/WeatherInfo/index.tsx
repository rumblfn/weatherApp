import { FC } from "react"

interface WeatherInfoProps {
    city: string
}

export const WeatherInfo: FC<WeatherInfoProps> = ({city}) => {
    if (city) {
        return (
            <div style={{margin: '16px'}}>
                Current city: <b>{city}</b>
            </div>
        )
    } else {
        return (
            <div style={{border: '2px dashed var(--button-color)', margin: '16px', borderRadius: '7px', padding: '16px'}}>
                <h5>We could not get access to your location, you can enter the desired city in the search</h5>
            </div>
        )
    }
}