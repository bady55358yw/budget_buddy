import React, { useState } from 'react'
import { Form } from 'react-router-dom'

// 引入 pubsub-js
import PubSub from 'pubsub-js'

// 引入 icon
import { FolderPlusIcon } from '@heroicons/react/24/outline'

// 引入 utilities
import { verifyCategory } from '../utilities'

// --- 底下開始撰寫 ---

export default function AddCategory() {

  const [formData, setFormData] = useState({
    categoryName: "",
    categoryBudget: "",
  })

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // 更新表單狀態
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    const verifyResult = verifyCategory(formData)

    if (verifyResult) { // 非 undefined，代表驗證有問題
      e.preventDefault() // 阻止表單提交
      setErrors(verifyResult)
    }
    else {
      // 提交後重新渲染組件
      // PubSub.publish('updateCategory','更新項目的類別')

      // 提交後清空欄位
      setFormData({
        categoryName: "",
        categoryBudget: "",
      })
      setErrors({})
    }
  }

  return (
    <div id="addCategory" className='text-secondary bg-lightAccent1 drop-shadow-xl p-5 rounded-2xl basis-1/2 lg:basis-full'>
      <h3 className='mb-2 text-xl lg:text-lg font-bold'>類別</h3>
      <Form method='post' onSubmit={handleSubmit}>
        <div className='p-4 border-dashed border-secondary border-3 rounded-lg flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <label htmlFor="" className='font-bold'>類別名稱</label>
            <input
              type="text"
              name='categoryName'
              value={formData.categoryName}
              onChange={handleChange}
              placeholder='如: 伙食類, 交通類, 居家類...'
              className='border-2 border-solid border-primaryLight2 rounded w-full p-1'
            />
            <p className='text-sm text-warning'>{errors.categoryName?.[0]}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="" className='font-bold'>類別預算</label>
            <input
              type="number" step={1}
              name='categoryBudget'
              value={formData.categoryBudget}
              onChange={handleChange}
              placeholder='如: 800, 2000, 5000...'
              className='border-2 border-solid border-primaryLight2 rounded w-full p-1'
            />
            <p className='text-sm text-warning'>{errors.categoryBudget?.[0]}</p>
          </div>

          {/* action 判斷點 */}
          <input type="hidden" name='_action' value="add_new_category" />

          <button type="submit" className='btn-base-oval items-center gap-1 mx-auto'>
            <span>新增類別</span>
            <FolderPlusIcon width={24} />
          </button>
        </div>
      </Form>
    </div>
  )
}
