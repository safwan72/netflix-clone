import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../Utils/Loader';
import baseURL from '../AuthBackend/baseUrl';
import '../Components/CSS/subscription.css';
import { useSelector } from 'react-redux';

const Subscription = ({ plans }) => {
    const navigate = useNavigate();
    const [myplan, setmyplan] = React.useState(null);
    const u_id = useSelector(state => state.userId);
    React.useEffect(() => {
        axios.get(`${baseURL}backend/myplan/${u_id}/`)
            .then(res => {
                setmyplan(res.data)
            })
            .catch(err => {
            })
        // setmyplan(location.state?.item)
    }, [u_id])
    return (
        <div className='subscibe__component__parent'>
            <h1>Netflix Plans</h1>
            <div className='subscibe__component'>
                <div className='subscribe__my__plan'>
                    {myplan && myplan !== null ? (
                        <>
                            <h5>
                                My Current Plan: {myplan?.plan?.plan_name}
                            </h5>
                            <div className='subscibe__plans__myplan'>
                                <div className='subscibe__myplan'>
                                    <p>{myplan?.plan?.amount} $</p>
                                    <br />
                                    <p>{myplan?.plan?.plan_description}</p>
                                </div>
                            </div>
                        </>
                    ) : (

                        <h2>No Plan Selected Now!!</h2>
                    )}
                </div>
                <div className='subscibe__links'>
                    {plans && plans.length > 0 ? (
                        plans.map((item) => (
                            <div className='subscibe__plans' key={item?.plan_id}>
                                <div className='subscibe__plan__button'>
                                    <button className='subscribe__button'
                                        disabled={myplan?.plan?.plan_id === item?.plan_id ? true : false}
                                        onClick={() => {
                                            navigate('/payment', { state: { item: item } });
                                        }}>Subscribe</button>
                                </div>
                                <div className='subscibe__plan'>
                                    <p className='subscibe__plan__p'>{item?.plan_name}</p>
                                    <p>{item?.plan_description}</p>
                                </div>
                            </div>
                        ))
                    ) : (<Loader />)}
                </div>
            </div>
        </div>
    )
}

export default Subscription
