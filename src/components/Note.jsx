import React from 'react'

// 引入 utilities
import { calculateExpenseAmount } from '../utilities'
import { DivideIcon } from '@heroicons/react/24/outline'

export default function Note(props) {
    const { category } = props
    let reachBudget = []

    category.forEach(element => {
        const spendTotal = calculateExpenseAmount(element.category_id)
        const remainTotal = Number(element.category_budget - spendTotal)
        if (remainTotal < 0) {
            const word = `${element.category_name}：超過預算${remainTotal}`
            reachBudget = [...reachBudget, word]
        }
    })

    return (
        <div className='sec1 my-4 px-4 xl:w-full drop-shadow-lg md:mt-12'>
            <ul className='note'>
                {
                    reachBudget.length !== 0 ? (
                        reachBudget.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })
                    ) : (
                        <li>目前沒有任何花費超過預算，很棒，繼續保持!</li>
                    )

                }
            </ul>
        </div>
        // <ul className='sec1 note my-8 drop-shadow-lg xl:w-full'>
        //     {
        //         reachBudget.length !== 0 ?(
        //             reachBudget.map((item,index)=>{
        //                 return <li key={index}>{item}</li>
        //             })
        //         ):(
        //             <li>目前沒有任何花費超過預算，很棒，繼續保持!</li>
        //         )

        //     }
        // </ul>
    )
}
