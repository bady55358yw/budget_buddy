// 引入 xlsx
import * as XLSX from "xlsx";

// 引入 utilities
import { filterData } from "../utilities";

// --- 底下開始撰寫 ---

export default function ExportData(props) {
  const { data } = props;
  const newData = filterData(data);

  function exportJSON() {
    // 將資料轉成 JSON 格式的字串
    const dataStr = JSON.stringify(newData);
    // 創建一個 Blob 物件來封裝資料，並設定 MIME 類型為 application/json
    const blob = new Blob([dataStr], { type: "application/json" });
    // 使用 URL.createObjectURL 創建一個指向該 Blob 的 URL
    const url = URL.createObjectURL(blob);

    // 創建一個隱藏的 <a> 元素來觸發下載
    const link = document.createElement("a");
    link.href = url; // 設定下載的 URL
    link.download = "budget.json"; // 設置下載檔案名稱
    link.click(); // 自動觸發點擊事件

    // 下載完成後，使用 URL.revokeObjectURL() 釋放 URL 資源，避免內存洩漏
    URL.revokeObjectURL(url);
  }

  function exportXLSX() {
    // 類別資料
    const categorySheetData = [
      ["類別ID", "類別名稱", "類別預算"],
      ...newData.category.map((item) => [
        item.category_id,
        item.category_name,
        item.category_budget,
      ]),
    ];

    // 項目資料
    const expenseSheetData = [
      ["項目ID", "項目名稱", "項目金額", "項目類別", "類別ID", "日期"],
      ...newData.expense.map((item) => [
        item.expense_id,
        item.expense_name,
        item.expense_amount,
        item.expense_categoryName,
        item.expense_categoryId,
        item.expense_date,
      ]),
    ];
    console.log(categorySheetData)
    console.log(expenseSheetData)

    // 建立 worksheet
    const categorySheet = XLSX.utils.aoa_to_sheet(categorySheetData);
    const expenseSheet = XLSX.utils.aoa_to_sheet(expenseSheetData);

    // 建立 workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, categorySheet, "類別資料");
    XLSX.utils.book_append_sheet(workbook, expenseSheet, "項目資料");

    // 匯出
    XLSX.writeFile(workbook, "記帳明細.xlsx");
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={exportJSON}
        className="btn-neytral-stroke flex items-center gap-1"
      >
        匯出檔案-JSON
      </button>
      <button
        onClick={exportXLSX}
        className="btn-neytral-stroke flex items-center gap-1"
      >
        匯出檔案-EXCEL
      </button>
    </div>
  );
}
