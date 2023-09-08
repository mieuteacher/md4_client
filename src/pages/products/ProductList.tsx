import api from '@/services/apis';
import React, { useEffect, useState } from 'react'

interface Product {
    id: string;
    name: string;
    avatar: string;
    price: number;
    des: string;
    categoryId: string;
    productPictures: {
        id: string;
        path: string;
    }[]
}
interface CartItem {
    productId: string;
    quantity: number;
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.productApi.findMany()
        .then(res => {
            if(res.status == 200) {
                setProducts(res.data.data)
            }
        })
    }, [])

    function handleAddToCart(productId: string) {
        let carts: CartItem[] = JSON.parse(localStorage.getItem("carts") ?? "[]");
        if(carts.length == 0) {
            // cart rỗng
            carts.push({
                productId,
                quantity: 1
            })
        }else {
            // cart có sp
            let flag:boolean = false;
            carts = carts.map(item => {
                if(item.productId == productId) {
                    item.quantity += 1
                    flag = true;
                }
                return item
            })
            if(!flag) {
                carts.push({
                    productId,
                    quantity: 1
                })
            }
        }
        localStorage.setItem("carts", JSON.stringify(carts)) // save to local
    }
  return (
    <div>
        <h1>ProductList</h1>
        <ul>
            {
                products.map(product => {
                    return (
                        <li key={product.id} style={{border: "1px solid black"}}>
                            <p>Name: {product.name}</p>
                            <p>Price: {product.price}</p>
                            <p>
                                Avatar: <img style={{width: "100px", height: "100px", borderRadius: "50%"}} src={product.avatar}/> 
                            </p>
                            <div style={{display: "flex"}}>
                                Pictures
                                {
                                    product.productPictures.map(img => (
                                        <img key={img.id} src={img.path} style={{width: "100px", height: "100px", borderRadius: "50%"}}/>
                                    ))
                                }
                            </div>
                            <button onClick={() => {
                                handleAddToCart(product.id)
                            }} style={{border: "1px solid black", cursor: "pointer", width: "100px", height: "50px"}}>Mua</button>
                        </li>
                    )
                })
            }
        </ul>
    </div>
  )
}
