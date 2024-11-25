import React from 'react'
import { useLoaderData,useNavigate } from 'react-router-dom'

// 引入一般組件
import ExpenseForm from '../components/ExpenseForm'

// 引入 utilities
import { deleteSinExpense, fetchData } from '../utilities'

// 引入 icon
import { ArrowRightIcon } from '@heroicons/react/24/outline'

// 引入 toast
import { toast } from 'react-toastify'

// --- 底下開始撰寫 ---

// loader
export function expenseLoader() {
    const expense = fetchData('expense');
    return { expense }
}

// action
export async function expenseAction({ request }) {
    const data = await request.formData()
    const expense_id = data.get("expense_id")
    const expense_name = data.get("expense_name")

    deleteSinExpense(expense_id)
    return toast.success(`${expense_name} 刪除成功！`)
}

export default function Expense() {
    const { expense } = useLoaderData()
    const navigate = useNavigate()

    return (
        expense && expense.length > 0 ? (
            <ExpenseForm expense={expense} />
        ) : (
            <section className='justify-center flex-col items-center py-40'>
                <h2 className='text-3xl'>尚未新增項目...QQ</h2>
                <button onClick={() => navigate('/record')} className='btn-base-rec flex items-center gap-1'>
                    <span>點我新增項目</span>
                    <ArrowRightIcon width={24} />
                </button>
            </section>
        )
    )
}
