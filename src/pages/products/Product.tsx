import { useEffect, useState } from 'react'
import './product.scss'
import api from '@services/apis'

interface Category {
  id: string;
  title: string;
  avatar: string;
}
export default function Product() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    api.categoryApi.findMany()
    .then(res => {
      if(res.status != 200) {
        alert(res.data.message)
      }else {
        setCategories(res.data.data)
      }
    })
  }, [])
  return (
    <div>
        <h1>Add Product</h1>
        <div>
          Category
          <select>
            {
              categories.map(category => <option key={Math.random() * Date.now()} value={(category as Category).id}>{(category as Category).title}</option>)
            }
          </select>
        </div>
    </div>
  )
}
