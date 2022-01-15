import React from 'react'
import Nav from '../Components/Nav';
import FooterLogin from '../Components/FooterLogin';
import Profile from '../Components/Profile';
const ProfileScreen = () => {
    return (
        <div style={{ height: '100%' }}>
            <Nav isHome={false} showSearch={false} />
            <Profile />
            <FooterLogin />
        </div>
    )
}

export default ProfileScreen
