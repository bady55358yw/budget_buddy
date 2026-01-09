// 引入 context
import { createContext } from 'react';

// 引入隨機碼
import { nanoid } from 'nanoid';

// 引入 axios
import axios from "axios";

// 引入 validate.js
import validate, { result } from 'validate.js';

import Papa from 'papaparse'

// --- 底下開始撰寫 ---
// 現成的預設資料
export function preExisting() {
    const uerName = 'Charlie'
    const categoryArr = [
        {
            category_id: '001',
            category_name: '伙食類',
            category_budget: 2500,
            category_color: '#77C6B3',
        },
        {
            category_id: '002',
            category_name: '居家生活類',
            category_budget: 4000,
            category_color: '#FFD37D',
        },
        {
            category_id: '003',
            category_name: '交通類',
            category_budget: 3500,
            category_color: '#7DCDF2',
        },
        {
            category_id: '004',
            category_name: '玩樂類',
            category_budget: 2000,
            category_color: '#5F5FE3',
        },
        {
            category_id: '005',
            category_name: '其他類',
            category_budget: 1000,
            category_color: '#DF7ACA',
        },
    ]
    const expenseArr = [
        {
            expense_id: nanoid(),
            expense_name: '便當',
            expense_amount: 120,
            expense_categoryId: '001',
            expense_categoryName: '伙食類',
            expense_date: '2024/11/20 17:32:00',
        },
        {
            expense_id: nanoid(),
            expense_name: '聚餐',
            expense_amount: 440,
            expense_categoryId: '004',
            expense_categoryName: '玩樂類',
            expense_date: '2024/11/19 11:00:00',
        },
        {
            expense_id: nanoid(),
            expense_name: '被搶了',
            expense_amount: 1000,
            expense_categoryId: '005',
            expense_categoryName: '其他類',
            expense_date: '2024/11/18 19:49:00',
        },
        {
            expense_id: nanoid(),
            expense_name: '衛生紙',
            expense_amount: 105,
            expense_categoryId: '002',
            expense_categoryName: '居家生活類',
            expense_date: '2024/11/18 18:08:00',
        },
        {
            expense_id: nanoid(),
            expense_name: '珍奶',
            expense_amount: 60,
            expense_categoryId: '001',
            expense_categoryName: '伙食類',
            expense_date: '2024/11/18 13:45:00',
        },
        {
            expense_id: nanoid(),
            expense_name: '火車票',
            expense_amount: 300,
            expense_categoryId: '003',
            expense_categoryName: '交通類',
            expense_date: '2024/11/16 08:30:00',
        },
        {
            expense_id: nanoid(),
            expense_name: '牛肉麵',
            expense_amount: 140,
            expense_categoryId: '001',
            expense_categoryName: '伙食類',
            expense_date: '2024/11/15 12:37:00',
        },
        {
            expense_id: nanoid(),
            expense_name: '洗面乳',
            expense_amount: 390,
            expense_categoryId: '002',
            expense_categoryName: '居家生活類',
            expense_date: '2024/11/15 11:55:00',
        },
        {
            expense_id: nanoid(),
            expense_name: '三明治',
            expense_amount: 40,
            expense_categoryId: '001',
            expense_categoryName: '伙食類',
            expense_date: '2024/11/14 06:33:00',
        },
        {
            expense_id: nanoid(),
            expense_name: '高鐵票',
            expense_amount: 1200,
            expense_categoryId: '003',
            expense_categoryName: '交通類',
            expense_date: '2024/11/13 08:30:00',
        },
        {
            expense_id: nanoid(),
            expense_name: '計程車',
            expense_amount: 700,
            expense_categoryId: '003',
            expense_categoryName: '交通類',
            expense_date: '2024/11/13 07:00:00',
        }
    ]

    localStorage.setItem("userName", JSON.stringify(uerName))
    localStorage.setItem("category", JSON.stringify(categoryArr))
    localStorage.setItem("expense", JSON.stringify(expenseArr))
}

// 取得 local storage 的資料 => getItem
export function fetchData(key) {
    return JSON.parse(localStorage.getItem(key))
}

