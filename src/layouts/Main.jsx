import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'

// 引入 utilities
import { fetchData } from '../utilities'

// 引入一般組件
import Nav from '../components/Nav'

// --- 底下開始撰寫 ---

export function mainLoader() {
    const userName = fetchData("userName")
    return { userName }
}

export default function Main() {

    const { userName } = useLoaderData()

    return (
        <div id='layout'>
            <Nav userName={userName} />
            <main>
                <Outlet />
            </main>
            {
                userName && (
                    <footer className='mt-12'>
                        <div className="footer-pic bg-bottom bg-no-repeat bg-contain w-full h-[264px]" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/bg_3.svg')` }}></div>
                    </footer>
                )
            }
        </div>
    )
}
