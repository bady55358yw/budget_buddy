import React, { useState, useEffect, createContext,useMemo } from 'react'

// 引入 utilities
import { transferCityName, getWeatherData } from '../utilities'

// 引入天氣 icon 清單
import {weartherIconList} from '../datas/weatherIcon'

// 預先載入天氣和定位
export const WeatherContext = createContext()

export default function WeatherProvider({children}) {
    
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState({ latitude: null, longitude: null })
    const [area, setArea] = useState({ city: "臺中市", suburb: "" })
    const [weather, setWeather] = useState(
        {
            description: "",
            temperature: { minTemp: null, maxTemp: null },
            icon: ""
        }
    )

    // 載入定位和預設位置的天氣資訊
    useEffect(() => {
        const fetchCityData = async () => {
            setLoading(true);  // 開始加載

            if ("geolocation" in navigator) {
                try {
                    // 取得位置 ( 因為非同步，所以外面的函式要用 async，等到接收到資料再 await )
                    const position = await new Promise((resolve, reject) =>
                        navigator.geolocation.getCurrentPosition(resolve, reject)
                    )

                    // 取得經緯度
                    const latitude = position.coords.latitude
                    const longitude = position.coords.longitude
                    setLocation(prev => prev.latitude === latitude && prev.longitude ===longitude? prev:{latitude,longitude})

                    // 更新經緯度轉換後的城市名稱 ( 因為非同步，所以外面的函式要用 async，等到接收到資料再 await )
                    const { cityName, suburbName } = await transferCityName(latitude, longitude)
                    const validCityName = cityName || "臺中市";
                    setArea(prev => prev.city === validCityName && prev.suburb === suburbName? prev : {city:validCityName,suburb:suburbName})

                    // 取得天氣資訊 ( 因為非同步，所以外面的函式要用 async，等到接收到資料再 await )
                    await fetchWeather(validCityName)
                }
                catch (error) {
                    console.error('獲取定位或天氣資料出錯:', error);
                    // 如果定位失敗，使用預設地區
                    await fetchWeather("臺中市")
                }
            } else {
                console.log('@@--瀏覽器不支援Geolocation API');
                // 如果瀏覽器不允許定位或不支援Geolocation API，使用預設地區
                await fetchWeather("臺中市")
            }
            setLoading(false);  // 完成加載
        }
        fetchCityData()

        const fetchWeather = async (cityName) => {
            try {
                const data = await getWeatherData(cityName)
                setWeather({
                    description: data.description,
                    temperature: {
                        minTemp: data.minTemp,
                        maxTemp: data.maxTemp
                    },
                    icon: weartherIconList[data.value]
                })
            }
            catch (error) {
                console.log('@@--', `獲取 ${cityName} 的天氣資料出錯:`, error);
            }
        }
    }, [])

    // 使用 useMemo 優化 Context
    const contextValue = useMemo(()=>{
        return {loading,area,weather}
    },[loading, area, weather])

    return (
        <WeatherContext.Provider value={contextValue}>
            {children}
        </WeatherContext.Provider>
    )
}
