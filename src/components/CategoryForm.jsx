import React from 'react'

// 引入一般組件
import CategoryCard from './CategoryCard'
import ExportData from '../components/ExportData'

// --- 底下開始撰寫 ---

export default function CategoryForm(props) {
    const { category, expense } = props

    return (
        <section id="categoryItem" className='flex-col text-secondary'>
            <div className='flex items-center gap-8 sm:flex-col sm:gap-4 sm:items-baseline'>
                <h2 className='text-4xl lg:text-3xl'>類別預算</h2>
                <ExportData data={{ category, expense }} />
            </div>
            <div className='flex flex-row flex-wrap gap-8 w-full'>
                {
                    category && (
                        category.map((item => {
                            return (
                                <CategoryCard key={item.category_id} categoryObj={item} />
                            )
                        }))
                    )
                }
            </div>
        </section>
    )
}