// 刪除 local storage 的資料 => removeItem
export function deleteItem(key) {
    return localStorage.removeItem(key)
}

// 建立使用者：存入 local storage 的資料 => setItem
export function createUser(name) {
    return localStorage.setItem("userName", JSON.stringify(name))
}

// 建立類別：存入 local storage 的資料 => setItem
export function createCategory(data) {
    const randomColor = getColor()

    const newCategory = {
        category_id: nanoid(),
        category_name: data.categoryName,
        category_budget: data.categoryBudget,
        category_color: randomColor,
    }

    const categoryArr = fetchData("category") ?? [];
    const updateCategoryArr = [...categoryArr, newCategory]
    return localStorage.setItem("category", JSON.stringify(updateCategoryArr))
}

// 取得類別顏色
function getColor() {
    const color = ['#5F5FE3', '#7DCDF2', '#FFD37D', '#DF7ACA', '#77C6B3']
    let colorIndex = fetchData('colorIndex') || 0

    colorIndex = (colorIndex + 1) % color.length
    localStorage.setItem("colorIndex", JSON.stringify(colorIndex))
    return color[colorIndex]
}

// 建立項目：存入 local storage 的資料 => setItem
export function createExpense(data) {
    const categoryName = matchCategoryId(data.expenseCategory)
    const date = formatDate(new Date())

    const newExpenseObj = {
        expense_id: nanoid(),
        expense_name: data.expenseName,
        expense_amount: data.expenseAmount,
        expense_categoryId: data.expenseCategory,
        expense_categoryName: categoryName,
        expense_date: date,
    }
    const expense = fetchData("expense") ?? []
    const updateExpense = [newExpenseObj, ...expense]
    return localStorage.setItem("expense", JSON.stringify(updateExpense))
}

// 刪除單一類別
export function deleteSinCategory(id) {
    const category = fetchData("category")
    const updateCategory = category.filter(item => item.category_id !== id)
    return localStorage.setItem("category", JSON.stringify(updateCategory))
}

// 刪除類別底下的項目
export function deleteMatchExpense(id) {
    const expense = fetchData("expense")
    const updateExpense = expense.filter(item => item.expense_categoryId !== id)
    return localStorage.setItem("expense", JSON.stringify(updateExpense))
}

// 刪除單一項目
export function deleteSinExpense(id) {
    const expense = fetchData("expense")
    const updateExpense = expense.filter(item => item.expense_id !== id)
    return localStorage.setItem("expense", JSON.stringify(updateExpense))
}

// 將類別id轉換成name
export function matchCategoryId(id) {
    const category = fetchData("category")
    const name = category.find(item => item.category_id === id)?.category_name
    return name
}

// 計算該類別的項目總花費
export function calculateExpenseAmount(id) {
    const expense = fetchData("expense") ?? []
    const total = expense.reduce((acc, item) => {
        if (item.expense_categoryId === id) {
            return acc + Number(item.expense_amount)
        }
        return acc
    }, 0)
    return total
}

// 轉換日期時間格式
export function formatDate(unformat_date) {
    const year = unformat_date.getFullYear()

    const getMonth = unformat_date.getMonth() + 1
    const month = getMonth < 10 ? '0' + getMonth : getMonth

    const getDay = unformat_date.getDate()
    const day = getDay < 10 ? '0' + getDay : getDay

    const getHour = unformat_date.getHours()
    const houh = getHour < 10 ? '0' + getHour : getHour

    const getMinute = unformat_date.getMinutes()
    const minute = getMinute < 10 ? '0' + getMinute : getMinute

    const getSecond = unformat_date.getSeconds()
    const second = getSecond < 10 ? '0' + getSecond : getSecond

    return `${year}/${month}/${day} ${houh}:${minute}:${second}`
}

// 經緯度轉換成城市名稱
export async function transferCityName(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const response = await axios.get(url, {
        headers: {
            'Accept-Language': 'zh-TW'
        }
    })
    const data = response.data

    return { cityName: data.address.city || '臺中市', suburbName: data.address.suburb }
}

