import * as XLSX from "xlsx";

const example = {
  category: [
    {
      category_id: "1",
      category_name: "伙食類",
      category_budget: 2500,
    },
    {
      category_id: "2",
      category_name: "居家生活類",
      category_budget: 4000,
    },
  ],
  expense: [
    {
      expense_id: "1001",
      expense_name: "便當",
      expense_amount: 120,
      expense_categoryId: "1",
      expense_categoryName: "伙食類",
      expense_date: "2026/01/05 07:00:00",
    },
    {
      expense_id: "1002",
      expense_name: "窗簾",
      expense_amount: 1200,
      expense_categoryId: "2",
      expense_categoryName: "居家生活類",
      expense_date: "2026/01/05 07:00:00",
    },
  ],
};

export default function DownloadExample() {
  function downloadXLSX() {
    // 類別資料
    const categorySheetData = [
      ["類別ID", "類別名稱", "類別預算"],
      ...example.category.map((item) => [
        item.category_id,
        item.category_name,
        item.category_budget,
      ]),
    ];

    // 項目資料
    const expenseSheetData = [
      ["項目ID", "項目名稱", "項目金額", "項目類別", "類別ID", "日期"],
      ...example.expense.map((item) => [
        item.expense_id,
        item.expense_name,
        item.expense_amount,
        item.expense_categoryName,
        item.expense_categoryId,
        item.expense_date,
      ]),
    ];

    // 建立 worksheet
    const categorySheet = XLSX.utils.aoa_to_sheet(categorySheetData);
    const expenseSheet = XLSX.utils.aoa_to_sheet(expenseSheetData);

    // 建立 workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, categorySheet, "類別資料");
    XLSX.utils.book_append_sheet(workbook, expenseSheet, "項目資料");

    // 匯出
    XLSX.writeFile(workbook, "匯入檔案範例.xlsx");
  }
  return (
    <div className="text-secondary">
      下載：
      <button
        onClick={downloadXLSX}
        className="text-primary cursor-pointer decoration-primary"
      >
        EXCEL 範例
      </button>
    </div>
  );
}
