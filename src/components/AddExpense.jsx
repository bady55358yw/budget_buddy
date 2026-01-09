import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-router-dom'

// 引入 pubsub-js
import PubSub from 'pubsub-js'

// 引入 icon
import { PlusCircleIcon } from '@heroicons/react/24/outline'

// 引入 utilities
import { verifyExpense } from '../utilities'

// --- 底下開始撰寫 ---

export default function AddExpense(props) {
    const { category, categoryName, categoryColor } = props

    const [formData, setFormData] = useState({
        expenseName: "",
        expenseAmount: "",
        expenseCategory: category?.[0]?.category_id || ""
    })
    const [errorMsg, setErrorMsg] = useState({})

    useEffect(() => {
        // 訂閱事件
        const token = PubSub.subscribe('updateCategory', (_, data) => {
            // 當事件觸發時，更新狀態
            setFormData((prevState)=>({
                ...prevState,
                expenseCategory:data
            }));
        });

        // 清理訂閱
        return () => {
            PubSub.unsubscribe(token);
        };
    }, []);

    function handleChange(e) {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    function handleSubmit(e) {
        const verifyResult = verifyExpense(formData)

        if (verifyResult) {
            e.preventDefault()
            setErrorMsg(verifyResult)
        }
        else {
            setFormData({
                expenseName: "",
                expenseAmount: "",
                expenseCategory: category?.[0]?.category_id || ""
            })
            setErrorMsg({})
        }
    }

    return (
        <div id="addExpense" className='text-secondary bg-lightAccent1 drop-shadow-xl p-5 rounded-2xl basis-1/2 lg:basis-full'>
            <h3 className='mb-2 text-xl lg:text-lg font-bold'>
                {
                    categoryName ? (
                        <><span style={{ color: categoryColor }}>{categoryName}</span>的項目</>
                    ) : ("項目")
                }
            </h3>

            <Form method='post' onSubmit={handleSubmit}>
                <div className='p-4 border-dashed border-secondary border-3 rounded-lg flex flex-col gap-4'>
                    <div className='flex gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-bold'>項目名稱</label>
                            <input
                                type="text"
                                name='expenseName'
                                value={formData.expenseName}
                                onChange={handleChange}
                                placeholder='如: 咖啡, 火車, 窗簾...'
                                className='border-2 border-solid border-primaryLight2 rounded w-full p-1' />
                            <p className='text-warning text-sm'>{errorMsg.expenseName?.[0]}</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-bold'>項目金額</label>
                            <input
                                type="number" min={0} step={1}
                                name='expenseAmount'
                                value={formData.expenseAmount}
                                onChange={handleChange}
                                placeholder='如: 50,100,500...'
                                className='border-2 border-solid border-primaryLight2 rounded w-full p-1' />
                            <p className='text-warning text-sm'>{errorMsg.expenseAmount?.[0]}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className='font-bold'>項目類別</label>
                        <select
                            name="expenseCategory"
                            className='border-2 border-solid border-primaryLight2 rounded w-full p-1'
                            value={formData.expenseCategory}
                            onChange={handleChange}
                        >
                            {
                                category.map((item) => {
                                    return <option key={item.category_id} value={item.category_id}>{item.category_name}</option>
                                })
                            }

                        </select>
                        <p className='text-warning text-sm'>{errorMsg.expenseCategory}</p>
                    </div>

                    {/* action 判斷點 */}
                    <input type="hidden" name='_action' value="add_new_expense" />

                    <button className='btn-base-oval items-center gap-1 mx-auto'>
                        <span>新增項目</span>
                        <PlusCircleIcon width={24} />
                    </button>
                </div>
            </Form>

        </div>
    )
}
