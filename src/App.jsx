import React from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'

// 引入 toast 外殼
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// 引入 css
import '../src/output.css'

// 引入路由組件與方法
import Main, { mainLoader } from './layouts/Main'
import Dashboard, { dashboardLoader, dashboardAction } from './pages/Dashboard'
import Record, { recordLoader, recordAction } from './pages/Record'
import Category, { categoryLoader, categoryAction } from './pages/Category'
import Expense, { expenseLoader, expenseAction } from './pages/Expense'
import Error from './pages/Error'

// Actions
import { logoutAction } from './actions/logout'

// --- 底下開始撰寫 ---

const router = createHashRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader, // 載入資料
        action: dashboardAction, // 存入資料
        errorElement: <Error />
      },
      {
        path: "record",
        element: <Record />,
        loader: recordLoader,
        action: recordAction,
        errorElement: <Error />
      },
      {
        path: "category/:id",
        element: <Category />,
        loader: categoryLoader,
        action: categoryAction,
        errorElement: <Error />
      },
      {
        path: "expense",
        element: <Expense />,
        loader: expenseLoader,
        action: expenseAction,
        errorElement: <Error />
      },
      {
        path: "logout",
        action: logoutAction,
        errorElement: <Error />
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  }
],
  {
    future: {// 設置為 true 來消除提示
      v7_skipActionErrorRevalidation: true,
      v7_partialHydration: true,
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
    },
  }
)

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}
