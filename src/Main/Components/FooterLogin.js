import React from 'react'
import "../Components/CSS/footerlogin.css"
const FooterLogin = () => {
    return (
        <div className='footer__login__component__parent'>
            <div className='footer__login__component'>
                <div className='footer__login__top'>
                    <p>Questions? Contact us.</p>
                </div>
                <div className='footer__login__middle'>
                    <div className='footer__login__links'>
                        <p>FAQ</p>
                        <p>Investor Relations</p>
                        <p>Privacy</p>
                        <p>Speed Test</p>
                    </div>
                    <div className='footer__login__links'>
                        <p>Help Center</p>
                        <p>Jobs</p>
                        <p>Cookie Preferences</p>
                        <p>Legal Notices</p>
                    </div>
                    <div className='footer__login__links'>
                        <p>Account</p>
                        <p>Ways to Watch</p>
                        <p>Corporate Information</p>
                        <p>Only on Netflix</p>
                    </div>
                    <div className='footer__login__links'>
                        <p>Media Center</p>
                        <p>Terms of Use</p>
                        <p>Contact Us</p>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterLogin
