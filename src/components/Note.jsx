// 引入 utilities
import { calculateExpenseAmount } from "../utilities";

// 引入客製 icon
import { ReactComponent as PieChartIcon } from "../assets/pieChart_icon.svg";

// --- 底下開始撰寫 ---

export default function Note({ category, expense }) {
  let reachBudget = [];

  category?.forEach((element) => {
    const spendTotal = calculateExpenseAmount(element.category_id);
    const remainTotal = Number(element.category_budget - spendTotal);
    if (remainTotal < 0) {
      const word = `${element.category_name}：超過預算${remainTotal}`;
      reachBudget = [...reachBudget, word];
    }
  });

  const top3Expenses = (expense||[])
    .sort((a, b) => b.expense_amount - a.expense_amount)
    .slice(0, 3);

  const items = top3Expenses.map((item, index) => ({
    step: index + 1,
    title: item.expense_name,
    price: item.expense_amount,
  }));

  const formatPrice = (value) =>
    new Intl.NumberFormat("zh-TW", {
      style: "currency",
      currency: "TWD",
      maximumFractionDigits: 0,
    }).format(value);

  const colorMap = [
    { text: "text-[#335CFF]", bg: "bg-[#EBF1FF]" },
    { text: "text-[#47C2FF]", bg: "bg-[#EBF8FF]" },
    { text: "text-[#5C5C5C]", bg: "bg-[#F5F5F5]" },
  ];

  return (
    <div className="border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-x-2">
        <PieChartIcon />
        <h6 className="text-base text-gray-700">花費統計</h6>
      </div>

      {/* 排行榜 */}
      <div className="space-y-4 mt-4">
        <p className="text-sm bg-gray-100 w-full py-1.5 px-4 text-gray-400">
          排行榜
        </p>

        <div className="w-full border-y border-gray-200 py-3">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {items.map((item, index) => {
              const color = colorMap[index];

              return (
                <div
                  key={item.step}
                  className="relative flex flex-col items-center gap-3 py-2"
                >
                  {/* 分隔線 */}
                  {index !== items.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-24 w-px bg-gray-200" />
                  )}

                  {/* 圓形數字 */}
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-lg font-medium
                    ${color.bg} ${color.text}`}
                  >
                    {item.step}
                  </div>

                  {/* 標題 */}
                  <div className="text-gray-400 text-sm">{item.title}</div>

                  {/* 金額 */}
                  <div className="text-lg text-gray-900">
                    {formatPrice(item.price)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 總結 */}
      <div className="space-y-4 mt-4">
        <p className="text-sm bg-gray-100 w-full py-1.5 px-4 text-gray-400">
          總結
        </p>

        <ul className="px-4 py-2 text-gray-700">
          {reachBudget.length !== 0 ? (
            reachBudget.map((item, index) => {
              return <li key={index}>{item}</li>;
            })
          ) : (
            <li>目前沒有任何花費超過預算，很棒，繼續保持!</li>
          )}
        </ul>
      </div>
    </div>
  );
}
