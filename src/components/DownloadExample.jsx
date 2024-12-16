import React from 'react'
import {formatDataToCSV} from '../utilities'

const example = {
    "category": [
      {
        "category_id": "1",
        "category_name": "伙食類",
        "category_budget": 2500
      },
      {
        "category_id": "2",
        "category_name": "居家生活類",
        "category_budget": 4000
      },
    ],
    "expense": [
      {
        "expense_id": "1001",
        "expense_name": "便當",
        "expense_amount": 120,
        "expense_categoryId": "1",
      },
      {
        "expense_id": "1002",
        "expense_name": "窗簾",
        "expense_amount": 1200,
        "expense_categoryId": "2",
      },
    ]
  }
  
export default function DownloadExample() {

  function downloadData(){
    // 將資料轉成 cvs 格式
    const cvsContent = formatDataToCSV(example)
    // 創建一個 Blob 物件來封裝資料，並設定 MIME 類型為 text/csv
    const blob = new Blob([cvsContent], { type: 'text/csv;charset=utf-8' })
    // 使用 URL.createObjectURL 創建一個指向該 Blob 的 URL
    const url = URL.createObjectURL(blob)

    // 創建一個隱藏的 <a> 元素來觸發下載
    const link = document.createElement('a')
    link.href = url // 設定下載的 URL
    link.download = 'budget.csv'// 設置下載檔案名稱
    link.click()  // 自動觸發點擊事件

    // 下載完成後，使用 URL.revokeObjectURL() 釋放 URL 資源，避免內存洩漏
    URL.revokeObjectURL(url)
  }
  return (
    <div className='text-secondary'>下載：<a onClick={downloadData} className='text-primary cursor-pointer hover:underline underline-offset-8 decoration-primary'>匯入檔案範例</a></div>
  )
}
