import React from 'react'
import { Link } from 'react-router-dom'

// 引入 utilities
import { calculateExpenseAmount } from '../utilities'

// 引入 icon
import { DocumentTextIcon } from '@heroicons/react/24/outline'

// --- 底下開始撰寫 ---

export default function CategoryCard(props) {
    const { categoryObj,notShowOverviewBtn } = props
    const spendTotal = calculateExpenseAmount(categoryObj.category_id)
    const remainTotal = Number(categoryObj.category_budget - spendTotal)

    return (
        <div
            id='categoryCard'
            className='categoryCard bg-lightAccent2 p-4 drop-shadow-lg'
            style={{ '--category-color': categoryObj.category_color }}
        >
            <div className='flex items-center justify-between mb-2'>
                <h3 className='font-bold text-lg text lg:text-base' style={{ color: `${categoryObj.category_color}` }}>{categoryObj.category_name}</h3><p className='text-base'>預算：{categoryObj.category_budget}</p>
            </div>
            <progress className='w-full h-4 bg-lightAccent3' max={categoryObj.category_budget} value={spendTotal}></progress>
            <div className='flex justify-between my-2'><small className='text-sm'>已花費：{spendTotal}</small><small className='text-sm'>剩餘可用：{remainTotal}</small></div>
            {
                notShowOverviewBtn ? (
                    <></>
                ) : (
                    <div className='flex justify-center'>
                        <Link
                            to={`category/${categoryObj.category_id}`}
                            className='categoryBtn text-lightAccent1 text-base px-4 py-2 rounded flex items-center gap-1 rounded-full inline-flex'
                            style={{ backgroundColor: `${categoryObj.category_color}` }}
                        >
                            <span>類別總覽</span><DocumentTextIcon width={24} />
                        </Link>
                    </div>
                )
            }
        </div>
    )
}
