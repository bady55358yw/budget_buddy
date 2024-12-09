import React from 'react'
// 引入 toast
import { toast } from 'react-toastify'

import { parseCSV, importCategory, importExpense } from '../utilities'



export default function ImportData(props) {
    const { trigerRender } = props

    async function importCSV(e) {
        const file = e.target.files[0]

        try {
            const data = await parseCSV(file)
            importCategory(data.categoryData)
            importExpense(data.expenseData)

            trigerRender()
            toast.success('資料匯入成功！')
        }
        catch (error) {
            console.log('@@--解析 csv 檔案有問題：', error);
        }
    }

    return (
        <div className='flex items-center'>
            <button
                onClick={() => document.getElementById('fileInput').click()} // 觸發隱藏的 input
                className='btn-base-oval flex items-center gap-1'
            >
                匯入檔案-CSV
            </button>
            <input id="fileInput" style={{ display: 'none' }} type="file" accept='.csv' onChange={importCSV} />
        </div>
    )
}
