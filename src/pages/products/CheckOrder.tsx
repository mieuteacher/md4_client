import React, { useState } from 'react'
import api from '@/services/apis';

export default function CheckOrder() {
    const [emailInput, setEmailInput] = useState("");
    const [receipts, setReceipts] = useState([])
    function handleGetOtp() {
        api.purchaseApi.findGuestReceipt({ email: emailInput })
            .then(res => {
                if (res.status == 200) {
                    alert(res.data.message)
                }
                console.log("đã vào đây", res.data)
            })
            .catch(err => {
                console.log("lỗi", err)
            })

    }
    function handleGetReceipt() {
        api.purchaseApi.findGuestReceipt({ email: emailInput, otp: window.prompt("OTP của bạn ?") ?? "29121999" })
            .then(res => {
                if (res.status == 200) {
                    setReceipts(res.data.data)
                }
            })
    }
    return (
        <div>
            <h1>CheckOrder</h1>
            <div>
                <input type="text" value={emailInput} onChange={(e) => {
                    setEmailInput(e.target.value)
                }} />
                <button onClick={() => {
                    handleGetOtp()
                }}>Lấy OTP</button>
            </div>
            <button onClick={() => {
                handleGetReceipt()
            }}>Lấy Hóa Đơn</button>
            <br></br>
            <ul>
                {
                    receipts.map((receipt: any, index: number) => {
                        return (
                            <li key={receipt.id}>
                                <p>STT: {index + 1}</p>
                                <p>Mã hóa đơn: {receipt.id}</p>
                                <div>
                                    Sản Phẩm
                                    <ul>
                                        {
                                            receipt.guestReceiptDetail.map((item: any, index2: number) => {
                                                return (
                                                    <li key={item.productId}>
                                                        <p>STT: {index2 + 1}</p>
                                                        <p>Mã SP: {item.productId}</p>
                                                        <p>Số Lượng: {item.quantity}</p>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
