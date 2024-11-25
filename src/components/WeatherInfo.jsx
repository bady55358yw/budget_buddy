import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// 引入 utilities
import { formatDate, transferCityName, getWeatherData } from '../utilities'

// 引入 icon
import { ArrowRightIcon } from '@heroicons/react/24/outline'

// 天氣對應的 icon 列表
const weartherIconList = {
    '1': `${process.env.PUBLIC_URL}/icons/sun_sunny_temperature_icon.svg`,
    '2': `${process.env.PUBLIC_URL}/icons/clouds_sun_sunny_icon.svg`,
    '3': `${process.env.PUBLIC_URL}/icons/clouds_sun_sunny_icon.svg`,
    '4': `${process.env.PUBLIC_URL}/icons/cloud_clouds_cloudy_icon.svg`,
    '5': `${process.env.PUBLIC_URL}/icons/clouds_cloudy_fog_foggy_icon.svg`,
    '6': `${process.env.PUBLIC_URL}/icons/clouds_cloudy_fog_foggy_icon.svg`,
    '7': `${process.env.PUBLIC_URL}/icons/clouds_cloudy_fog_foggy_icon.svg`,
    '8': `${process.env.PUBLIC_URL}/icons/clouds_cloudy_forecast_rain_icon.svg`,
    '9': `${process.env.PUBLIC_URL}/icons/clouds_cloudy_forecast_rain_icon.svg`,
    '10': `${process.env.PUBLIC_URL}/icons/clouds_cloudy_forecast_rain_icon.svg`,
    '11': `${process.env.PUBLIC_URL}/icons/clouds_cloudy_forecast_rain_icon.svg`,
    '12': `${process.env.PUBLIC_URL}/icons/clouds_cloudy_forecast_rain_icon.svg`,
    '13': `${process.env.PUBLIC_URL}/icons/clouds_cloudy_forecast_rain_icon.svg`,
    '14': `${process.env.PUBLIC_URL}/icons/clouds_cloudy_forecast_rain_icon.svg`,
    '15': `${process.env.PUBLIC_URL}/icons/clouds_night_storm_icon.svg`,
    '16': `${process.env.PUBLIC_URL}/icons/clouds_night_storm_icon.svg`,
    '17': `${process.env.PUBLIC_URL}/icons/clouds_night_storm_icon.svg`,
    '18': `${process.env.PUBLIC_URL}/icons/clouds_night_storm_icon.svg`,
    '19': `${process.env.PUBLIC_URL}/icons/clouds_cloudy_rain_sunny_icon.svg`,
    '20': `${process.env.PUBLIC_URL}/icons/clouds_cloudy_forecast_rain_icon.svg`,
    '21': `${process.env.PUBLIC_URL}/icons/clouds_night_storm_icon.svg`,
    '22': `${process.env.PUBLIC_URL}/icons/clouds_night_storm_icon.svg`,
    '29': `${process.env.PUBLIC_URL}/icons/clouds_cloudy_forecast_rain_icon.svg`,
    '30': `${process.env.PUBLIC_URL}/icons/clouds_cloudy_forecast_rain_icon.svg`,
    '33': `${process.env.PUBLIC_URL}/icons/clouds_cloudy_forecast_rain_icon.svg`,
    '34': `${process.env.PUBLIC_URL}/icons/clouds_night_storm_icon.svg`,
}

export default function WeatherInfo(props) {
    const { userName } = props
    const navigate = useNavigate()

    const [time, setTime] = useState(formatDate(new Date()))

    const [loading, setLoading] = useState(true);

    const [location, setLocation] = useState({ latitude: null, longitude: null })
    const [area, setArea] = useState({ city: "臺中市", suburb: "" })

    const [weatherDescription, setWeatherDescription] = useState("")
    const [temperature, setTemperature] = useState({ minTemp: null, maxTemp: null })
    const [weatherIcon, setWeatherIcon] = useState("")

    // 載入時間
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(formatDate(new Date()))
        }, 1000)

        return () => {
            clearInterval(timer) // 當卸載組件，要關掉定時器
        }
    }, [])

    // 載入定位或預設位置的天氣資訊
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);  // 開始加載

            // 預設的地區天氣資訊
            const fetchDefaultWeather = async () => {
                try {
                    const data = await getWeatherData("臺中市")
                    setWeatherDescription(data.description);
                    setTemperature({
                        minTemp: data.minTemp,
                        maxTemp: data.maxTemp
                    })
                    // 取得對應的天氣 icon 路徑
                    const weatherValue = data.value
                    setWeatherIcon(weartherIconList[weatherValue])
                }
                catch (error) {
                    console.error('獲取預設地區的天氣資料出錯:', error);
                }
            }

            // 定位的地區天氣資訊
            if ("geolocation" in navigator) {
                try {
                    // 取得位置 ( 因為非同步，所以外面的函式要用 async，等到接收到資料再 await )
                    const position = await new Promise((resolve, reject) =>
                        navigator.geolocation.getCurrentPosition(resolve, reject)
                    )

                    // 取得經緯度
                    const latitude = position.coords.latitude
                    const longitude = position.coords.longitude
                    setLocation({ latitude, longitude })

                    // 更新經緯度轉換後的城市名稱 ( 因為非同步，所以外面的函式要用 async，等到接收到資料再 await )
                    const { cityName, suburbName } = await transferCityName(latitude, longitude)
                    const validCityName = cityName || "臺中市";
                    setArea({ city: validCityName, suburb: suburbName })

                    // 取得天氣資訊 ( 因為非同步，所以外面的函式要用 async，等到接收到資料再 await )
                    const weatherData = await getWeatherData(validCityName)
                    setWeatherDescription(weatherData.description);
                    setTemperature({
                        minTemp: weatherData.minTemp,
                        maxTemp: weatherData.maxTemp
                    })

                    // 取得對應的天氣 icon 路徑
                    const weatherValue = weatherData.value
                    setWeatherIcon(weartherIconList[weatherValue])
                }
                catch (error) {
                    console.error('獲取定位或天氣資料出錯:', error);
                    await fetchDefaultWeather()
                }
            }
            else {
                console.log('@@--瀏覽器不支援Geolocation API');
                await fetchDefaultWeather()
            }
            setLoading(false);  // 完成加載
        }
        fetchData()
    }, [])

    return (
        <div id='baseInfo' className='text-secondary'>
            <h2 className='text-4xl lg:text-3xl md:text-2xl'>您好！<span className="text-primary">{userName}</span></h2>
            <div className='text-lg my-6 lg:text-base'>
                <p>位置：{loading ? ("---") : (`${area.city} ${area.suburb}`)}</p>
                <p>時間：{time}</p>
                <p>氣溫：{loading ? ("---") : (`${temperature.minTemp}℃~${temperature.maxTemp}℃`)}</p>
                <p className='flex items-center'>天氣：{loading ? ("---") : (<>{weatherDescription}<img src={weatherIcon} alt="weather icon" width={42} /></>)}</p>
            </div>
            <button onClick={() => navigate('record')} className='btn-base-oval flex items-center gap-1'>
                <span>記帳去</span>
                <ArrowRightIcon width={24} />
            </button>
        </div>
    )
}
