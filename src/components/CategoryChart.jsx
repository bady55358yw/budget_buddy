import React, { useEffect, useState } from 'react'

// 引入 C3 和 D3
import * as d3 from 'd3';
import * as c3 from 'c3';
import 'c3/c3.css';

// 引入 utilities
import { calculateExpenseAmount } from '../utilities'

// --- 底下開始撰寫 ---

export default function CategoryChart(props) {

    const { category } = props
    const [rerender, setRerender] = useState(0)

    // 將項目花費加入至 category
    const newCategory = category.map(item => {
        const expense_amount = calculateExpenseAmount(item.category_id)
        return { ...item, expense_amount: expense_amount }
    })

    // 定義符合 data 的資料格式
    let chartData = []
    newCategory.forEach(item => {
        chartData = [...chartData, [item.category_name, item.expense_amount]]
    });

    // 定義 color 對應的顏色
    let categoryColor = {}
    newCategory.forEach(item => {
        categoryColor[item.category_name] = item.category_color
    })

    useEffect(() => {
        const chart = c3.generate({
            data: {
                columns: chartData,
                type: 'donut',
                colors: categoryColor,
            },
            donut: {
                title: "類別花費佔比"
            },
        })

        setTimeout(function () {
            chart.load({
                columns: chartData,
                colors: categoryColor
            });
        }, 500);

        setTimeout(function () {
            chart.unload([]);
        }, 2500);
    }, [chartData])

    return (
        <div id="chart" className='chart'></div>
    )
}
