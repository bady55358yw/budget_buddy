// 引入 toast
import { toast } from "react-toastify";

// 引入 utilities
import { importCategory, importExpense, parseXLSX } from "../utilities";

// --- 底下開始撰寫 ---

export default function ImportData({ trigerRender }) {
  async function importXLSX(e) {
    const file = e.target.files[0];

    try {
      const data = await parseXLSX(file);
      importCategory(data.categoryData);
      importExpense(data.expenseData);

      trigerRender();
      toast.success("資料匯入成功！");
    } catch (error) {
      console.log("@@--解析 csv 檔案有問題：", error);
    }
  }

  return (
    <div className="flex items-center">
      <button
        onClick={() => document.getElementById("fileInput").click()} // 觸發隱藏的 input
        className="btn-neytral-stroke flex items-center gap-1"
      >
        匯入檔案-EXCEL
      </button>
      <input
        id="fileInput"
        style={{ display: "none" }}
        type="file"
        accept=".xlsx"
        onChange={importXLSX}
      />
    </div>
  );
}
