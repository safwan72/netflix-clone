import React from 'react'
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from "@stripe/stripe-js/pure";
// import CheckoutForm from "./CheckoutForm";
import StripeCheckout from 'react-stripe-checkout';
import '../Components/CSS/paymentscreen.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../AuthBackend/baseUrl';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const u_id = useSelector(state => state.userId);
    const [selectedplan, setselectedplan] = React.useState(null)
    React.useEffect(() => {
        setselectedplan(location.state?.item)
    }, [location.state?.item, selectedplan])
    const cl_pk = `${process.env.REACT_APP_STRIPE_KEY}`;
    const header = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    async function handleToken(token, addresses) {
        const response = await axios.post(
            `${baseURL}backend/test_payment/`, {
            token,
            addresses,
            selectedplan,
            u_id
        }
            , header
        );

        if (response.data.error === false) {

            toast.dark("Payment Successfull", {
                onClose: () => navigate('/subscription'),
                progressClassName: 'toast_error_class_progress'
            })
        } else {
            toast.dark("Some Problem with Payment. Try AGAIN!!!!", {
                onClose: () => navigate('/subscription'),
                progressClassName: 'toast_error_class_progress'
            })
        }
    }
    return (
        <div className='paymentscreen'>
            <div>
                <h1>{selectedplan?.plan_name}</h1>
                <br />
                <h5>{selectedplan?.plan_description}</h5>
                <br />
                <p>Click <b>Pay With Card </b>to continue watching {selectedplan?.plan_name}</p>
            </div>
            <div>
                <StripeCheckout
                    name="NETFLIX"
                    description="Enjoy Premium By Paying"
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
                    stripeKey={cl_pk}
                    token={handleToken}
                    billingAddress
                    zipCode
                    currency="USD"
                />
            </div>
        </div>
    )
}

export default Payment
