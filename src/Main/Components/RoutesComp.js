import React from 'react'
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignInScreen from '../Screens/SignInScreen';
import Logout from './Logout';
import { useSelector } from 'react-redux';
import ProfileScreen from '../Screens/ProfileScreen';
import SubscriptionScreen from '../Screens/SubscriptionScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import Searchscreen from '../Screens/Searchscreen';

const RoutesComp = () => {
    const token = useSelector(state => state.token);

    return (
        <div>
            <Routes>
                {token &&
                    <>
                        <Route path="/home" element={<HomeScreen />} />
                        <Route path="/profile" element={<ProfileScreen />} />
                        <Route path="/search" element={<Searchscreen />} />
                        <Route path="/subscription" element={<SubscriptionScreen />} />
                        <Route path="/payment" element={<PaymentScreen />} />
                        <Route path="/logout" element={<Logout />} />
                    </>
                }
                {!token &&
                    <>
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/signin" restricted={true} element={<SignInScreen />} />
                    </>
                }
                <Route path="*" exact element={<Navigate to={token ? "/home" : "/login"} />} />
            </Routes>
        </div>
    )
}

export default RoutesComp;
