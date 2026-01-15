import { Link } from "react-router-dom";

// 引入 utilities
import { calculateExpenseAmount } from "../utilities";

// 引入 icon
import { DocumentTextIcon } from "@heroicons/react/24/outline";

import { ReactComponent as CategoryCardBg } from "../../src/assets/categoryCard_bg.svg";

// --- 底下開始撰寫 ---

export default function CategoryCard({
  categoryData,
  notShowOverviewBtn = null,
}) {
  const {category_id, category_budget,category_color ,category_name} = categoryData
  const spendTotal = calculateExpenseAmount(category_id);
  const remainTotal = Number(category_budget - spendTotal);

  return (
    <div
      id="categoryCard"
      className=" relative categoryCard bg-lightAccent1 p-4 border border-gray-200 rounded-xl"
      style={{ "--category-color": category_color }}
    >
      {/* Bg */}
      <CategoryCardBg className="absolute z-0 right-0 top-0" />

      <div className="relative flex flex-col gap-y-2 z-10">
        {/* Card Title & Budget */}
        <div className="flex items-center justify-between mb-2 ">
          <h3
            className="font-medium text-2xl"
            style={{ color: `${category_color}` }}
          >
            {category_name}
          </h3>

          <p className="flex items-baseline gap-x-2 text-sm text-gray-800">
            預算
            <span className="text-xl text-gray-900">
              {category_budget}
            </span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-4 bg-lightAccent3 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{
              width: `${(spendTotal / category_budget) * 100}%`,
              backgroundColor: `${category_color}`,
            }}
          />
        </div>

        {/* Cost Info */}
        <div className="flex justify-between my-2">
          <p className="text-sm space-x-2">
            <span>已花費</span>
            <span>{spendTotal}</span>
          </p>
          <p className="text-sm space-x-2">
            <span>剩餘可用</span>
            <span>{remainTotal}</span>
          </p>
        </div>

        {/* Action */}
        {notShowOverviewBtn ? (
          <></>
        ) : (
          <div className="flex justify-center">
            <Link
              to={`category/${category_id}`}
              className="categoryBtn text-lightAccent1 text-base px-4 py-2 rounded flex items-center gap-1 rounded-full inline-flex"
              style={{ backgroundColor: `${category_color}` }}
            >
              <span>類別總覽</span>
              <DocumentTextIcon width={24} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
