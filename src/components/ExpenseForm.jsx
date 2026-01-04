import React from 'react'
import { Link } from 'react-router-dom'

// 引入一般組件
import ExpenseItem from '../components/ExpenseItem'

// 引入 icon
import { HomeIcon, EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline'

// --- 底下開始撰寫 ---

export default function ExpenseForm(props) {
    const { expense, show7Items, notShowCategory } = props

    return (
        <section id="expenseForm" className='flex-col text-secondary space-y-2'>
            <h2 className='text-4xl lg:text-3xl'>
                項目明細 &nbsp;
                {show7Items && expense.length>7 ?
                    (
                        <small className='text-base text-gray-400'>{`( 目前僅顯示 7 項，總共 ${expense.length} 項 )`}</small>
                    ) :
                    (
                        <small className='text-base text-gray-400'>{`( 總共 ${expense.length} 項 )`}</small>
                    )
                }
            </h2>
            <div className='overflow-x-auto mb-8'>
                <table id="expenseDetailTable" className='table-auto w-full'>
                    <thead>
                        <tr>
                            {
                                ["項目", "金額", "日期", notShowCategory ? "" : "類別", "刪除"].map((item, index) => {
                                    return (<th key={index} className='text-gray-700 font-medium'>{item}</th>)
                                })
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {
                            show7Items ? (
                                expense.slice(0, 7).map((item) => {
                                    return (<ExpenseItem key={item.expense_id} expenseItem={item} />)
                                })
                            ) : (
                                expense.map((item) => {
                                    return (<ExpenseItem key={item.expense_id} expenseItem={item} notShowCategory={notShowCategory} />)
                                })
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                !show7Items ? (
                    <Link to="/" className='btn-primary-stroke flex items-center gap-1 w-auto self-center'>
                        <span>回主畫面</span>
                        <HomeIcon width={24} />
                    </Link>

                ) : (
                    expense.length > 7 ? (
                        <Link to="/expense" className='btn-primary-stroke flex items-center gap-1 w-auto self-center'>
                            <span>點我看更多</span>
                            <EllipsisHorizontalCircleIcon width={24} />
                        </Link>
                    ) : (
                        <div></div>
                    )
                )
            }
        </section>
    )
}
