功能說明：<br>
記錄每筆消費項目的支出，並依類別進行分類。使用者可以快速查看各類別的花費佔比，並設置預算進行控管，隨時掌握是否超過預算

技術說明：
1. 使用 React Router 來配置路由、處理載入資料和執行 action
2. 使用 localStorage 儲存使用者名稱、類別、項目...等資料
3. 用 Geolocation API 來取得使用者當前的位置
4. 用 Axios 串接中央氣象 Opendata API 來取得天氣資料
5. 使用 Validate.js 套件來做驗證表單輸入 ( 如：使用者名稱、信箱、類別名稱、項目金額...等 ) 是否符合格式
6. 使用 C3.js 套件來產生圖表 ( 如：類別花費的甜甜圈圖表 )
7. 使用 Tailwind CSS 來管理 CSS 和 RWD

網址：[Buddy Budget 記帳小幫手](https://bady55358yw.github.io/budget_buddy/#/)
