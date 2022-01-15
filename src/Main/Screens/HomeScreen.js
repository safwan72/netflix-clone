import React from 'react'
import Row from '../Components/Row';
import Banner from '../Components/Banner';
import Nav from '../Components/Nav';
import FooterLogin from '../Components/FooterLogin';
import allrows from '../../Utils/AllRows';
import { useNavigate } from 'react-router-dom'

const HomeScreen = () => {
    const navigate = useNavigate();
    const handlesearch = () => {
        navigate('/search');
    }
    return (
        <div style={{ height: '100%' }}>
            <Nav handlesearch={handlesearch} showSearch={true} isHome={false} />
            <Banner />
            {allrows.map((item) => {
                return (
                    <Row title={item.title} fettchurl={item.url} isLargeRow={item.isLarge} key={item?.title} />
                )
            })}
            <FooterLogin />
        </div>
    )
}

export default HomeScreen
