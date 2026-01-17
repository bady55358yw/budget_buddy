# Budget Buddy

個人記帳 Web App，幫助用戶輕鬆記錄支出、分類管理、預算控制。

## Demo

🌐 [Budget Buddy 記帳小幫手](https://bady55358yw.github.io/budget_buddy/)

## 功能重點

- 支出記錄與分類：記錄每筆消費項目，依類別進行分類管理
- 預算控管與提醒：設定各類別預算，超支自動提醒
- 圖表視覺化：甜甜圈圖表直觀呈現花費佔比
- 資料匯出/匯入：支援 JSON/CSV 檔案格式，方便備份與轉移
- 天氣資訊：根據使用者位置顯示當地天氣
- 響應式設計：完美適配桌機、平板、手機等各種裝置

## 使用技術

**Frontend:**
- React 18
- React Router v6（路由與資料管理）
- Tailwind CSS（樣式與 RWD）
- Heroicons（圖示）

**Data & APIs:**
- localStorage（本地資料儲存）
- Geolocation API（位置定位）
- OpenStreetMap Nominatim API（地址反向轉換）
- CWA 中央氣象署 OpenData API（天氣資訊）

**Libraries:**
- Axios（HTTP 請求）
- Validate.js（表單驗證）
- C3.js（圖表生成）
- React Toastify（通知提示）

**Build Tools:**
- Vite
- PostCSS
- ESLint

## 安裝與啟動

### 前置需求
- Node.js (v16+)
- npm 或 yarn

### 安裝

```bash
# 進入專案目錄
cd "Budget Buddy"

# 安裝依賴
npm install
```

### 啟動開發伺服器

```bash
npm start
```

應用將在 `http://localhost:3000` 啟動

### 構建生產版本

```bash
npm run build
```

## 專案結構

```
src/
├── components/          # React 組件
│   ├── AddCategory.jsx
│   ├── AddExpense.jsx
│   ├── CategoryCard.jsx
│   ├── CategoryChart.jsx
│   ├── ExpenseForm.jsx
│   ├── ExpenseItem.jsx
│   ├── ExportData.jsx
│   ├── ImportData.jsx
│   ├── Login.jsx
│   ├── Nav.jsx
│   ├── Note.jsx
│   └── WeatherInfo.jsx
├── pages/               # 路由頁面
│   ├── Dashboard.jsx
│   ├── Category.jsx
│   ├── Expense.jsx
│   ├── Record.jsx
│   └── Error.jsx
├── layouts/             # 佈局組件
│   └── Main.jsx
├── contexts/            # React Context
│   └── WeatherProvider.jsx
├── datas/               # 靜態資料
│   ├── defaultUserData.js
│   └── weatherIcon.js
├── actions/             # 路由 Action
│   └── logout.js
├── utilities.js         # 工具函數
├── App.jsx
└── index.js
```
