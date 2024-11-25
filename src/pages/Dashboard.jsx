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
            {
                userName ?
                    (
                        <>
                            <section id="summaryHeader" className='gap-28 lg:gap-8 md:flex-wrap items-center'>
                                <WeatherInfo userName={userName}/>
                                {
                                    expense && expense.length > 0 && (
                                        <div className='max-w-[24rem] sm:max-w-[16rem] py-4 rounded-[24px]'>
                                            <CategoryChart category={category} className="w-full" />
                                        </div>
                                    )
                                }
                            </section>

                            <div id="background" className='background bg-right bg-no-repeat bg-contain w-full h-[4rem] my-4 md:h-[3rem] sm:h-[2rem]' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/bg_1.svg')` }}></div>

                            {category && category.length > 0 && (
                                <>
                                    <CategoryForm category={category} />

                                    <div id="background" className='background bg-left bg-no-repeat bg-contain w-full h-[4rem] my-4 md:h-[3rem] sm:h-[2rem]' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/bg_2.svg')` }}></div>

                                    {
                                        expense && (
                                            <ExpenseForm show7Items={true} expense={expense} />
                                        )
                                    }
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
