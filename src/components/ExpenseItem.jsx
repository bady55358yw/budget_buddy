import React from 'react'
import { Form } from 'react-router-dom'

// 引入 icon
import { TrashIcon } from '@heroicons/react/24/outline'

// --- 底下開始撰寫 ---

export default function ExpenseItem(props) {
    const { expenseItem,notShowCategory } = props

    return (
        <tr >
            <td>{expenseItem.expense_name}</td>
            <td>{expenseItem.expense_amount}</td>
            <td>{expenseItem.expense_date}</td>
            {notShowCategory? <td></td> :(<td>{expenseItem.expense_categoryName}</td>)}
            <td>
                <Form method='post'>

                    {/* action判斷點 */}
                    <input type="hidden" name="_action" value="delete_single_expense" />
                    <input type="hidden" name="expense_id" value={expenseItem.expense_id} />
                    <input type="hidden" name="expense_name" value={expenseItem.expense_name} />

                    <button type="submit" className='btn-warning-stroke-sqa'>
                        <TrashIcon width={24} />
                    </button>
                </Form>
            </td>
        </tr>
    )
}
