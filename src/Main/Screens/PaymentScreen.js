import React from 'react'
import Nav from '../Components/Nav';
import FooterLogin from '../Components/FooterLogin';
import Payment from '../Components/Payment';
const PaymentScreen = () => {
    return (
        <div style={{ height: '100%' }}>
            <Nav isHome={false} showSearch={false} />
            <div style={{ paddingTop: '150px', height: "100vh" }}>
                <Payment />
            </div>
            <FooterLogin />
        </div>
    )
}

export default PaymentScreen
