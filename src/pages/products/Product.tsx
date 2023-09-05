import './product.scss'
import { useState, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import Test from '@components/Test'
export interface Prop {
  count: number,
  handlePrintCount: (count: number) => void;
}
export default function Product() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const handlePrintCount = useCallback((count: number) => {
    alert("Count value is:  " + count)
  }, [count])
  
  console.log("rerender Product Component")
  return (
    <div>
      <h1>Product {count}</h1>
      <Test count={count} handlePrintCount={handlePrintCount}/>
      <Outlet/>
      <button onClick={() => {
        setCount(count + 1)
      }}>Tăng 1</button>
      <button onClick={() => {
        setCount2(count2 + 1)
      }}>Tăng 2</button>
    </div>
  )
}
