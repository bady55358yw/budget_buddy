import { useLoaderData } from "react-router-dom";

// 引入 utilities
import { deleteSinExpense, fetchData } from "../utilities";

// 引入一般組件
import CategoryChart from "../components/CategoryChart";
import CategoryForm from "../components/CategoryForm";
import ExpenseForm from "../components/ExpenseForm";
import Login from "../components/Login";
import Note from "../components/Note";
import WeatherInfo from "../components/WeatherInfo";

// 引入 toast
import { toast } from "react-toastify";

// --- 底下開始撰寫 ---

// loader 載入資料
export function dashboardLoader() {
  const userName = fetchData("userName");
  const category = fetchData("category");
  const expense = fetchData("expense");
  return { userName, category, expense }; //因為回傳是物件，所以取出時要用此名稱(key)去取值
}

// action 寫入資料
export async function dashboardAction({ request }) {
  const data = await request.formData();
  // 除了 _action，其他值都放入物件 ( 物件名稱為 values )
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "delete_single_expense") {
    try {
      deleteSinExpense(values.expense_id);
      return toast.success(`${values.expense_name}，刪除成功！`);
    } catch {
      throw new Error("刪除項目有問題...QQ");
    }
  }
}

export default function Dashboard() {
  const { userName, category, expense } = useLoaderData(); // 從loader載入資料

  return (
    <>
      {userName ? (
        <>
          <section
            id="summaryHeader"
            className="flex-col items-center md:items-start"
          >
            <div className="flex items-baseline text-gray-900 gap-x-2">
              <h2 className="text-4xl font-medium">{userName}</h2>{" "}
              <h6 className="text-xl">, 您好！</h6>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 w-full">
              {/* Weather */}
              <WeatherInfo />

              {/* Donut Chart */}
              {expense && expense.length > 0 && (
                <CategoryChart category={category} />
              )}

              {/* Statistics */}
              <Note category={category} expense={expense} />
            </div>
          </section>

          {category && category.length > 0 && (
            <>
              <CategoryForm category={category} expense={expense} />

              {expense && <ExpenseForm show7Items={true} expense={expense} />}
            </>
          )}
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
