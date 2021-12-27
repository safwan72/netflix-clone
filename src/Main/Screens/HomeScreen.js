import React from 'react'
import Row from '../Components/Row';
import Banner from '../Components/Banner';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import allrows from '../../Utils/AllRows';
const HomeScreen = () => {
    return (
        <>
            <Nav />
            <Banner />
            {allrows.map((item) => {
                return (
                    <Row title={item.title} fettchurl={item.url} isLargeRow={item.isLarge} key={item?.title} />
                )
            })}
            <Footer />
        </>
    )
}

export default HomeScreen
