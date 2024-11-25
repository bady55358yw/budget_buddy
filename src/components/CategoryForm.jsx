import React from 'react'

// 引入一般組件
import CategoryItem from '../components/CategoryItem'

// --- 底下開始撰寫 ---

export default function CategoryForm(props) {
    const { category } = props

    return (
        <section id="categoryItem" className='flex-col text-secondary'>
            <h2 className='text-4xl lg:text-3xl'>類別預算</h2>
            <div className='flex flex-row flex-wrap gap-8 w-full'>
                {
                    category && (
                        category.map((item => {
                            return (
                                <CategoryItem categoryObj={item} key={item.category_id} />
                            )
                        }))
                    )
                }
            </div>
        </section>
    )
}
