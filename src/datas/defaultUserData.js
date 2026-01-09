// 引入隨機碼
import { nanoid } from 'nanoid';

export const prev_uerName = 'Charlie'
export const prev_categoryArr = [
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
export const prev_expenseArr = [
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