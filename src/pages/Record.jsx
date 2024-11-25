import React from 'react'
import { useLoaderData, Link } from 'react-router-dom'

// 引入 utilities
import { createCategory, createExpense, fetchData, deleteSinExpense } from '../utilities'

// 引入一般組件
import AddCategory from '../components/AddCategory'
import AddExpense from '../components/AddExpense'
import ExpenseForm from '../components/ExpenseForm'

// 引入 toast
import { toast } from 'react-toastify'

// 引入 icon
import { HomeIcon, TrashIcon } from '@heroicons/react/24/outline'

// --- 底下開始撰寫 ---

// loader
export function recordLoader() {
  const category = fetchData('category');
  const expense = fetchData('expense');
  return { category, expense }
}

// action
export async function recordAction({ request }) {
  const data = await request.formData()
  const { _action, ...values } = Object.fromEntries(data) // 取值並轉換成物件

  if (_action === "add_new_category") {
    try {
      createCategory(values)
      return toast.success(`${values.categoryName} 新增成功！`)
    }
    catch {
      throw new Error('新增類別有問題...QQ')
    }
  }
  else if (_action === "add_new_expense") {
    try {
      createExpense(values)
      return toast.success(`${values.expenseName} 新增成功！`)
    }
    catch {
      throw new Error('新增項目有問題...QQ')
    }
  }
  else if (_action === "delete_single_expense") {
    try {
      deleteSinExpense(values.expense_id)
      return toast.success(`${values.expense_name} 刪除成功！`)
    }
    catch {
      throw new Error('刪除項目有問題...QQ')
    }
  }
}

export default function Record() {
  const data = useLoaderData() //避免了重複呼叫 useLoaderData()
  const category = data.category || []
  const expense = data.expense || []

  return (
    <>
      <section id="record" className='flex flex-col'>
        <h2 className='text-secondary text-4xl lg:text-3xl'>新增花費</h2>
        <div className='flex gap-8 lg:flex-wrap'>
          <AddCategory />
          <AddExpense category={category} />
        </div>
      </section>

      <div id="background" className='background bg-right bg-no-repeat bg-contain w-full h-[4rem] my-4 md:h-[3rem] sm:h-[2rem]' style={{ backgroundImage: `url('/assets/bg_1.svg')` }}></div>
      {
        expense.length > 0 ? (
          <ExpenseForm expense={expense} />
        ) : (
          <div className='flex justify-center mt-8'>
            <Link to="/" className='btn-base-oval flex items-center gap-1 w-auto self-center'>
              <span>回主畫面</span>
              <HomeIcon width={24} />
            </Link>
          </div>
        )
      }
    </>

  )
}
