import React, { useEffect } from 'react'
import { useParams, useLoaderData, Link, Form, redirect, useNavigate } from 'react-router-dom'

// 引入utilites
import { fetchData, deleteSinCategory, deleteMatchExpense, deleteSinExpense, createExpense } from '../utilities'

// 引入一般組件
import CategoryItem from '../components/CategoryCard'
import AddExpense from '../components/AddExpense'
import ExpenseForm from '../components/ExpenseForm'

// 引入 icon
import { HomeIcon, TrashIcon } from '@heroicons/react/24/outline'

// 引入 toast
import { toast } from 'react-toastify'

// --- 底下開始撰寫 ---

// loader
export function categoryLoader() {
  const category = fetchData("category") || []
  const expense = fetchData("expense") || []
  return { category, expense } //因為回傳是物件，所以取出時要用此名稱(key)去取值
}

// action
export async function categoryAction({ request }) {
  const data = await request.formData()
  const { _action, ...values } = Object.fromEntries(data)

  if (_action === "delete_single_category") {
    try {
      deleteSinCategory(values.category_id)
      deleteMatchExpense(values.category_id)
      toast.success(`${values.category_name} 刪除成功！`)
      return redirect("/")
    }
    catch {
      throw new Error('刪除類別有問題...QQ')
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
  else if (_action === "add_new_expense") {
    try {
      createExpense(values)
      return toast.success(`${values.expenseName} 新增成功！`)
    }
    catch {
      throw new Error('新增項目有問題...QQ')
    }
  }
}

export default function Category() {
  const { id } = useParams()
  const { category, expense } = useLoaderData()

  const navigate = useNavigate()

  const categoryObj = category.find(item => id === item.category_id)
  const filterCategory_arr = category.filter(item => id === item.category_id)
  const filterExpense_arr = expense.filter(item => id === item.expense_categoryId)

  useEffect(() => {
    if (!categoryObj) {
      navigate('/error')
    }
  }, [categoryObj, navigate])

  function checkDeleteCategory(e) {
    if (!window.confirm("會將底下的項目明細一併刪除，確定刪除類別?")) {
      e.preventDefault()
    }
  }

  return (
    <>
      {
        categoryObj && (
          <>
            <section id="categoryOverview" className='flex-col'>
              <div className='flex items-center gap-4'>
                <h2 className='text-secondary text-4xl lg:text-3xl'>
                  <span style={{ color: `${categoryObj.category_color}` }}>{categoryObj.category_name}</span>
                  類別總覽
                </h2>
                <Form method='post' onSubmit={checkDeleteCategory}>

                  {/* 給 action 的資料 */}
                  <input type="hidden" name='_action' value="delete_single_category" />
                  <input type="hidden" name='category_id' value={categoryObj.category_id} />
                  <input type="hidden" name='category_name' value={categoryObj.category_name} />

                  <button className='btn-warning-stroke flex items-center gap-1 w-auto self-center' type='submit'>
                    <span>刪除類別</span>
                    <TrashIcon width={24} />
                  </button>
                </Form>
              </div>

              <div className='flex items-start gap-x-12'>
                <CategoryItem categoryObj={categoryObj} notShowOverviewBtn={true} />
                <AddExpense category={filterCategory_arr} categoryName={categoryObj.category_name} categoryColor={categoryObj.category_color} />
              </div>
            </section>

            {
              filterExpense_arr.length > 0 ?
                (
                  <ExpenseForm expense={filterExpense_arr} notShowCategory={true} />
                )
                : (
                  <div className='flex justify-center mt-8'>
                    <Link to="/" className='btn-primary-stroke flex items-center gap-1 w-auto self-center'>
                      <span>回主畫面</span>
                      <HomeIcon width={24} />
                    </Link>
                  </div>
                )
            }
          </>
        )
      }
    </>
  )
}