// 取得天氣的 API 資料
export async function getWeatherData(city) {
    const api = 'CWA-B2E0B943-FB54-46B9-8ACB-EA4AE77A9011'
    const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${api}&locationName=${city}`
    try {
        const response = await axios.get(url)
        const data = response.data
        const weatherData = {
            description: data.records.location[0].weatherElement[0].time[0].parameter.parameterName,
            minTemp: data.records.location[0].weatherElement[2].time[0].parameter.parameterName,
            maxTemp: data.records.location[0].weatherElement[4].time[0].parameter.parameterName,
            value: data.records.location[0].weatherElement[0].time[0].parameter.parameterValue,
        }
        return weatherData
    }
    catch (error) {
        console.log('@@--接收天氣有問題：', error);
    }
}

// 驗證「登入輸入框」的值是否有誤
export function verifyInput(name, mail) {
    const inputData = {
        userName: name,
        email: mail
    }

    // 驗證機制規範
    const constraints = {
        userName: {
            presence: {
                allowEmpty: false, // 禁止空值
                message: "名字為必填！"
            },
        },
        email: {
            presence: {
                allowEmpty: false, // 禁止空值
                message: "email為必填！"
            },
            email: {
                message: "email輸入格式有誤！"
            }
        }
    };

    // 禁用 fullMessages
    validate.options = { fullMessages: false };
    const verifyResult = validate(inputData, constraints)
    return {
        nameErrorMsg: verifyResult && verifyResult.userName ? verifyResult.userName[0] : null,
        mailErrorMsg: verifyResult && verifyResult.email ? verifyResult.email[0] : null,
    }
}

// 驗證「類別和項目輸入框」的值是否有誤
export function verifyCategory(inputData) {

    // 驗證機制規範
    const constraints = {
        categoryName: {
            presence: {
                allowEmpty: false, // 禁止空值
                message: "類別名稱為必填！"
            },
        },
        categoryBudget: {
            presence: {
                allowEmpty: false, // 禁止空值
                message: "類別預算為必填！"
            },
            numericality: {
                greaterThan: 0,
                message: "類別預算必須為大於 0 的數字！"
            },
        }
    }

    // 禁用 fullMessages
    validate.options = { fullMessages: false };
    const result = validate(inputData, constraints)
    return result
}

// 驗證「項目輸入框」的值是否有誤
export function verifyExpense(inputData) {

    // 驗證機制規範
    const constraints = {
        expenseName: {
            presence: {
                allowEmpty: false, // 禁止空值
                message: "項目名稱為必填！"
            },
        },
        expenseAmount: {
            presence: {
                allowEmpty: false, // 禁止空值
                message: "項目金額為必填！"
            },
            numericality: {
                greaterThan: 0,
                message: "項目金額必須為大於 0 的數字！"
            },
        },
        expenseCategory: {
            presence: {
                allowEmpty: false, // 禁止空值
                message: "請先新增類別！"
            },
        },
    }

    // 禁用 fullMessages
    validate.options = { fullMessages: false };
    const result = validate(inputData, constraints)
    return result
}

// 篩選要匯出的資料
export function filterData(data) {
    const newData = {
        ...data,
        category: Array.isArray(data.category)
            ? data.category.map((item) => {
                // 用解構賦值濾掉 color
                const { category_color, ...otherProperties } = item
                return otherProperties
            })
            : [],
        expense: data.expense
    }
    return newData
}

// 將要匯出的資料整理成給 csv 用
export function formatDataToCSV(data) {
    //  轉換 category 資料為 CSV
    const categoryHeader = ['類別ID', '類別名稱', '類別預算']
    const categoryRows = data.category.map((item) => {
        return [
            item.category_id,
            item.category_name,
            item.category_budget
        ]
    })

    //  轉換 expense 資料為 CSV
    const expenseHeader = ['項目ID', '項目名稱', '項目金額', '項目類別', '類別ID', '日期']
    const expenseRows = data.expense.map((item) => {
        return [
            item.expense_id,
            item.expense_name,
            item.expense_amount,
            item.expense_categoryName,
            item.expense_categoryId,
            item.expense_date
        ]
    })

    // 拼接 CSV 字串
    let cvsContent

    cvsContent = "類別資料\n"
    cvsContent += categoryHeader.join(',') + '\n'
    categoryRows.forEach(row => {
        cvsContent += row.join(',') + '\n'
    })

    cvsContent += "\n項目資料\n"
    cvsContent += expenseHeader.join(',') + '\n'
    expenseRows.forEach(row => {
        cvsContent += row.join(',') + '\n'
    })
    return cvsContent
}

// 解析匯入的 CSV 檔案
export function parseCSV(csvFile) {
    return new Promise((resolve, reject) => {
        Papa.parse(csvFile, {
            complete: (result) => {
                try {
                    const data = inspectCSV(result.data)
                    resolve(data) // 成功時回傳資料
                }
                catch (error) {
                    reject(error) // 若出現錯誤，回傳錯誤
                }
            },
            header: true, // 使用第一行作為標題
            skipEmptyLines: true, // 跳過空行
        })
    })
}

// 檢查 csv 檔案是否有含必要欄位
function inspectCSV(rows) {
    const categoryData = []
    const expenseData = []

    let currentSection = "category"

    rows.forEach(row => {

        // 如果是空行就跳過 ( 要放在最前面，否則在判斷區塊是否為 expense 會有誤 )
        if (!row.category_id && !row.category_budget && !row.category_name) {
            return
        }

        // 判斷目前的區塊是不是 expense
        if (
            row.category_id === "expense_id" 
            // &&
            // row.category_budget === "expense_amount" &&
            // row.category_name === "expense_name" &&
            // row[""] === "expense_categoryId"
        ) {
            currentSection = 'expense'
        }
        
        if (currentSection === 'category') {
            // 若「類別 id、類別名稱、類別預算」沒寫就忽略
            if (row.category_id && row.category_name && row.category_budget) {
                categoryData.push({
                    category_id: row.category_id,
                    category_name: row.category_name,
                    category_budget: row.category_budget
                })
            }
        }

        if (currentSection === 'expense') {
            // 若「項目 id、項目名稱、項目金額、類別 id」沒寫就忽略
            if (row.category_id && row.category_name && row.category_budget && row.__parsed_extra) {
                expenseData.push({
                    // 因為 header: true，所以 key 值會是原本的 category
                    expense_id: row.category_id,
                    expense_name: row.category_name,
                    expense_amount: row.category_budget,
                    expense_categoryId: row.__parsed_extra[0]
                })
            }
        }
    })
    return { categoryData, expenseData }
}

// 新增匯入的類別資料
export function importCategory(categoryData) {

    categoryData.forEach((data) => {
        const categoryArr = fetchData("category") ?? [];
        const isDuplicate = categoryArr.some((category) => category.category_id === data.category_id)

        if (!isDuplicate) {
            const randomColor = getColor()
            const newCategory = {
                category_id: data.category_id,
                category_name: data.category_name,
                category_budget: data.category_budget,
                category_color: randomColor,
            }
            const updateCategoryArr = [...categoryArr, newCategory]
            return localStorage.setItem("category", JSON.stringify(updateCategoryArr))
        }
    })
}

// 新增匯入的項目資料
export function importExpense(expenseData) {
    expenseData.forEach((data, index) => {
        if (index > 0) { //跳過expense的標題
            const expenseArr = fetchData("expense") ?? []
            const isDuplicate = expenseArr.some((expense) => expense.expense_id === data.expense_id)

            if (!isDuplicate) {
                const categoryName = matchCategoryId(data.expense_categoryId)
                const date = formatDate(new Date())
                const newExpenseObj = {
                    expense_id: data.expense_id,
                    expense_name: data.expense_name,
                    expense_amount: data.expense_amount,
                    expense_categoryId: data.expense_categoryId,
                    expense_categoryName: categoryName,
                    expense_date: date,
                }

                const updateExpense = [newExpenseObj, ...expenseArr]
                return localStorage.setItem("expense", JSON.stringify(updateExpense))
            }
        }
    })
}