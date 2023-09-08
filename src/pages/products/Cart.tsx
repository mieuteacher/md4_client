import React, { useEffect, useState } from 'react'
import api from '@/services/apis'

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
interface CartItemDetail extends CartItem{
   productDetail: Product
}

export default function Cart() {
    const [cart, setCart] = useState<CartItemDetail[]>([]);
    async function formatCart() {
        let cartTemp: CartItemDetail[] = [];
        let carts: CartItem[] = JSON.parse(localStorage.getItem("carts") ?? "[]");
        for (let i in carts) {
            let productDetail = await api.productApi.findById(carts[i].productId).then(res => res.data.data)
            cartTemp.push({
                ...carts[i],
                productDetail
            })
        }
        setCart(cartTemp)
    }

    useEffect(() => {
        formatCart();
    }, [])
  return (
    <div>
        <h1>cart</h1>
        <ul>
            {
                cart.map(item => (
                    <li key={item.productId}>
                        <p>Product Name: {item.productDetail.name}</p>
                        <p>Product Price: {item.productDetail.price}</p>
                        <p>Product Quantity: {item.quantity}</p>
                        <p>
                            <img src={item.productDetail.avatar} style={{width: "100px", height: "100px", borderRadius: "50%"}}/>
                        </p>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}
