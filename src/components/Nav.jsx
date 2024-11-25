import React from 'react'
import { Link,Form } from 'react-router-dom'

// 引入 icon
import {ChartBarIcon,UserMinusIcon} from '@heroicons/react/24/outline'

// --- 底下開始撰寫 ---

export default function Nav(props) {
    // console.log('@@--userName',props.userName);
    const {userName} = props

    function checkDeleteUser(e) {
        if(!window.confirm("確定要刪除使用者？")){
            e.preventDefault()
        }
    }

    return (
        <nav id="navbar" className='bg-primary flex justify-between px-6 py-2'>
            <Link to='/' className='text-lightAccent1 flex items-center gap-1 group'>
                <ChartBarIcon width={32} />
                <span className='text-lg transition-all duration-400 group-hover:text-primaryLight2'>記帳小幫手</span>
            </Link>
            {
                userName && (
                    <Form method='post' action='/logout' onSubmit={checkDeleteUser}>
                        <button id="deleteUserBtn" className='btn-warning-oval items-center gap-1'>
                            <span>刪除帳戶</span>
                            <UserMinusIcon width={24}/>
                        </button>
                    </Form>
                )
            }
        </nav>
  )
}
