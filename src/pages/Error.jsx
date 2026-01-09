import React from 'react'
import { useRouteError,Link,useNavigate } from 'react-router-dom'

// 引入 icon
import {HomeIcon,ArrowUturnLeftIcon} from '@heroicons/react/24/outline'

// --- 底下開始撰寫 ---

export default function Error() {
  const errorMsg = useRouteError()
  const navigate = useNavigate()
  return (
    <>
      <section id="errorMessage" className='text-secondary flex-col items-center py-16'>
        <div>
          <h1 className='text-5xl text-center font-bold mt-12 mb-4 md:text-4xl'>Oops...你可能迷路了</h1>
          <p className='text-lg text-center'>{errorMsg?.message?errorMsg.message:"趕快回家！嗚嗚嗚...QQ"}</p>
        </div>
        <div className='flex gap-4 my-8 lg:my-16'>
          <button onClick={()=>navigate(-1)} className='btn-base-oval flex items-center gap-1 w-auto self-center'>
            <span>回上一頁 </span>
            <ArrowUturnLeftIcon width={24}/>
          </button>
          <Link to="/" className='btn-base-oval flex items-center gap-1 w-auto self-center'>
            <span>回主畫面</span>
            <HomeIcon width={24}/>
          </Link>
        </div>
      </section>
    </>
  )
}