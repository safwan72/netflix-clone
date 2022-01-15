import React from 'react'
import Nav from '../Components/Nav';
import FooterLogin from '../Components/FooterLogin';
import Subscription from '../Components/Subscription';
import axios from 'axios';
import baseURL from '../AuthBackend/baseUrl';

const SubscriptionScreen = () => {
    const [plans, setplans] = React.useState([])
    React.useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`${baseURL}backend/plans/`);
            setplans(request.data);
            return request;
        }
        fetchData();
    }, []);
    return (
        <div style={{ height: '100%' }}>
            <Nav isHome={false} showSearch={false} />
            <Subscription plans={plans} />
            <FooterLogin />
        </div>
    )
}

export default SubscriptionScreen
