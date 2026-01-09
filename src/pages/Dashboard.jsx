import React from 'react'
import { useLoaderData } from 'react-router-dom'

// 引入 utilities
import { fetchData, deleteSinExpense } from '../utilities'

// 引入一般組件
import Login from '../components/Login'
import CategoryForm from '../components/CategoryForm'
import ExpenseForm from '../components/ExpenseForm'
import CategoryChart from '../components/CategoryChart'
import WeatherInfo from '../components/WeatherInfo'
import Note from '../components/Note'

// 引入 toast
import { toast } from 'react-toastify'

// --- 底下開始撰寫 ---

// loader 載入資料
export function dashboardLoader() {
    const userName = fetchData("userName")
    const category = fetchData("category")
    const expense = fetchData("expense")
    return { userName, category, expense } //因為回傳是物件，所以取出時要用此名稱(key)去取值
}

// action 寫入資料
export async function dashboardAction({ request }) {
    const data = await request.formData()
    // 除了 _action，其他值都放入物件 ( 物件名稱為 values )
    const { _action, ...values } = Object.fromEntries(data)

    if (_action === "delete_single_expense") {
        try {
            deleteSinExpense(values.expense_id)
            return toast.success(`${values.expense_name}，刪除成功！`)
        }
        catch {
            throw new Error('刪除項目有問題...QQ')
        }
    }
}

export default function Dashboard() {
    const { userName, category, expense } = useLoaderData() // 從loader載入資料

    return (
        <>
            {userName ?
                (
                    <>
                        <section id="summaryHeader" className='flex-col gap-4 md:flex-wrap md:items-center'>
                            <h2 className='text-4xl lg:text-3xl md:text-2xl'><span className="text-primary">{userName}</span> 的記帳本</h2>
                            <div className='flex gap-4 flex-wrap'>
                                <WeatherInfo />
                                {expense && expense.length > 0 && (
                                    <CategoryChart category={category} />
                                )}
                                <Note category={category || []} />
                            </div>
                        </section>

                        <div id="background" className='background bg-right bg-no-repeat bg-contain w-full h-[4rem] my-4 md:h-[3rem] sm:h-[2rem]' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/bg_1.svg')` }}></div>

                        {category && category.length > 0 && (
                            <>
                                <CategoryForm category={category} expense={expense} />

                                <div id="background" className='background bg-left bg-no-repeat bg-contain w-full h-[4rem] my-4 md:h-[3rem] sm:h-[2rem]' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/bg_2.svg')` }}></div>

                                {expense && (
                                    <ExpenseForm show7Items={true} expense={expense} />
                                )}
                            </>
                        )}
                    </>
                ) :
                (
                    <Login />
                )
            }
        </>
    )
}
