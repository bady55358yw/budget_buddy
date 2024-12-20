import { redirect } from 'react-router-dom'

// 引入 utilities
import { deleteItem } from '../utilities'

// 引入 toast
import { toast } from 'react-toastify'

export function logoutAction(){
    deleteItem("userName")
    deleteItem("category")
    deleteItem("expense")
    toast.success("刪除成功！")
    return redirect('/')
}