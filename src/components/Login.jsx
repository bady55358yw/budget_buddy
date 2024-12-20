import React, { useRef, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'

// 引入 icon
import { UserPlusIcon,LightBulbIcon } from '@heroicons/react/24/outline'

// 引入 toast
import { toast } from 'react-toastify'

// 引入 utilities
import { createUser, verifyInput, preExisting } from '../utilities'

// --- 底下開始撰寫 ---

export default function Login() {
    const [nameMsg, setNameMsg] = useState("")
    const [emailMsg, setEmailMsg] = useState("")

    const nameRef = useRef()
    const emailRef = useRef()

    const navigate = useNavigate()

    // action 移動到自己的組件做，因為無法內聯 POST
    // 處理新增帳戶
    function handelSubmit(e) {
        e.preventDefault(); // 避免表單提交刷新頁面
        const result = verifyInput(nameRef.current.value, emailRef.current.value)

        if (result.nameErrorMsg === null && result.mailErrorMsg === null) {
            createUser(nameRef.current.value)
            navigate('/')
            return toast.success(`${nameRef.current.value} 歡迎使用！`)
        }
        else {
            setNameMsg(result.nameErrorMsg)
            setEmailMsg(result.mailErrorMsg)
        }
    }

    // 處理新增範本
    function handleClick() {
        preExisting()
        navigate('/')
        return toast.success('Charlie 歡迎使用！')
    }

    return (
        <section className='flex justify-center items-end gap-32 lg:flex-wrap'>
            <div className="bg-left-bottom bg-no-repeat bg-contain w-full max-w-[430px] h-[500px] md:h-[300px] lg:order-2" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/login_cover.png')` }}></div>
            <div className='text-secondary max-w-[22rem] lg:max-w-[18rem] lg:order-1'>
                <div className='mb-8'>
                    <h1 className='text-5xl mt-12 mb-4 font-bold whitespace-nowrap md:text-4xl'>你還在煩惱如何<br /><span className='text-primary'>管理金錢？</span></h1>
                    <p className='text-lg'>一步一步帶你開始記帳存錢，在下方輸入基本資料就開始吧！</p>
                </div>
                <Form method='post' onSubmit={handelSubmit}>
                    <div className='flex flex-col gap-8'>

                        <div className='flex flex-col'>
                            <div className='flex gap-4 items-center'>
                                <label htmlFor="" className='text-base font-semibold whitespace-nowrap'>你的名字</label>
                                <input
                                    type="text"
                                    name="userName"
                                    ref={nameRef}
                                    className='border-2 border-solid border-primaryLight2 rounded w-full p-1'
                                />
                            </div>
                            <p className='ml-20 text-warning text-sm'>{nameMsg}</p>
                        </div>

                        <div className='flex flex-col'>
                            <div className='flex gap-4 items-center'>
                                <label htmlFor="" className='text-base font-semibold whitespace-nowrap'>你的信箱</label>
                                <input
                                    type="text"
                                    name="email"
                                    ref={emailRef}
                                    className='border-2 border-solid border-primaryLight2 rounded w-full p-1'
                                />
                            </div>
                            <p className='ml-20 text-warning text-sm'>{emailMsg}</p>
                        </div>

                        <div className='flex gap-4 justify-center'>
                            <button onClick={handleClick} className='btn-base-oval flex items-center gap-1 w-auto self-center' type='button'>
                                <span>範本</span>
                                <LightBulbIcon width={24} />
                            </button>
                            <button className='btn-base-oval flex items-center gap-1 w-auto self-center' type='submit'>
                                <span>新增帳戶</span>
                                <UserPlusIcon width={24} />
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </section>
    )
}
