import React from 'react'

// 引入 utilities
import {filterData,formatDataToCSV} from '../utilities'

// --- 底下開始撰寫 ---

export default function ExportData(props) {
    const { data } = props
    const newData = filterData(data)

    function exportJSON() {

        // 將資料轉成 JSON 格式的字串
        const dataStr = JSON.stringify(newData)
        // 創建一個 Blob 物件來封裝資料，並設定 MIME 類型為 application/json
        const blob = new Blob([dataStr], { type: 'application/json' })
        // 使用 URL.createObjectURL 創建一個指向該 Blob 的 URL
        const url = URL.createObjectURL(blob)

        // 創建一個隱藏的 <a> 元素來觸發下載
        const link = document.createElement('a')
        link.href = url // 設定下載的 URL
        link.download = 'budget.json'// 設置下載檔案名稱
        link.click()  // 自動觸發點擊事件

        // 下載完成後，使用 URL.revokeObjectURL() 釋放 URL 資源，避免內存洩漏
        URL.revokeObjectURL(url)
    }

    function exportCSV() {

        // 將資料轉成 cvs 格式
        const cvsContent = formatDataToCSV(newData)
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
        <div className='flex gap-4'>
            <button onClick={exportJSON} className='btn-base-oval flex items-center gap-1'>
                匯出檔案-JSON
            </button>
            <button onClick={exportCSV} className='btn-base-oval flex items-center gap-1'>
                匯出檔案-CSV
            </button>
        </div>

    )
}
