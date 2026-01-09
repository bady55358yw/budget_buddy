import React, { useContext, useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 引入 icon
import { ArrowRightIcon } from '@heroicons/react/24/outline'

// 引入context
import { WeatherContext } from '../contexts/WeatherProvider'

// 引入 utilities
import { formatDate } from '../utilities'

// --- 底下開始撰寫 ---

export default function WeatherInfo() {
    const navigate = useNavigate()
    const [time, setTime] = useState(formatDate(new Date()))
    const { loading, area, weather } = useContext(WeatherContext)

    // 載入時間
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(formatDate(new Date()))
        }, 1000)

        return () => {
            clearInterval(timer) // 當卸載組件，要關掉定時器
        }
    }, [])

    return (
        <div id='baseInfo' className='sec1 text-secondary py-4 sm:py-0'>
            <div className='text-lg my-6 lg:text-base md:mx-auto'>
                <p>位置：{loading ? ("---") : (`${area.city} ${area.suburb}`)}</p>
                <p className='whitespace-nowrap min-w-64'>時間：{time}</p>
                <p>氣溫：{loading ? ("---") : (`${weather.temperature.minTemp}℃~${weather.temperature.maxTemp}℃`)}</p>
                <p className='flex items-center'>天氣：{loading ? ("---") : (<>{weather.description}<img src={weather.icon} alt="weather icon" width={42} /></>)}</p>
            </div>
            <button onClick={() => navigate('record')} className='btn-base-oval flex items-center gap-1'>
                <span>記帳去</span>
                <ArrowRightIcon width={24} />
            </button>
        </div>
    )
}
